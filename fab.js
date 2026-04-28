// ============================================================
// FLOATING BUTTON START — paste at the END of script.js
// ============================================================

(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────
  const LS_POS    = 'fab_position';
  const LS_NOTES  = 'fab_notes';
  const POMO_WORK  = 25 * 60;
  const POMO_BREAK =  5 * 60;

  // ── State ──────────────────────────────────────────────────
  let fabOpen     = false;
  let isDragging  = false;
  let dragOffX    = 0, dragOffY = 0;
  let pomoTimer   = null;
  let pomoSeconds = POMO_WORK;
  let pomoRunning = false;
  let pomoSession = 1;
  let pomoIsBreak = false;
  const CIRCUM    = 2 * Math.PI * 42;

  // ── DOM refs ────────────────────────────────────────────────
  let btn, panel, arc, timeEl, modeEl, startBtn, pauseBtn,
      resetBtn, countEl, notesTa, notesWc, notesSave;

  // ── Init ────────────────────────────────────────────────────
  function fabInit() {
    btn       = document.getElementById('fab-btn');
    panel     = document.getElementById('fab-panel');
    arc       = document.getElementById('fab-pomo-arc');
    timeEl    = document.getElementById('fab-pomo-time');
    modeEl    = document.getElementById('fab-pomo-mode');
    startBtn  = document.getElementById('fab-pomo-start');
    pauseBtn  = document.getElementById('fab-pomo-pause');
    resetBtn  = document.getElementById('fab-pomo-reset');
    countEl   = document.getElementById('fab-pomo-count');
    notesTa   = document.getElementById('fab-notes-ta');
    notesWc   = document.getElementById('fab-notes-wc');
    notesSave = document.getElementById('fab-notes-save');

    if (!btn || !panel) return;

    restorePosition();
    restoreNotes();
    bindDrag();
    bindPanel();
    bindPomo();
    bindNotes();
    bindTabs();
  }

  // ── Position ─────────────────────────────────────────────────
  // We ALWAYS use left/top in viewport space (position: fixed).
  // localStorage stores the edge-snapped position as a fraction
  // of the viewport so it survives window resizes and orientation changes.

  function setPos(left, top) {
    btn.style.right  = 'auto';
    btn.style.bottom = 'auto';
    btn.style.left   = left + 'px';
    btn.style.top    = top  + 'px';
  }

  function restorePosition() {
    try {
      const pos = JSON.parse(localStorage.getItem(LS_POS) || 'null');
      if (pos && typeof pos.rx === 'number') {
        // Stored as ratio of viewport — safe after resize / orientation flip
        const left = clamp(pos.rx * window.innerWidth,  0, window.innerWidth  - btn.offsetWidth);
        const top  = clamp(pos.ry * window.innerHeight, 0, window.innerHeight - btn.offsetHeight);
        setPos(left, top);
        return;
      }
    } catch (e) {}
    // Default: bottom-right corner (match CSS defaults)
    setPos(
      window.innerWidth  - btn.offsetWidth  - 16,
      window.innerHeight - btn.offsetHeight - 74
    );
  }

  function savePosition() {
    try {
      const r = btn.getBoundingClientRect();
      localStorage.setItem(LS_POS, JSON.stringify({
        rx: r.left / window.innerWidth,
        ry: r.top  / window.innerHeight
      }));
    } catch (e) {}
  }

  // Snap to nearest left or right edge, keep current top
  function snapToEdge() {
    const r    = btn.getBoundingClientRect();
    const cx   = r.left + r.width / 2;
    const snapX = cx < window.innerWidth / 2
      ? 10
      : window.innerWidth - r.width - 10;
    // Clamp top so button doesn't go off screen
    const snapY = clamp(r.top, 10, window.innerHeight - r.height - 10);

    btn.style.transition = 'left 0.22s cubic-bezier(0.25,0.46,0.45,0.94), top 0.1s ease';
    setPos(snapX, snapY);

    setTimeout(function () {
      btn.style.transition = '';
      savePosition();
    }, 250);
  }

  // ── Drag ─────────────────────────────────────────────────────
  // Key fix: position: fixed means left/top ARE viewport coords.
  // clientX/clientY from touch/mouse events are also viewport coords.
  // So: newLeft = clientX - dragOffX   (no scroll adjustment needed).

  function bindDrag() {
    btn.addEventListener('touchstart', onDragStart, { passive: false });
    btn.addEventListener('mousedown',  onDragStart);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('mousemove',  onDragMove);
    document.addEventListener('touchend',  onDragEnd);
    document.addEventListener('mouseup',   onDragEnd);
  }

  function getXY(e) {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function onDragStart(e) {
    const { x, y } = getXY(e);
    const r = btn.getBoundingClientRect();

    // How far the finger/cursor is from the button's top-left corner
    dragOffX = x - r.left;
    dragOffY = y - r.top;

    isDragging = false;
    btn._startX = x;
    btn._startY = y;

    // Switch to left/top immediately so move calcs work correctly.
    // r.left / r.top are already viewport coords for position:fixed.
    btn.style.transition = '';
    setPos(r.left, r.top);

    if (e.cancelable) e.preventDefault();
  }

  function onDragMove(e) {
    if (btn._startX == null) return; // dragStart never fired

    const { x, y } = getXY(e);
    const dx = Math.abs(x - btn._startX);
    const dy = Math.abs(y - btn._startY);

    // 6px threshold before we commit to dragging
    if (!isDragging && dx < 6 && dy < 6) return;

    if (!isDragging) {
      isDragging = true;
      btn.classList.add('fab-dragging');
      closePanel();
    }

    // clientX/Y are viewport coords; left/top for position:fixed are viewport coords.
    // dragOffX keeps the button anchored under the finger exactly where you touched it.
    const newX = clamp(x - dragOffX, 0, window.innerWidth  - btn.offsetWidth);
    const newY = clamp(y - dragOffY, 0, window.innerHeight - btn.offsetHeight);

    setPos(newX, newY);

    if (e.cancelable) e.preventDefault();
  }

  function onDragEnd() {
    if (!isDragging) {
      btn._startX = null;
      btn._startY = null;
      return;
    }

    btn.classList.remove('fab-dragging');
    isDragging  = false;
    btn._startX = null;
    btn._startY = null;

    snapToEdge();
  }

  // ── Panel ───────────────────────────────────────────────────
  function bindPanel() {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isDragging) return;
      fabOpen ? closePanel() : openPanel();
    });

    panel.addEventListener('click',      function (e) { e.stopPropagation(); });
    panel.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });

    document.addEventListener('mousedown', function (e) {
      if (!fabOpen) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      closePanel();
    });
    document.addEventListener('touchstart', function (e) {
      if (!fabOpen) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      closePanel();
    }, { passive: true });
  }

  function openPanel() {
    fabOpen = true;
    positionPanel();
    panel.classList.add('fab-panel-open');
  }

  function closePanel() {
    fabOpen = false;
    panel.classList.remove('fab-panel-open');
  }

  function positionPanel() {
    const r   = btn.getBoundingClientRect();
    const pw  = 280;
    const ph  = 340;
    const gap = 10;
    let left  = r.left + r.width / 2 - pw / 2;
    let top   = r.top - ph - gap;
    left = clamp(left, 8, window.innerWidth - pw - 8);
    if (top < 8) top = r.bottom + gap;
    panel.style.left = left + 'px';
    panel.style.top  = top  + 'px';
  }

  // ── Tabs ────────────────────────────────────────────────────
  function bindTabs() {
    document.querySelectorAll('.fab-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.fab-tab').forEach(t => t.classList.remove('fab-tab-active'));
        tab.classList.add('fab-tab-active');
        const which = tab.dataset.tab;
        const pomoEl  = document.getElementById('fab-pomo');
        const notesEl = document.getElementById('fab-notes');
        if (pomoEl)  pomoEl.style.display  = which === 'pomo'  ? 'flex' : 'none';
        if (notesEl) notesEl.style.display = which === 'notes' ? 'flex' : 'none';
      });
    });
  }

  // ── Pomodoro ────────────────────────────────────────────────
  function bindPomo() {
    function addTap(el, fn) {
      if (!el) return;
      el.addEventListener('click',    function (e) { e.stopPropagation(); fn(); });
      el.addEventListener('touchend', function (e) { e.preventDefault(); e.stopPropagation(); fn(); });
    }
    addTap(startBtn, startPomo);
    addTap(pauseBtn, pausePomo);
    addTap(resetBtn, resetPomo);
    updatePomoUI();
  }

  function startPomo() {
    if (pomoRunning) return;
    pomoRunning = true;
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'flex';
    pomoTimer = setInterval(tickPomo, 1000);
  }

  function pausePomo() {
    pomoRunning = false;
    clearInterval(pomoTimer);
    if (startBtn) startBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
  }

  function resetPomo() {
    pausePomo();
    pomoSeconds = pomoIsBreak ? POMO_BREAK : POMO_WORK;
    updatePomoUI();
  }

  function tickPomo() {
    if (pomoSeconds <= 0) {
      clearInterval(pomoTimer);
      pomoRunning = false;
      onPomoEnd();
      return;
    }
    pomoSeconds--;
    updatePomoUI();
  }

  function onPomoEnd() {
    if (startBtn) startBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.3, 0.6].forEach(function (d) {
        const osc = ctx.createOscillator(), g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.frequency.value = 880; osc.type = 'sine';
        g.gain.setValueAtTime(0.4, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.3);
        osc.start(ctx.currentTime + d);
        osc.stop(ctx.currentTime + d + 0.3);
      });
    } catch (e) {}

    if (!pomoIsBreak) {
      pomoIsBreak = true;
      pomoSeconds = (pomoSession >= 4) ? 15 * 60 : POMO_BREAK;
    } else {
      pomoIsBreak = false;
      pomoSeconds = POMO_WORK;
      if (pomoSession < 4) pomoSession++;
      else pomoSession = 1;
    }
    updatePomoUI();
    openPanel();
  }

  function updatePomoUI() {
    const total = pomoIsBreak
      ? (pomoSession >= 4 ? 15 * 60 : POMO_BREAK)
      : POMO_WORK;
    const m = Math.floor(pomoSeconds / 60);
    const s = pomoSeconds % 60;
    if (timeEl) timeEl.textContent = pad(m) + ':' + pad(s);
    if (arc) {
      arc.style.strokeDashoffset = CIRCUM * (1 - pomoSeconds / total);
      arc.style.stroke = pomoIsBreak ? 'var(--c2,#7c3aed)' : 'var(--c1,#00e5c8)';
    }
    if (modeEl)  modeEl.textContent  = pomoIsBreak ? 'BREAK' : 'FOCUS';
    if (countEl) countEl.textContent = pomoSession;
  }

  // ── Notes ───────────────────────────────────────────────────
  function restoreNotes() {
    try {
      const saved = localStorage.getItem(LS_NOTES) || '';
      if (saved && notesTa) { notesTa.value = saved; updateWordCount(); }
    } catch (e) {}
  }

  function bindNotes() {
    if (!notesTa || !notesSave) return;
    notesTa.addEventListener('input', updateWordCount);
    notesSave.addEventListener('click', function () {
      try {
        localStorage.setItem(LS_NOTES, notesTa.value);
        notesSave.style.background = 'rgba(0,229,200,0.3)';
        setTimeout(function () { notesSave.style.background = ''; }, 600);
      } catch (e) {}
    });
    let autoTimer;
    notesTa.addEventListener('input', function () {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(function () {
        try { localStorage.setItem(LS_NOTES, notesTa.value); } catch (e) {}
      }, 1500);
    });
  }

  function updateWordCount() {
    if (!notesTa || !notesWc) return;
    const w = notesTa.value.trim() === '' ? 0 : notesTa.value.trim().split(/\s+/).length;
    notesWc.textContent = w + (w === 1 ? ' word' : ' words');
  }

  // ── Helpers ─────────────────────────────────────────────────
  function clamp(v, mn, mx) { return Math.min(Math.max(v, mn), mx); }
  function pad(n) { return String(n).padStart(2, '0'); }

  // ── Boot ────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fabInit);
  } else {
    fabInit();
  }

})();

// ============================================================
// FLOATING BUTTON END
// ============================================================
