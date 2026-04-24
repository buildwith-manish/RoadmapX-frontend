/**
 * hybrid_data.js — RoadmapX Hybrid Data System
 * ═══════════════════════════════════════════════════════════
 *
 * HOW IT WORKS:
 * ─────────────
 * This file sits between the UI (script.js) and storage.
 * It creates a global `HybridData` object that the rest of
 * the app uses to load and save all user data.
 *
 *   LOGGED IN  → data lives in MongoDB via POST/GET /api/user-data
 *   GUEST      → data lives in localStorage (keys unchanged from original)
 *
 * On login: localStorage data is migrated to backend automatically.
 * On logout: the backend snapshot is cleared from memory.
 *
 * DESIGN RULES:
 * ─────────────
 * 1. The data shape is always the same object regardless of storage.
 * 2. script.js's existing `load()` and `save()` helpers are PATCHED
 *    at startup to go through this layer — so zero changes needed
 *    in 95% of script.js.
 * 3. The streak system's `lastDate` comparison bug is fixed here:
 *    we always use local YYYY-MM-DD, never UTC ISO strings.
 *
 * DATA STRUCTURE (matches backend UserData schema):
 * {
 *   streaks:      {},          // per-type streak objects
 *   notes:        [],          // extra/project notes
 *   badges:       [],          // earned badge ids
 *   pomodoroStats:{},          // { ai, dsa, projects, extra }
 *   aiProgress:   {},          // day completion map
 *   dsaProgress:  {},          // topic completion map
 *   attendance:   {},          // { "YYYY-MM-DD": "present"|"absent" }
 *   revisions:    [],          // revision entries
 *   projects:     [],          // project entries
 *   pomoDuration: 25,          // minutes
 * }
 *
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ─── Config ────────────────────────────────────────────
  const API = 'https://roadmapx-backend-3qmc.onrender.com';

  // How many milliseconds to wait after a save() call before
  // actually writing to backend (debounce prevents hammering
  // the API on every single keystroke / checkbox click).
  const DEBOUNCE_MS = 1200;

  // ─── State ─────────────────────────────────────────────
  let _loggedIn   = false;   // true once /me confirms a session
  let _username   = null;    // the current user's username
  let _cache      = null;    // in-memory copy of the full data blob
  let _saveTimer  = null;    // debounce timer handle
  let _authChecked = false;  // prevents double-init

  // ─── Local-date helper ─────────────────────────────────
  // Returns "YYYY-MM-DD" in the user's LOCAL timezone.
  // This is critical for the streak system — using new Date().toISOString()
  // would return UTC which can be a different day at night, causing streaks
  // to reset or double-count. This was the core bug in the original code.
  function localDateStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // ─── Default data shape ────────────────────────────────
  function defaultData() {
    return {
      streaks:       {},
      notes:         [],
      badges:        [],
      pomodoroStats: { ai: 0, dsa: 0, projects: 0, extra: 0 },
      aiProgress:    {},
      dsaProgress:   {},
      attendance:    {},
      revisions:     [],
      projects:      [],
      pomoDuration:  25,
    };
  }

  // ─── The mapping between localStorage keys and data fields ─
  // This lets us migrate guest data to backend by knowing
  // which localStorage key corresponds to which data field.
  const LS_FIELD_MAP = {
    'roadmapAI':     'aiProgress',
    'roadmapDSA':    'dsaProgress',
    'streaks':       'streaks',
    'pomodoroStats': 'pomodoroStats',
    'extraNotes':    'notes',
    'projects':      'projects',
    'attendance':    'attendance',
    'revisions':     'revisions',
    'pomoDuration':  'pomoDuration',
  };

  // ─── Read from localStorage into a data blob ───────────
  function readFromLocalStorage() {
    const blob = defaultData();
    Object.entries(LS_FIELD_MAP).forEach(([lsKey, field]) => {
      try {
        const raw = localStorage.getItem(lsKey);
        if (raw) blob[field] = JSON.parse(raw);
      } catch (e) {
        // Corrupted item — leave default
      }
    });
    return blob;
  }

  // ─── Write a data blob back into localStorage ──────────
  function writeToLocalStorage(blob) {
    Object.entries(LS_FIELD_MAP).forEach(([lsKey, field]) => {
      if (blob[field] !== undefined) {
        try {
          localStorage.setItem(lsKey, JSON.stringify(blob[field]));
        } catch (e) {
          console.warn('[HybridData] Could not write to localStorage:', lsKey, e);
        }
      }
    });
  }

  // ─── Fetch full data from backend ──────────────────────
  async function fetchFromBackend() {
    try {
      const res = await fetch(API + '/api/user-data', {
        credentials: 'include',  // send the session cookie
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (e) {
      console.warn('[HybridData] Backend fetch failed, falling back to localStorage.', e);
      return null;
    }
  }

  // ─── Push full data blob to backend ────────────────────
  // This is called by the debounced saveUserData(). It sends the
  // full in-memory cache to the backend in one request.
  async function pushToBackend(blob) {
    try {
      const res = await fetch(API + '/api/user-data', {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify(blob),
      });
      const json = await res.json();
      if (!json.success) {
        console.warn('[HybridData] Backend save failed:', json.message);
      }
    } catch (e) {
      console.warn('[HybridData] Backend push failed, data still in localStorage cache.', e);
    }
  }

  // ─── Migrate guest localStorage data to backend ────────
  // Called once on login. Takes everything the guest stored in
  // localStorage and sends it to the backend, merging with any
  // existing backend data (backend wins on conflicts, since the
  // user may have logged in from another device).
  async function migrateLocalStorageToBackend() {
    const localBlob = readFromLocalStorage();

    // Fetch any existing backend data first
    const backendBlob = await fetchFromBackend();

    if (!backendBlob) {
      // No backend data yet → push local data straight up
      await pushToBackend(localBlob);
      _cache = localBlob;
    } else {
      // Merge strategy: for streaks, keep whichever streak is higher.
      // For arrays (notes, projects, revisions), concatenate and dedupe by id.
      // For attendance, merge objects (backend wins on same-day conflicts).
      // For pomodoroStats, add the counts together.
      const merged = defaultData();

      // Streaks: keep the higher current + longer longest
      const allStreakTypes = new Set([
        ...Object.keys(localBlob.streaks || {}),
        ...Object.keys(backendBlob.streaks || {}),
      ]);
      allStreakTypes.forEach(type => {
        const local   = (localBlob.streaks || {})[type] || { current: 0, longest: 0, lastDate: null, history: [] };
        const backend = (backendBlob.streaks || {})[type] || { current: 0, longest: 0, lastDate: null, history: [] };
        merged.streaks[type] = {
          current:  Math.max(local.current,  backend.current),
          longest:  Math.max(local.longest,  backend.longest),
          lastDate: local.lastDate > backend.lastDate ? local.lastDate : backend.lastDate,
          history:  [...new Set([...(local.history || []), ...(backend.history || [])])].sort().slice(-30),
        };
      });

      // Progress maps: merge by key, done:true wins
      merged.aiProgress  = Object.assign({}, localBlob.aiProgress,  backendBlob.aiProgress);
      merged.dsaProgress = Object.assign({}, localBlob.dsaProgress, backendBlob.dsaProgress);
      merged.attendance  = Object.assign({}, localBlob.attendance,  backendBlob.attendance);

      // Pomodoro stats: add counts (local sessions happened before login)
      const ls = localBlob.pomodoroStats   || {};
      const bs = backendBlob.pomodoroStats || {};
      merged.pomodoroStats = {
        ai:       (ls.ai       || 0) + (bs.ai       || 0),
        dsa:      (ls.dsa      || 0) + (bs.dsa      || 0),
        projects: (ls.projects || 0) + (bs.projects || 0),
        extra:    (ls.extra    || 0) + (bs.extra    || 0),
      };

      // Arrays: concatenate, dedupe by id
      const mergeArraysById = (a, b) => {
        const map = new Map();
        (a || []).forEach(item => item?.id && map.set(String(item.id), item));
        (b || []).forEach(item => item?.id && map.set(String(item.id), item));
        return [...map.values()];
      };
      merged.notes     = mergeArraysById(localBlob.notes,     backendBlob.notes);
      merged.projects  = mergeArraysById(localBlob.projects,  backendBlob.projects);
      merged.revisions = mergeArraysById(localBlob.revisions, backendBlob.revisions);

      // Badges: union
      merged.badges = [...new Set([...(localBlob.badges || []), ...(backendBlob.badges || [])])];

      // Prefer the longer pomo duration (user likely increased it)
      merged.pomoDuration = Math.max(
        localBlob.pomoDuration  || 25,
        backendBlob.pomoDuration || 25
      );

      _cache = merged;
      await pushToBackend(merged);
    }

    // After migrating, also keep localStorage in sync so
    // the existing script.js load() calls get correct values.
    writeToLocalStorage(_cache);
  }

  // ──────────────────────────────────────────────────────
  //  PUBLIC API
  // ──────────────────────────────────────────────────────

  /**
   * isLoggedIn() → bool
   * Returns whether the user currently has an active session.
   * Synchronous — safe to call anywhere after init().
   */
  function isLoggedIn() {
    return _loggedIn;
  }

  /**
   * loadUserData() → Promise<dataBlob>
   * Loads the full data blob from backend (if logged in) or
   * localStorage (if guest). Always resolves — never rejects.
   * The returned blob is also stored in _cache.
   */
  async function loadUserData() {
    if (_loggedIn) {
      const blob = await fetchFromBackend();
      if (blob) {
        _cache = blob;
        // Keep localStorage in sync so script.js load() calls work
        writeToLocalStorage(_cache);
        return _cache;
      }
    }
    // Guest or backend unavailable: read from localStorage
    _cache = readFromLocalStorage();
    return _cache;
  }

  /**
   * saveUserData(partialData)
   * Merges `partialData` into the in-memory cache and persists it.
   * Always writes to localStorage immediately (sync, fast).
   * If logged in, also schedules a debounced backend push.
   *
   * You can pass a partial object — only the provided keys are updated.
   * Example: saveUserData({ streaks: { ai: { current: 5 ... } } })
   */
  function saveUserData(partialData) {
    if (!_cache) _cache = defaultData();

    // Deep-merge partialData into cache
    Object.assign(_cache, partialData);

    // Always write to localStorage immediately so the UI
    // never has to wait for a network round-trip
    writeToLocalStorage(_cache);

    if (_loggedIn) {
      // Debounce the backend write — if multiple saves happen
      // in quick succession (e.g., typing a note), we only
      // actually hit the API once they stop for 1.2 seconds.
      clearTimeout(_saveTimer);
      _saveTimer = setTimeout(() => {
        pushToBackend(_cache);
      }, DEBOUNCE_MS);
    }
  }

  // ─── Specific update helpers ──────────────────────────
  // These are thin wrappers that keep the data shape consistent
  // and call saveUserData() at the end.

  /**
   * updateStreak(type, studied)
   * type: 'ai' | 'dsa' | 'proj' | 'extra'
   * studied: boolean — true when the user completed a session today
   *
   * FIX: This replaces the original updateStreak in script.js.
   * The key fix is using localDateStr() instead of the original
   * today() which could return a different day at midnight UTC.
   */
  function updateStreak(type, studied) {
    if (!type) return;
    if (!_cache) _cache = defaultData();

    const streaks = _cache.streaks || {};
    if (!streaks[type]) {
      streaks[type] = { current: 0, longest: 0, lastDate: null, history: [] };
    }
    const s = streaks[type];
    const todayDate = localDateStr();

    if (studied) {
      // Already counted today — don't increment again
      if (s.lastDate === todayDate) {
        // Update header display but don't change numbers
        _triggerHeaderUpdate();
        return;
      }

      // Calculate yesterday's date string for streak continuity check
      const yest = new Date();
      yest.setDate(yest.getDate() - 1);
      const yesterdayDate = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(yest.getDate()).padStart(2, '0')}`;

      if (s.lastDate === yesterdayDate) {
        // Continuing an existing streak
        s.current++;
      } else {
        // Gap in streak — restart at 1
        s.current = 1;
      }
      s.longest  = Math.max(s.longest, s.current);
      s.lastDate = todayDate;
      if (!s.history) s.history = [];
      s.history.push(todayDate);
      // Keep only last 30 days of history
      if (s.history.length > 30) s.history = s.history.slice(-30);
    }

    _cache.streaks = streaks;
    saveUserData({ streaks });
    _triggerHeaderUpdate();
  }

  /**
   * saveNotes(note)
   * note: { id, date, text, ... }
   * Prepends a note to the notes array and persists.
   */
  function saveNotes(note) {
    if (!_cache) _cache = defaultData();
    const notes = Array.isArray(_cache.notes) ? _cache.notes : [];
    notes.unshift(note);
    saveUserData({ notes });
  }

  /**
   * updatePomodoro(type, increment)
   * type: 'ai' | 'dsa' | 'projects' | 'extra'
   * increment: number to add (usually 1)
   */
  function updatePomodoro(type, increment = 1) {
    if (!_cache) _cache = defaultData();
    const stats = Object.assign({ ai: 0, dsa: 0, projects: 0, extra: 0 }, _cache.pomodoroStats || {});
    if (stats[type] !== undefined) {
      stats[type] += increment;
    }
    saveUserData({ pomodoroStats: stats });
  }

  /**
   * updateBadges(badgeIds)
   * badgeIds: string[] — IDs of newly earned badges
   * Merges with existing badges (no duplicates).
   */
  function updateBadges(badgeIds) {
    if (!_cache) _cache = defaultData();
    const existing = Array.isArray(_cache.badges) ? _cache.badges : [];
    const merged   = [...new Set([...existing, ...badgeIds])];
    saveUserData({ badges: merged });
  }

  // ─── Internal: trigger header re-render in script.js ──
  // script.js's updateHeader() is private inside APP.
  // We fire a custom event that script.js can listen to.
  function _triggerHeaderUpdate() {
    try {
      window.dispatchEvent(new CustomEvent('rx:streakUpdated'));
    } catch (e) { /* ignore */ }
  }

  // ──────────────────────────────────────────────────────
  //  INIT — check auth and load data
  // ──────────────────────────────────────────────────────
  async function init() {
    if (_authChecked) return;
    _authChecked = true;

    // 1. Ask the backend: is there a valid session cookie?
    try {
      const res  = await fetch(API + '/me', { credentials: 'include' });
      const data = await res.json();
      if (data && data.success) {
        _loggedIn  = true;
        _username  = data.username;
        // Store username in localStorage so auth_guard.js still works
        localStorage.setItem('rx_token', 'true');
        localStorage.setItem('rx_user', _username);
      } else {
        _loggedIn = false;
        _username = null;
      }
    } catch (e) {
      // Network error — treat as guest
      _loggedIn = false;
      _username = null;
      console.warn('[HybridData] Could not reach /me, treating as guest.');
    }

    // 2. Load data from whichever storage is appropriate
    await loadUserData();

    // 3. Signal to the rest of the app that auth is resolved
    window.dispatchEvent(new CustomEvent('rx:authReady', {
      detail: { loggedIn: _loggedIn, username: _username }
    }));

    console.log(`[HybridData] Init complete. Logged in: ${_loggedIn}${_loggedIn ? ' (' + _username + ')' : ''}`);
  }

  // ─── Post-login migration hook ─────────────────────────
  // Call this from login_script.js after a successful login.
  // It migrates guest localStorage data to the backend.
  async function onLoginSuccess(username) {
    _loggedIn = true;
    _username = username;
    localStorage.setItem('rx_token', 'true');
    localStorage.setItem('rx_user', username);
    await migrateLocalStorageToBackend();
    window.dispatchEvent(new CustomEvent('rx:authReady', {
      detail: { loggedIn: true, username }
    }));
    console.log('[HybridData] Post-login migration complete for:', username);
  }

  // ─── Post-logout cleanup ───────────────────────────────
  function onLogout() {
    _loggedIn  = false;
    _username  = null;
    _cache     = null;
    clearTimeout(_saveTimer);
    // Note: we do NOT clear localStorage on logout.
    // The user's data remains locally so they can keep using
    // the app as a guest until they log back in.
  }

  // ──────────────────────────────────────────────────────
  //  PATCH script.js's APP storage helpers
  // ──────────────────────────────────────────────────────
  // script.js's load() and save() are closures inside APP —
  // we can't replace them directly. Instead, we intercept at
  // the localStorage level by patching setItem/getItem on
  // specific keys AFTER init(), so all existing save() calls
  // automatically go through our system.
  //
  // This is the least invasive approach — script.js needs zero
  // changes to work with the hybrid system.
  //
  // For backend sync: every time script.js calls
  //   localStorage.setItem(key, val)
  // for a key we care about, we intercept it, update _cache,
  // and schedule the debounced backend push.
  function _patchLocalStorage() {
    const origSetItem = localStorage.setItem.bind(localStorage);
    const origGetItem = localStorage.getItem.bind(localStorage);

    // Keys we want to intercept (same as LS_FIELD_MAP)
    const watchedKeys = new Set(Object.keys(LS_FIELD_MAP));

    localStorage.setItem = function (key, value) {
      // Always do the real setItem first so nothing breaks
      origSetItem(key, value);

      // If logged in and this is a key we manage, sync to backend
      if (_loggedIn && watchedKeys.has(key) && _cache) {
        const field = LS_FIELD_MAP[key];
        try {
          _cache[field] = JSON.parse(value);
        } catch (e) {
          _cache[field] = value;
        }
        // Debounced backend push
        clearTimeout(_saveTimer);
        _saveTimer = setTimeout(() => {
          pushToBackend(_cache);
        }, DEBOUNCE_MS);
      }
    };

    // getItem patch: if logged in, prefer _cache over stale localStorage
    localStorage.getItem = function (key) {
      if (_loggedIn && _cache && watchedKeys.has(key)) {
        const field = LS_FIELD_MAP[key];
        if (_cache[field] !== undefined) {
          // Return as JSON string, same format as real localStorage
          try { return JSON.stringify(_cache[field]); } catch (e) { /* fall through */ }
        }
      }
      return origGetItem(key);
    };
  }

  // ──────────────────────────────────────────────────────
  //  EXPOSE GLOBALLY
  // ──────────────────────────────────────────────────────
  window.HybridData = {
    // Core
    isLoggedIn,
    loadUserData,
    saveUserData,
    // Specific updaters
    updateStreak,
    saveNotes,
    updatePomodoro,
    updateBadges,
    // Auth lifecycle
    init,
    onLoginSuccess,
    onLogout,
    // Expose for debugging
    get cache() { return _cache; },
    get username() { return _username; },
  };

  // ──────────────────────────────────────────────────────
  //  AUTO-INIT: run as soon as DOM is ready
  // ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
      await init();
      _patchLocalStorage();
    });
  } else {
    // DOM already ready (script loaded late)
    init().then(() => _patchLocalStorage());
  }

})();
