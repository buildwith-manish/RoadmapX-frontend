// ═══════════════════════════════════════════════════════
//  RoadmapX — Roadmap Bridge v2
//  Fixes:
//  1. Home screen progress bar updates correctly
//  2. Badges unlock automatically after completing days
//  3. XP updates correctly
//  4. Streak display stays accurate
//
//  ADD TO index.html AFTER script.js:
//    <script src="roadmap_bridge.js"></script>
// ═══════════════════════════════════════════════════════

(function () {

  // ── Storage helpers ───────────────────────────────────
  function lsGet(k, def) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
    catch (_) { return def; }
  }
  function lsSet(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {}
  }

  // ── Get active level ──────────────────────────────────
  function getActiveLevel() {
    const stored = localStorage.getItem('aiCurrentLevel');
    if (stored) return stored;
    const levels = ['beginner', 'intermediate', 'advanced'];
    let best = 'beginner', bestCount = 0;
    levels.forEach(lk => {
      const count = Object.values(lsGet('ai_struct_' + lk, {}))
                          .filter(v => v && v.done).length;
      if (count > bestCount) { bestCount = count; best = lk; }
    });
    return best;
  }

  // ── Count done/total days ─────────────────────────────
  function getDoneDays(levelKey) {
    return Object.values(lsGet('ai_struct_' + levelKey, {}))
                 .filter(v => v && v.done).length;
  }

  function getTotalDays(levelKey) {
    try {
      const level = STRUCTURED_AI_ROADMAP[levelKey];
      if (!level || !level.weeks) return 0;
      return level.weeks.reduce((sum, w) => sum + w.days.length, 0);
    } catch (_) { return 0; }
  }

  // ── KEY FIX: Sync ai_struct_* → roadmapAI ────────────
  // XP.getStats() reads 'roadmapAI' to count aiDone for badges.
  // But progress is saved in 'ai_struct_beginner' etc.
  // This bridge syncs them so badges unlock correctly.
  function syncProgressToLegacy() {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const merged = lsGet('roadmapAI', {});

    levels.forEach(lk => {
      const prog = lsGet('ai_struct_' + lk, {});
      Object.entries(prog).forEach(([key, val]) => {
        // Prefix key per level to avoid collision
        merged[lk + '_' + key] = val;
      });
    });

    lsSet('roadmapAI', merged);
  }

  // ── Update home screen UI ─────────────────────────────
  function updateHomeProgress() {
    const activeLevel = getActiveLevel();
    const done  = getDoneDays(activeLevel);
    const total = getTotalDays(activeLevel);
    const pct   = total ? Math.round((done / total) * 100) : 0;

    // Progress bar on AI card
    const aiFill = document.getElementById('home-ai-prog');
    if (aiFill) aiFill.style.width = pct + '%';

    // AI Days Done stat pill
    const aiStat = document.getElementById('home-stat-ai');
    if (aiStat) aiStat.textContent = done;

    // Header subtitle
    const hdrSub = document.getElementById('hdr-sub');
    if (hdrSub && done > 0) {
      const label = activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1);
      hdrSub.textContent = '🤖 AI ' + label + ' · ' + pct + '% · Day ' + done + '/' + total;
    }
  }

  // ── Revisions due ─────────────────────────────────────
  function updateRevisionsDue() {
    try {
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const revisions = lsGet('revisions', []);
      // revisions can be either a flat array or an object of arrays (spaced-rep format)
      let items = [];
      if (Array.isArray(revisions)) {
        items = revisions;
      } else {
        Object.values(revisions).forEach(v => { if (Array.isArray(v)) items = items.concat(v); });
      }
      const due = items.filter(r => r && !r.done && r.date <= today).length;
      const el = document.getElementById('home-stat-rev');
      if (el) el.textContent = due;
    } catch (_) {}
  }

  // ── Streak display ────────────────────────────────────
  function updateStreakDisplay() {
    try {
      const streaks = lsGet('streaks', {});
      const maxStreak = Math.max(
        streaks.ai?.current  || 0,
        streaks.dsa?.current || 0,
        streaks.ai?.longest  || 0,
        streaks.dsa?.longest || 0
      );
      const statEl = document.getElementById('home-stat-streak');
      if (statEl) statEl.textContent = maxStreak;
      const hdrEl = document.getElementById('hdr-streak');
      if (hdrEl) hdrEl.textContent = '🔥 ' + maxStreak;
    } catch (_) {}
  }

  // ── Refresh badges + XP ───────────────────────────────
  function refreshBadgesAndXP() {
    syncProgressToLegacy();
    const xpModule = (typeof XP !== 'undefined') ? XP
                   : (typeof window._XP !== 'undefined') ? window._XP
                   : null;
    if (xpModule && typeof xpModule.render === 'function') {
      xpModule.render();
    }
  }

  // ── Full refresh ──────────────────────────────────────
  function fullRefresh() {
    updateHomeProgress();
    updateRevisionsDue();
    updateStreakDisplay();
    refreshBadgesAndXP();
  }

  // ── Patch: toggleStructuredDone ───────────────────────
  function patchToggleDone() {
    if (typeof APP === 'undefined') return;
    const orig = APP.toggleStructuredDone;
    if (typeof orig !== 'function') return;
    APP.toggleStructuredDone = function (weekNum, dayNum) {
      orig.call(APP, weekNum, dayNum);
      setTimeout(fullRefresh, 80);
    };
  }

  // ── Patch: selectAILevel ──────────────────────────────
  function patchSelectLevel() {
    if (typeof APP === 'undefined') return;
    const orig = APP.selectAILevel;
    if (typeof orig !== 'function') return;
    APP.selectAILevel = function (levelKey) {
      try { localStorage.setItem('aiCurrentLevel', levelKey); } catch (_) {}
      orig.call(APP, levelKey);
      setTimeout(updateHomeProgress, 100);
    };
  }

  // ── Patch: switchTab ──────────────────────────────────
  function patchSwitchTab() {
    if (typeof APP === 'undefined') return;
    const orig = APP.switchTab;
    if (typeof orig !== 'function') return;
    APP.switchTab = function (name) {
      orig.call(APP, name);
      if (name === 'home')   setTimeout(fullRefresh, 100);
      if (name === 'badges') setTimeout(refreshBadgesAndXP, 100);
    };
  }

  // ── Init ──────────────────────────────────────────────
  function init() {
    syncProgressToLegacy();
    updateHomeProgress();
    updateRevisionsDue();
    updateStreakDisplay();
    patchToggleDone();
    patchSelectLevel();
    patchSwitchTab();
    setTimeout(refreshBadgesAndXP, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 650);
  }

})();
