// ============================================================
// FLOATING BUTTON START — paste at the END of script.js
// ============================================================

(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────
  const LS_POS    = 'fab_position';
  const LS_NOTES  = 'fab_notes';
  const POMO_WORK = 25 * 60;   // 25 minutes in seconds
  const POMO_BREAK = 5 * 60;   // 5 minutes

  // ── State ──────────────────────────────────────────────────
  let fabOpen      = false;
  let isDragging   = false;
  let dragOffX     = 0, dragOffY = 0;
  let pomoTimer    = null;
  let pomoSeconds  = POMO_WORK;
  let pomoRunning  = false;
  let pomoSession  = 1;
  let pomoIsBreak  = false;
  const CIRCUM     = 2 * Math.PI * 42; // svg circle circumference

  // ── DOM refs (resolved after DOMContentLoaded) ─────────────
  let btn, panel, arc, timeEl, modeEl, startBtn, pauseBtn,
      resetBtn, countEl, notesTa, notesWc, notesSave;

  // ── Init ───────────────────────────────────────────────────
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

    if (!btn || !panel) return; // guard

    restorePosition();
    restoreNotes();
    bindDrag();
    bindPanel();
    bindPomo();
    bindNotes();
    bindTabs();
  }

  // ── Position: restore & snap ───────────────────────────────
  function restorePosition() {
    try {
      const pos = JSON.parse(localStorage.getItem(LS_POS) || 'null');
      if (pos) {
        btn.style.right  = 'auto';
        btn.style.bottom = 'auto';
        btn.style.left   = clamp(pos.x, 0, window.innerWidth  - 52) + 'px';
        btn.style.top    = clamp(pos.y, 0, window.innerHeight - 52) + 'px';
      }
    } catch (e) {}
  }

  function savePosition() {
    try {
      const r = btn.getBoundingClientRect();
      localStorage.setItem(LS_POS, JSON.stringify({ x: r.left, y: r.top }));
    } catch (e) {}
  }

  function snapToEdge() {
    const r   = btn.getBoundingClientRect();
    const cx  = r.left + r.width / 2;
    const mid = window.innerWidth / 2;
    const snapX = cx < mid
      ? 10
      : window.innerWidth - r.width - 10;
    btn.style.transition = 'left 0.25s, top 0.25s';
    btn.style.left = snapX + 'px';
    setTimeout(() => { btn.style.transition = ''; }, 280);
    savePosition();
  }

  // ── Drag ───────────────────────────────────────────────────
  function bindDrag() {
    // Touch
    btn.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
    // Mouse
    btn.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  function getXY(e) {
    return e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
                     : { x: e.clientX,             y: e.clientY };
  }

  function onDragStart(e) {
    const { x, y } = getXY(e);
    const r = btn.getBoundingClientRect();
    dragOffX   = x - r.left;
    dragOffY   = y - r.top;
    isDragging = false;
    btn._dragStartX = x;
    btn._dragStartY = y;
    btn._dragStartTime = Date.now();
    // clear fixed right/bottom, switch to left/top
    btn.style.right  = 'auto';
    btn.style.bottom = 'auto';
    btn.style.left   = r.left + 'px';
    btn.style.top    = r.top  + 'px';
    // Don't preventDefault here — allow click to fire if no drag occurs
  }

  function onDragMove(e) {
    const { x, y } = getXY(e);
    const dx = Math.abs(x - (btn._dragStartX || 0));
    const dy = Math.abs(y - (btn._dragStartY || 0));
    // Only start drag if moved more than 8px
    if (!isDragging && dx < 8 && dy < 8) return;
    if (!isDragging) {
      isDragging = true;
      btn.classList.add('fab-dragging');
    }
    const newX = clamp(x - dragOffX, 0, window.innerWidth  - btn.offsetWidth);
    const newY = clamp(y - dragOffY, 0, window.innerHeight - btn.offsetHeight);
    btn.style.left = newX + 'px';
    btn.style.top  = newY + 'px';
    positionPanel();
    if (e.cancelable) e.preventDefault();
  }

  function onDragEnd() {
    if (!isDragging) {
      // It was a tap, not a drag — let the click handler deal with it
      btn.style.right  = 'auto'; // keep left/top positioning
      return;
    }
    btn.classList.remove('fab-dragging');
    isDragging = false;
    snapToEdge();
    closePanel();
  }

  // ── Panel open / close ─────────────────────────────────────
  function bindPanel() {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isDragging) return;
      fabOpen ? closePanel() : openPanel();
    });

    // Stop panel clicks/taps from bubbling to the document close handler
    panel.addEventListener('click',      function (e) { e.stopPropagation(); });
    panel.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });

    // Close on outside click — use mousedown so it doesn't race with button click handlers
    document.addEventListener('mousedown', function (e) {
      if (fabOpen && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        closePanel();
      }
    });
    document.addEventListener('touchstart', function (e) {
      if (fabOpen && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        closePanel();
      }
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
    const ph  = 340; // approx panel height
    const gap = 10;
    let left  = r.left + r.width / 2 - pw / 2;
    let top   = r.top - ph - gap;
    // Clamp to viewport
    left = clamp(left, 8, window.innerWidth - pw - 8);
    if (top < 8) top = r.bottom + gap; // flip below if not enough room
    panel.style.left = left + 'px';
    panel.style.top  = top  + 'px';
  }

  // ── Tabs ───────────────────────────────────────────────────
  function bindTabs() {
    document.querySelectorAll('.fab-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.fab-tab').forEach(t => t.classList.remove('fab-tab-active'));
        tab.classList.add('fab-tab-active');
        const which = tab.dataset.tab;
        document.getElementById('fab-pomo').style.display  = which === 'pomo'  ? 'flex' : 'none';
        document.getElementById('fab-notes').style.display = which === 'notes' ? 'flex' : 'none';
      });
    });
  }

  // ── Pomodoro ───────────────────────────────────────────────
  function bindPomo() {
    // Use both click AND touchend to guarantee response on mobile
    function addTap(el, fn) {
      el.addEventListener('click', function(e) { e.stopPropagation(); fn(); });
      el.addEventListener('touchend', function(e) {
        e.preventDefault();    // prevent ghost click
        e.stopPropagation();
        fn();
      });
    }
    addTap(startBtn, startPomo);
    addTap(pauseBtn, pausePomo);
    addTap(resetBtn, resetPomo);
    updatePomoUI();
  }

  function startPomo() {
    if (pomoRunning) return;
    pomoRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
    pomoTimer = setInterval(tickPomo, 1000);
  }

  function pausePomo() {
    pomoRunning = false;
    clearInterval(pomoTimer);
    startBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
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
    startBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
    // Play beep sound
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.3, 0.6].forEach(function (delay) {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.3);
      });
    } catch (e) {}

    if (!pomoIsBreak) {
      // Work session done
      if (pomoSession >= 4) {
        pomoSession  = 1;
        pomoIsBreak  = true;
        pomoSeconds  = 15 * 60; // long break after 4
        modeEl.textContent = 'LONG BREAK';
      } else {
        pomoIsBreak  = true;
        pomoSeconds  = POMO_BREAK;
        modeEl.textContent = 'BREAK';
      }
    } else {
      pomoIsBreak = false;
      pomoSeconds = POMO_WORK;
      if (pomoSession < 4) pomoSession++;
      modeEl.textContent = 'FOCUS';
    }
    countEl.textContent = pomoSession;
    updatePomoUI();
    openPanel(); // open panel to show timer ended
  }

  function updatePomoUI() {
    const total  = pomoIsBreak ? (pomoSession >= 4 ? 15 * 60 : POMO_BREAK) : POMO_WORK;
    const m      = Math.floor(pomoSeconds / 60);
    const s      = pomoSeconds % 60;
    timeEl.textContent = pad(m) + ':' + pad(s);
    // Arc progress
    const progress  = pomoSeconds / total;
    const offset    = CIRCUM * (1 - progress);
    arc.style.strokeDashoffset = offset;
    // Arc color: cyan for focus, purple for break
    arc.style.stroke = pomoIsBreak ? 'var(--c2,#7c3aed)' : 'var(--c1,#00e5c8)';
    modeEl.textContent = pomoIsBreak ? 'BREAK' : 'FOCUS';
    countEl.textContent = pomoSession;
  }

  // ── Notes ──────────────────────────────────────────────────
  function restoreNotes() {
    try {
      const saved = localStorage.getItem(LS_NOTES) || '';
      if (saved && notesTa) {
        notesTa.value = saved;
        updateWordCount();
      }
    } catch (e) {}
  }

  function bindNotes() {
    notesTa.addEventListener('input', updateWordCount);
    notesSave.addEventListener('click', function () {
      try {
        localStorage.setItem(LS_NOTES, notesTa.value);
        // Flash button green
        notesSave.style.background = 'rgba(0,229,200,0.3)';
        setTimeout(function () {
          notesSave.style.background = '';
        }, 600);
      } catch (e) {}
    });
    // Auto-save on typing pause
    let autoSaveTimer;
    notesTa.addEventListener('input', function () {
      clearTimeout(autoSaveTimer);
      autoSaveTimer = setTimeout(function () {
        try { localStorage.setItem(LS_NOTES, notesTa.value); } catch (e) {}
      }, 1500);
    });
  }

  function updateWordCount() {
    const words = notesTa.value.trim() === '' ? 0
      : notesTa.value.trim().split(/\s+/).length;
    notesWc.textContent = words + (words === 1 ? ' word' : ' words');
  }

  // ── Helpers ────────────────────────────────────────────────
  function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
  function pad(n) { return String(n).padStart(2, '0'); }

  // ── Boot ───────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fabInit);
  } else {
    fabInit();
  }

})();

// ============================================================
// FLOATING BUTTON END
// ============================================================
