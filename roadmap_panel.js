/* ═══════════════════════════════════════════════════════
   ROADMAP PANEL — roadmap.sh style day detail panel
   Separate feature file — does NOT modify existing code
   Works with RoadmapX APP object and STRUCTURED_AI_ROADMAP
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────
  let _currentWeek = null;
  let _currentDay  = null;

  // ── Build DOM once ─────────────────────────────────────
  function _buildPanel() {
    if (document.getElementById('rmp-overlay')) return; // already built

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'rmp-overlay';
    overlay.addEventListener('click', close);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'rmp-panel';
    panel.innerHTML = `
      <div class="rmp-handle-wrap"><div class="rmp-handle"></div></div>
      <div class="rmp-header">
        <div class="rmp-header-left">
          <div class="rmp-day-badge">
            <div class="rmp-day-badge-lbl">DAY</div>
            <div class="rmp-day-badge-val" id="rmp-day-num">1</div>
          </div>
          <div class="rmp-header-info">
            <div class="rmp-title" id="rmp-day-title">Loading...</div>
            <div class="rmp-meta-row">
              <span class="rmp-time-pill" id="rmp-day-time">⏱️ —</span>
              <span class="rmp-done-pill" id="rmp-done-pill" style="display:none">✓ Done</span>
            </div>
          </div>
        </div>
        <button class="rmp-close-btn" onclick="RoadmapPanel.close()">✕</button>
      </div>
      <div class="rmp-body" id="rmp-body"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    // Swipe down to close
    _initSwipe(panel);
  }

  // ── Swipe to dismiss ───────────────────────────────────
  function _initSwipe(panel) {
    let startY = 0, isDragging = false;
    panel.addEventListener('touchstart', function (e) {
      const body = document.getElementById('rmp-body');
      if (body && body.scrollTop > 0) return;
      startY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });
    panel.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      const dy = e.touches[0].clientY - startY;
      if (dy > 0) panel.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });
    panel.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      const dy = e.changedTouches[0].clientY - startY;
      panel.style.transform = '';
      if (dy > 80) close();
    }, { passive: true });
  }

  // ── Get day data from STRUCTURED_AI_ROADMAP ────────────
  function _getDayData(weekNum, dayNum) {
    if (typeof STRUCTURED_AI_ROADMAP === 'undefined') return null;
    // We need to know current level — read from APP internals via exposed var
    const levelKey = (typeof aiCurrentLevel !== 'undefined')
      ? aiCurrentLevel
      : (window._aiCurrentLevel || null);
    if (!levelKey) return null;
    const levelData = STRUCTURED_AI_ROADMAP[levelKey];
    if (!levelData) return null;
    const weekData = levelData.weeks.find(w => w.week === weekNum);
    if (!weekData) return null;
    const dayData = weekData.days.find(d => d.day === dayNum);
    return dayData ? { day: dayData, week: weekData, levelKey } : null;
  }

  // ── Check if day is done ───────────────────────────────
  function _isDone(levelKey, weekNum, dayNum) {
    try {
      const stored = localStorage.getItem('ai_struct_' + levelKey);
      if (!stored) return false;
      const prog = JSON.parse(stored);
      return !!(prog['w' + weekNum + 'd' + dayNum]?.done);
    } catch (e) { return false; }
  }

  // ── Open panel ─────────────────────────────────────────
  function open(weekNum, dayNum) {
    _buildPanel();
    _currentWeek = weekNum;
    _currentDay  = dayNum;

    const result = _getDayData(weekNum, dayNum);
    if (!result) {
      console.warn('RoadmapPanel: no data for week', weekNum, 'day', dayNum);
      return;
    }
    const { day, week, levelKey } = result;
    const done = _isDone(levelKey, weekNum, dayNum);

    // Fill header
    document.getElementById('rmp-day-num').textContent   = day.day;
    document.getElementById('rmp-day-title').textContent = day.title;
    document.getElementById('rmp-day-time').textContent  = '⏱️ ' + (day.time || '—');
    const donePill = document.getElementById('rmp-done-pill');
    if (donePill) donePill.style.display = done ? 'inline-flex' : 'none';

    // Fill body
    const body = document.getElementById('rmp-body');
    body.innerHTML = _buildBody(day, week, weekNum, dayNum, levelKey, done);
    body.scrollTop = 0;

    // Show
    const overlay = document.getElementById('rmp-overlay');
    const panel   = document.getElementById('rmp-panel');
    overlay.classList.add('rmp-visible');
    panel.classList.add('rmp-visible');
    document.body.style.overflow = 'hidden';
  }

  // ── Build body HTML ────────────────────────────────────
  function _buildBody(day, week, weekNum, dayNum, levelKey, done) {
    const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

    // Week context pill
    const weekPill = `<div class="rmp-week-context">📅 Week ${weekNum} · ${esc(week.title)}</div>`;

    // Goal section
    const goalSection = `
      <div class="rmp-section">
        <div class="rmp-section-title">🎯 Goal</div>
        <div class="rmp-goal-box">${esc(day.goal)}</div>
      </div>`;

    // Explanation section
    const explSection = day.explanation ? `
      <div class="rmp-section">
        <div class="rmp-section-title">📖 Explanation</div>
        <div class="rmp-text">${esc(day.explanation)}</div>
      </div>` : '';

    // Resources section
    let resSection = '';
    if (day.resources && day.resources.length > 0) {
      const links = day.resources.map(r => {
        const isYt  = r.type === 'yt';
        const ico   = isYt ? '▶' : '🌐';
        const cls   = isYt ? 'yt' : 'web';
        return `<a class="rmp-resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">
          <div class="rmp-resource-ico ${cls}">${ico}</div>
          <span class="rmp-resource-label">${esc(r.label)}</span>
          <span class="rmp-resource-arrow">›</span>
        </a>`;
      }).join('');
      resSection = `
        <div class="rmp-section">
          <div class="rmp-section-title">📺 Resources</div>
          <div class="rmp-resource-list">${links}</div>
        </div>`;
    }

    // Practice section
    const practiceSection = day.practice ? `
      <div class="rmp-section">
        <div class="rmp-section-title">💻 Practice</div>
        <div class="rmp-practice-box">${esc(day.practice)}</div>
      </div>` : '';

    // Task section
    const taskSection = day.task ? `
      <div class="rmp-section">
        <div class="rmp-section-title">🚀 Task</div>
        <div class="rmp-task-box">${esc(day.task)}</div>
      </div>` : '';

    // Divider
    const divider = `<div class="rmp-divider"></div>`;

    // Action buttons
    const doneLabel = done ? '↩️ Mark Incomplete' : '✅ Mark as Done';
    const doneSub   = done ? 'Tap to undo completion' : 'Complete this day & schedule revision';
    const doneCls   = done ? 'rmp-btn-done rmp-is-done' : 'rmp-btn-done';

    const actions = `
      <div class="rmp-section">
        <div class="rmp-section-title">⚡ Actions</div>
        <div class="rmp-actions">

          <button class="rmp-action-btn ${doneCls}" id="rmp-done-btn"
            onclick="RoadmapPanel._handleDone(${weekNum},${dayNum})">
            <div class="rmp-action-ico">${done ? '↩️' : '✅'}</div>
            <div class="rmp-action-text">
              <div class="rmp-action-label">${doneLabel}</div>
              <div class="rmp-action-sub">${doneSub}</div>
            </div>
            <div class="rmp-action-chev">›</div>
          </button>

          <button class="rmp-action-btn rmp-btn-pomo"
            onclick="RoadmapPanel._handlePomo()">
            <div class="rmp-action-ico">⏱️</div>
            <div class="rmp-action-text">
              <div class="rmp-action-label">Start Pomodoro</div>
              <div class="rmp-action-sub">Focus timer for this day</div>
            </div>
            <div class="rmp-action-chev">›</div>
          </button>

          <button class="rmp-action-btn rmp-btn-notes"
            onclick="RoadmapPanel._handleNotes()">
            <div class="rmp-action-ico">📝</div>
            <div class="rmp-action-text">
              <div class="rmp-action-label">Take Notes</div>
              <div class="rmp-action-sub">Write what you learned today</div>
            </div>
            <div class="rmp-action-chev">›</div>
          </button>

          <button class="rmp-action-btn rmp-btn-rev"
            onclick="RoadmapPanel._handleRevision(${weekNum},${dayNum})">
            <div class="rmp-action-ico">🔁</div>
            <div class="rmp-action-text">
              <div class="rmp-action-label">View Revision</div>
              <div class="rmp-action-sub">Check revision schedule</div>
            </div>
            <div class="rmp-action-chev">›</div>
          </button>

        </div>
      </div>`;

    return weekPill + goalSection + explSection + resSection + practiceSection + taskSection + divider + actions;
  }

  // ── Close panel ────────────────────────────────────────
  function close() {
    const overlay = document.getElementById('rmp-overlay');
    const panel   = document.getElementById('rmp-panel');
    if (!overlay || !panel) return;
    overlay.classList.remove('rmp-visible');
    panel.classList.remove('rmp-visible');
    document.body.style.overflow = '';
  }

  // ── Action handlers ────────────────────────────────────

  // Mark done / undone
  function _handleDone(weekNum, dayNum) {
    close();
    // Reuse existing APP function
    if (typeof APP !== 'undefined' && typeof APP.toggleStructuredDone === 'function') {
      APP.toggleStructuredDone(weekNum, dayNum);
    }
  }

  // Open Pomodoro tab
  function _handlePomo() {
    close();
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      APP.switchAISub('pomo', document.getElementById('ai-subtab-pomo'));
    }
  }

  // Open Notes tab
  function _handleNotes() {
    close();
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      APP.switchAISub('notes', document.getElementById('ai-subtab-notes'));
    }
  }

  // Open Revision tab
  function _handleRevision(weekNum, dayNum) {
    close();
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      APP.switchAISub('revision', document.getElementById('ai-subtab-revision'));
    }
  }

  // ── Inject "View Details" button into each day card ────
  // Called after selectAIWeek renders the day cards
  function injectDetailButtons() {
    const dayCards = document.querySelectorAll('[id^="ai-sday-"]');
    dayCards.forEach(card => {
      // avoid duplicate injection
      if (card.querySelector('.rmp-view-btn')) return;

      // parse week and day from id: "ai-sday-{week}-{day}"
      const parts = card.id.split('-');
      const weekNum = parseInt(parts[2], 10);
      const dayNum  = parseInt(parts[3], 10);
      if (isNaN(weekNum) || isNaN(dayNum)) return;

      const body = card.querySelector('.ai-s-body-inner');
      if (!body) return;

      // Insert button at top of body
      const btn = document.createElement('button');
      btn.className = 'rmp-view-btn';
      btn.style.cssText = `
        display: flex; align-items: center; justify-content: center; gap: 7px;
        width: 100%; padding: 10px 14px; margin-bottom: 12px;
        border-radius: 10px;
        background: rgba(0,229,200,0.07);
        border: 1px solid rgba(0,229,200,0.2);
        color: var(--c1);
        font-size: 12px; font-weight: 600;
        font-family: var(--font-ui);
        letter-spacing: 0.3px;
        transition: all 0.18s;
      `;
      btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        View Full Details & Actions
      `;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        open(weekNum, dayNum);
      });
      btn.addEventListener('touchstart', function () {
        btn.style.background = 'rgba(0,229,200,0.14)';
      }, { passive: true });
      btn.addEventListener('touchend', function () {
        btn.style.background = 'rgba(0,229,200,0.07)';
      }, { passive: true });

      body.insertBefore(btn, body.firstChild);
    });
  }

  // ── Auto-inject after selectAIWeek renders days ────────
  // Hook into APP.selectAIWeek using MutationObserver on the days list
  function _watchDaysList() {
    const target = document.getElementById('ai-structured-days-list');
    if (!target) {
      // Retry after DOM ready
      setTimeout(_watchDaysList, 600);
      return;
    }
    const obs = new MutationObserver(function () {
      // Small delay to let rendering complete
      setTimeout(injectDetailButtons, 80);
    });
    obs.observe(target, { childList: true, subtree: false });
  }

  // ── Init ───────────────────────────────────────────────
  function init() {
    _buildPanel();
    _watchDaysList();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Public API ─────────────────────────────────────────
  window.RoadmapPanel = {
    open,
    close,
    injectDetailButtons,
    _handleDone,
    _handlePomo,
    _handleNotes,
    _handleRevision,
  };

})();
