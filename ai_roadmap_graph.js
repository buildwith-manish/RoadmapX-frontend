/**
 * ai_roadmap_graph.js  — RoadmapX
 * ─────────────────────────────────────────────────────────────
 * Graph view for AI Roadmap (levels → weeks → days)
 * Click a node → roadmap.sh style slide-up panel opens
 *   showing: Goal · Explanation · Resources · Practice · Task
 *   + action buttons: Mark Done · Pomodoro · Notes · Revision
 *
 * Self-contained — no changes to script.js or index.html
 * except the 3 hooks already wired + <script> tag.
 */

(function () {
  'use strict';

  // ─── GRAPH CONFIG ────────────────────────────────────────────
  const NODE_W      = 210;
  const NODE_H      = 58;
  const V_GAP       = 64;
  const GROUP_GAP   = 28;
  const GROUP_LBL_H = 28;
  const SVG_PAD_X   = 20;
  const SVG_PAD_TOP = 20;
  const SVG_PAD_BOT = 48;

  // ─── MODULE STATE ────────────────────────────────────────────
  let _graphMode  = false;
  let _toggleBtn  = null;
  let _svgWrapper = null;
  let _levelKey   = null;   // current level key

  // ─── STORAGE HELPER ─────────────────────────────────────────
  function _load(key, def) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch(e) { return def; }
  }
  function _save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  // ─── ESCAPE HTML ─────────────────────────────────────────────
  function esc(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ─── DATA BUILDER ────────────────────────────────────────────
  function buildSteps(levelKey) {
    const levelData = (typeof STRUCTURED_AI_ROADMAP !== 'undefined')
      ? STRUCTURED_AI_ROADMAP[levelKey] : null;
    if (!levelData) return [];
    const prog  = _load('ai_struct_' + levelKey, {});
    const steps = [];
    levelData.weeks.forEach(week => {
      week.days.forEach(d => {
        const pKey = 'w' + week.week + 'd' + d.day;
        steps.push({
          _id:       pKey,
          title:     d.title,
          goal:      d.goal,
          explanation: d.explanation,
          resources: d.resources || [],
          practice:  d.practice,
          task:      d.task,
          time:      d.time,
          weekNum:   week.week,
          weekLabel: week.title,
          dayNum:    d.day,
          completed: !!(prog[pKey] && prog[pKey].done),
        });
      });
    });
    return steps;
  }

  function groupByWeek(steps) {
    const map = new Map();
    steps.forEach(s => {
      if (!map.has(s.weekNum))
        map.set(s.weekNum, { weekNum: s.weekNum, weekLabel: s.weekLabel, steps: [] });
      map.get(s.weekNum).steps.push(s);
    });
    return Array.from(map.values());
  }

  function getCurrentStepId(steps) {
    const f = steps.find(s => !s.completed);
    return f ? f._id : null;
  }

  // ════════════════════════════════════════════════════════════
  //  PANEL  — roadmap.sh style slide-up detail sheet
  // ════════════════════════════════════════════════════════════

  function _buildPanelDOM() {
    if (document.getElementById('aig-panel')) return;

    // ── Inject styles ──────────────────────────────────────────
    const style = document.createElement('style');
    style.id = 'aig-panel-styles';
    style.textContent = `
      /* Overlay */
      #aig-overlay {
        position:fixed; inset:0; z-index:800;
        background:rgba(0,0,0,0.65);
        backdrop-filter:blur(5px);
        opacity:0; pointer-events:none;
        transition:opacity 0.26s cubic-bezier(0.4,0,0.2,1);
      }
      #aig-overlay.aig-open { opacity:1; pointer-events:all; }

      /* Panel sheet */
      #aig-panel {
        position:fixed; left:0; right:0; bottom:0; z-index:900;
        max-height:90vh;
        background:#08081a;
        border-top:1px solid rgba(255,255,255,0.07);
        border-radius:20px 20px 0 0;
        display:flex; flex-direction:column;
        transform:translateY(100%);
        transition:transform 0.32s cubic-bezier(0.34,1.15,0.64,1);
        box-shadow:0 -8px 48px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,229,200,0.07);
      }
      #aig-panel.aig-open { transform:translateY(0); }
      #aig-panel::before {
        content:''; position:absolute; top:0; left:10%; right:10%;
        height:1px;
        background:linear-gradient(90deg,transparent,#00e5c8,#7c3aed,transparent);
        opacity:0.45; border-radius:1px;
      }

      /* Handle */
      .aig-handle { display:flex; justify-content:center; padding:10px 0 4px; flex-shrink:0; }
      .aig-handle-bar { width:36px; height:4px; border-radius:2px; background:#1e1e4a; }

      /* Header */
      .aig-hdr {
        display:flex; align-items:flex-start; justify-content:space-between;
        padding:6px 16px 13px; flex-shrink:0;
        border-bottom:1px solid rgba(255,255,255,0.05);
      }
      .aig-hdr-left { display:flex; align-items:center; gap:10px; flex:1; min-width:0; }
      .aig-day-badge {
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        width:44px; height:44px; border-radius:10px;
        background:#101028; border:1px solid rgba(255,255,255,0.08);
        flex-shrink:0;
      }
      .aig-day-badge-lbl { font-size:8px; font-weight:700; color:#00e5c8; letter-spacing:1px; font-family:monospace; }
      .aig-day-badge-val { font-size:18px; font-weight:800; color:#f0f0ff; font-family:monospace; line-height:1; }
      .aig-hdr-info { flex:1; min-width:0; }
      .aig-panel-title { font-size:15px; font-weight:700; color:#f0f0ff; line-height:1.3; margin-bottom:5px; }
      .aig-meta-row { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
      .aig-time-pill {
        display:inline-flex; align-items:center; gap:4px;
        padding:2px 8px; border-radius:9999px;
        background:rgba(0,229,200,0.08); border:1px solid rgba(0,229,200,0.18);
        font-size:10px; font-weight:600; color:#00e5c8; font-family:monospace;
      }
      .aig-done-pill {
        display:none; align-items:center; gap:4px;
        padding:2px 8px; border-radius:9999px;
        background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25);
        font-size:10px; font-weight:700; color:#10b981; font-family:monospace;
      }
      .aig-done-pill.aig-show { display:inline-flex; }
      .aig-close {
        width:32px; height:32px; border-radius:8px;
        background:#101028; border:1px solid rgba(255,255,255,0.08);
        color:#8080a8; display:flex; align-items:center; justify-content:center;
        font-size:17px; flex-shrink:0; margin-left:10px;
        transition:all 0.18s; cursor:pointer;
      }
      .aig-close:active { transform:scale(0.88); background:#141432; }

      /* Scrollable body */
      #aig-panel-body {
        flex:1; overflow-y:auto; -webkit-overflow-scrolling:touch;
        overscroll-behavior:contain; padding:14px 16px 32px;
        display:flex; flex-direction:column; gap:16px;
      }
      #aig-panel-body::-webkit-scrollbar { width:3px; }
      #aig-panel-body::-webkit-scrollbar-thumb { background:#1e1e4a; border-radius:2px; }

      /* Section title */
      .aig-sec-title {
        font-size:9px; font-weight:700; color:#00e5c8;
        letter-spacing:1.5px; text-transform:uppercase;
        font-family:monospace;
        display:flex; align-items:center; gap:6px;
        margin-bottom:7px;
      }
      .aig-sec-title::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,rgba(0,229,200,0.2),transparent); }

      /* Content boxes */
      .aig-goal-box {
        background:#101028; border:1px solid rgba(0,229,200,0.12);
        border-left:3px solid #00e5c8; border-radius:0 10px 10px 0;
        padding:10px 12px; font-size:13px; color:#f0f0ff;
        font-weight:500; line-height:1.55;
      }
      .aig-expl-text { font-size:13px; color:#8080a8; line-height:1.65; }
      .aig-practice-box {
        background:#101028; border:1px solid rgba(124,58,237,0.15);
        border-left:3px solid #7c3aed; border-radius:0 10px 10px 0;
        padding:10px 12px; font-size:12px; color:#8080a8; line-height:1.6;
      }
      .aig-task-box {
        background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.18);
        border-left:3px solid #f59e0b; border-radius:0 10px 10px 0;
        padding:10px 12px; font-size:12px; color:#8080a8; line-height:1.6;
      }

      /* Resource links */
      .aig-res-list { display:flex; flex-direction:column; gap:7px; }
      .aig-res-link {
        display:flex; align-items:center; gap:10px;
        padding:9px 12px; border-radius:10px;
        background:#101028; border:1px solid rgba(255,255,255,0.07);
        color:#f0f0ff; text-decoration:none;
        font-size:12px; font-weight:500;
        transition:all 0.18s; -webkit-tap-highlight-color:transparent;
      }
      .aig-res-link:active { background:#141432; transform:scale(0.97); }
      .aig-res-ico {
        width:28px; height:28px; border-radius:7px;
        display:flex; align-items:center; justify-content:center;
        font-size:12px; flex-shrink:0;
      }
      .aig-res-ico.yt  { background:rgba(255,0,0,0.15); }
      .aig-res-ico.web { background:rgba(0,229,200,0.1); }
      .aig-res-lbl { flex:1; font-size:12px; color:#f0f0ff; }
      .aig-res-arr { color:#404060; font-size:15px; }

      /* Action buttons */
      .aig-actions { display:flex; flex-direction:column; gap:9px; }
      .aig-act-btn {
        display:flex; align-items:center; gap:12px;
        padding:13px 16px; border-radius:12px;
        font-size:13px; font-weight:600; color:#f0f0ff;
        background:#101028; border:1px solid rgba(255,255,255,0.07);
        transition:all 0.18s; text-align:left;
        -webkit-tap-highlight-color:transparent; cursor:pointer; width:100%;
      }
      .aig-act-btn:active { transform:scale(0.97); }
      .aig-act-ico { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; }
      .aig-act-body { display:flex; flex-direction:column; gap:1px; flex:1; }
      .aig-act-lbl { font-size:13px; font-weight:600; }
      .aig-act-sub { font-size:10px; color:#8080a8; font-weight:400; }
      .aig-act-chev { color:#404060; font-size:16px; }

      .aig-btn-done { background:rgba(16,185,129,0.07); border-color:rgba(16,185,129,0.22); }
      .aig-btn-done .aig-act-ico { background:rgba(16,185,129,0.12); }
      .aig-btn-done .aig-act-lbl { color:#10b981; }
      .aig-btn-done.aig-is-done { background:rgba(16,185,129,0.13); border-color:rgba(16,185,129,0.38); }

      .aig-btn-pomo { background:rgba(0,229,200,0.06); border-color:rgba(0,229,200,0.16); }
      .aig-btn-pomo .aig-act-ico { background:rgba(0,229,200,0.10); }
      .aig-btn-pomo .aig-act-lbl { color:#00e5c8; }

      .aig-btn-notes { background:rgba(124,58,237,0.07); border-color:rgba(124,58,237,0.18); }
      .aig-btn-notes .aig-act-ico { background:rgba(124,58,237,0.12); }
      .aig-btn-notes .aig-act-lbl { color:#7c3aed; }

      .aig-btn-rev { background:rgba(245,158,11,0.06); border-color:rgba(245,158,11,0.16); }
      .aig-btn-rev .aig-act-ico { background:rgba(245,158,11,0.10); }
      .aig-btn-rev .aig-act-lbl { color:#f59e0b; }

      .aig-divider { height:1px; background:rgba(255,255,255,0.04); }

      /* Week context pill */
      .aig-week-ctx {
        display:inline-flex; align-items:center; gap:5px;
        padding:3px 10px; border-radius:9999px;
        background:#101028; border:1px solid rgba(255,255,255,0.07);
        font-size:10px; color:#8080a8; font-family:monospace;
        font-weight:600; letter-spacing:0.5px; align-self:flex-start;
      }

      /* Graph toggle button styles */
      @keyframes aig-pulse {
        0%,100% { opacity:.55; } 50% { opacity:1; }
      }
      .aig-node:focus { outline:none; }
      #aig-toggle-btn:hover {
        background:rgba(0,229,200,0.08) !important;
        border-color:rgba(0,229,200,0.35) !important;
      }
      #aig-svg-wrapper::-webkit-scrollbar { width:4px; height:4px; }
      #aig-svg-wrapper::-webkit-scrollbar-track { background:transparent; }
      #aig-svg-wrapper::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
    `;
    document.head.appendChild(style);

    // ── Overlay ────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'aig-overlay';
    overlay.addEventListener('click', _closePanel);

    // ── Panel ──────────────────────────────────────────────────
    const panel = document.createElement('div');
    panel.id = 'aig-panel';
    panel.innerHTML = `
      <div class="aig-handle"><div class="aig-handle-bar"></div></div>
      <div class="aig-hdr">
        <div class="aig-hdr-left">
          <div class="aig-day-badge">
            <div class="aig-day-badge-lbl">DAY</div>
            <div class="aig-day-badge-val" id="aig-p-daynum">1</div>
          </div>
          <div class="aig-hdr-info">
            <div class="aig-panel-title" id="aig-p-title">Loading…</div>
            <div class="aig-meta-row">
              <span class="aig-time-pill" id="aig-p-time">⏱️ —</span>
              <span class="aig-done-pill" id="aig-p-donepill">✓ Done</span>
            </div>
          </div>
        </div>
        <button class="aig-close" id="aig-close-btn">✕</button>
      </div>
      <div id="aig-panel-body"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    document.getElementById('aig-close-btn').addEventListener('click', _closePanel);

    // Swipe down to close
    let _startY = 0, _dragging = false;
    panel.addEventListener('touchstart', e => {
      const body = document.getElementById('aig-panel-body');
      if (body && body.scrollTop > 0) return;
      _startY = e.touches[0].clientY; _dragging = true;
    }, { passive: true });
    panel.addEventListener('touchmove', e => {
      if (!_dragging) return;
      const dy = e.touches[0].clientY - _startY;
      if (dy > 0) panel.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    panel.addEventListener('touchend', e => {
      if (!_dragging) return; _dragging = false;
      panel.style.transform = '';
      if (e.changedTouches[0].clientY - _startY > 80) _closePanel();
    }, { passive: true });
  }

  // ─── OPEN PANEL ──────────────────────────────────────────────
  function _openPanel(step) {
    _buildPanelDOM();

    const done = step.completed;

    // Header
    document.getElementById('aig-p-daynum').textContent = step.dayNum;
    document.getElementById('aig-p-title').textContent  = step.title;
    document.getElementById('aig-p-time').textContent   = '⏱️ ' + (step.time || '—');
    const dp = document.getElementById('aig-p-donepill');
    dp.classList.toggle('aig-show', done);

    // Body
    document.getElementById('aig-panel-body').innerHTML = _buildPanelBody(step, done);
    document.getElementById('aig-panel-body').scrollTop = 0;

    // Show
    document.getElementById('aig-overlay').classList.add('aig-open');
    document.getElementById('aig-panel').classList.add('aig-open');
    document.body.style.overflow = 'hidden';
  }

  // ─── PANEL BODY HTML ─────────────────────────────────────────
  function _buildPanelBody(step, done) {
    const weekCtx = `<div class="aig-week-ctx">📅 Week ${step.weekNum} · ${esc(step.weekLabel)}</div>`;

    const goal = `
      <div>
        <div class="aig-sec-title">🎯 Goal</div>
        <div class="aig-goal-box">${esc(step.goal)}</div>
      </div>`;

    const expl = step.explanation ? `
      <div>
        <div class="aig-sec-title">📖 Explanation</div>
        <div class="aig-expl-text">${esc(step.explanation)}</div>
      </div>` : '';

    let resources = '';
    if (step.resources && step.resources.length) {
      const links = step.resources.map(r => {
        const isYt = r.type === 'yt';
        return `<a class="aig-res-link" href="${esc(r.url)}" target="_blank" rel="noopener">
          <div class="aig-res-ico ${isYt ? 'yt' : 'web'}">${isYt ? '▶' : '🌐'}</div>
          <span class="aig-res-lbl">${esc(r.label)}</span>
          <span class="aig-res-arr">›</span>
        </a>`;
      }).join('');
      resources = `
        <div>
          <div class="aig-sec-title">📺 Resources</div>
          <div class="aig-res-list">${links}</div>
        </div>`;
    }

    const practice = step.practice ? `
      <div>
        <div class="aig-sec-title">💻 Practice</div>
        <div class="aig-practice-box">${esc(step.practice)}</div>
      </div>` : '';

    const task = step.task ? `
      <div>
        <div class="aig-sec-title">🚀 Task</div>
        <div class="aig-task-box">${esc(step.task)}</div>
      </div>` : '';

    const divider = `<div class="aig-divider"></div>`;

    const doneLbl = done ? '↩️ Mark Incomplete' : '✅ Mark as Done';
    const doneSub = done ? 'Tap to undo completion' : 'Complete & schedule revision';
    const doneCls = done ? 'aig-btn-done aig-is-done' : 'aig-btn-done';

    const actions = `
      <div>
        <div class="aig-sec-title">⚡ Actions</div>
        <div class="aig-actions">

          <button class="aig-act-btn ${doneCls}" id="aig-act-done"
            onclick="window._aigHandleDone(${step.weekNum},${step.dayNum})">
            <div class="aig-act-ico">${done ? '↩️' : '✅'}</div>
            <div class="aig-act-body">
              <div class="aig-act-lbl">${doneLbl}</div>
              <div class="aig-act-sub">${doneSub}</div>
            </div>
            <div class="aig-act-chev">›</div>
          </button>

          <button class="aig-act-btn aig-btn-pomo"
            onclick="window._aigHandlePomo()">
            <div class="aig-act-ico">⏱️</div>
            <div class="aig-act-body">
              <div class="aig-act-lbl">Start Pomodoro</div>
              <div class="aig-act-sub">Focus timer for this day</div>
            </div>
            <div class="aig-act-chev">›</div>
          </button>

          <button class="aig-act-btn aig-btn-notes"
            onclick="window._aigHandleNotes()">
            <div class="aig-act-ico">📝</div>
            <div class="aig-act-body">
              <div class="aig-act-lbl">Take Notes</div>
              <div class="aig-act-sub">Write what you learned today</div>
            </div>
            <div class="aig-act-chev">›</div>
          </button>

          <button class="aig-act-btn aig-btn-rev"
            onclick="window._aigHandleRevision()">
            <div class="aig-act-ico">🔁</div>
            <div class="aig-act-body">
              <div class="aig-act-lbl">View Revision Schedule</div>
              <div class="aig-act-sub">Check upcoming revision for this day</div>
            </div>
            <div class="aig-act-chev">›</div>
          </button>

        </div>
      </div>`;

    return weekCtx + goal + expl + resources + practice + task + divider + actions;
  }

  // ─── CLOSE PANEL ─────────────────────────────────────────────
  function _closePanel() {
    const o = document.getElementById('aig-overlay');
    const p = document.getElementById('aig-panel');
    if (o) o.classList.remove('aig-open');
    if (p) p.classList.remove('aig-open');
    document.body.style.overflow = '';
  }

  // ─── ACTION HANDLERS (global so inline onclick works) ────────
  window._aigHandleDone = function(weekNum, dayNum) {
    _closePanel();
    if (typeof APP !== 'undefined' && typeof APP.toggleStructuredDone === 'function') {
      APP.toggleStructuredDone(weekNum, dayNum);
      // Refresh graph after short delay so progress reflects
      setTimeout(() => { if (_graphMode) renderAIGraph(); }, 350);
    }
  };

  window._aigHandlePomo = function() {
    _closePanel();
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      APP.switchAISub('pomo', document.getElementById('ai-subtab-pomo'));
    }
  };

  window._aigHandleNotes = function() {
    _closePanel();
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      APP.switchAISub('notes', document.getElementById('ai-subtab-notes'));
    }
  };

  window._aigHandleRevision = function() {
    _closePanel();
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      APP.switchAISub('revision', document.getElementById('ai-subtab-revision'));
    }
  };

  // ════════════════════════════════════════════════════════════
  //  GRAPH RENDERER
  // ════════════════════════════════════════════════════════════
  function renderAIGraph() {
    if (!_levelKey) {
      _svgWrapper.innerHTML = '<div style="padding:40px;text-align:center;color:rgba(255,255,255,0.3);font-size:13px;">Select a level first.</div>';
      return;
    }

    const steps   = buildSteps(_levelKey);
    const groups  = groupByWeek(steps);
    const current = getCurrentStepId(steps);

    _svgWrapper.innerHTML = '';

    if (!steps.length) {
      _svgWrapper.innerHTML = '<div style="padding:40px;text-align:center;color:rgba(255,255,255,0.3);font-size:13px;">No days found.</div>';
      return;
    }

    // ── Layout pass ───────────────────────────────────────────
    const totalW  = NODE_W + SVG_PAD_X * 2;
    const centreX = totalW / 2;
    let y = SVG_PAD_TOP;
    const nodePositions = [];

    groups.forEach((group, gi) => {
      group._labelY = y;
      y += GROUP_LBL_H + 10;

      group.steps.forEach((step, si) => {
        nodePositions.push({ step, x: centreX - NODE_W / 2, y, cx: centreX, cy: y + NODE_H / 2 });
        y += NODE_H;
        if (si < group.steps.length - 1) y += V_GAP;
      });

      if (gi < groups.length - 1) y += GROUP_GAP;
    });

    const totalH = y + SVG_PAD_BOT;
    const NS = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', totalW);
    svg.setAttribute('height', totalH);
    svg.setAttribute('viewBox', `0 0 ${totalW} ${totalH}`);
    svg.style.cssText = 'display:block;';

    // ── Defs ──────────────────────────────────────────────────
    const defs = document.createElementNS(NS, 'defs');
    defs.appendChild(_makeLinearGrad(NS,'aig-grad-done',[['0%','#00e5c8',1],['100%','#7c3aed',1]],0,0,100,100));
    defs.appendChild(_makeLinearGrad(NS,'aig-grad-line',[['0%','#00e5c8',0.7],['100%','#7c3aed',0.25]],0,0,0,100));
    defs.appendChild(_makeGlowFilter(NS,'aig-glow',3));
    defs.appendChild(_makeArrow(NS,'aig-arrow','rgba(0,229,200,0.5)'));
    svg.appendChild(defs);

    // ── Week group backgrounds + labels ───────────────────────
    groups.forEach(group => {
      const firstPos = nodePositions.find(p => p.step.weekNum === group.weekNum);
      const lastPos  = nodePositions.filter(p => p.step.weekNum === group.weekNum).slice(-1)[0];
      if (!firstPos || !lastPos) return;

      const strip = document.createElementNS(NS, 'rect');
      strip.setAttribute('x', SVG_PAD_X - 8);
      strip.setAttribute('y', group._labelY - 6);
      strip.setAttribute('width', NODE_W + 16);
      strip.setAttribute('height', lastPos.y + NODE_H - group._labelY + 18);
      strip.setAttribute('rx', '12');
      strip.setAttribute('fill', 'rgba(255,255,255,0.025)');
      strip.setAttribute('stroke', 'rgba(255,255,255,0.04)');
      strip.setAttribute('stroke-width', '1');
      svg.appendChild(strip);

      const wkText = document.createElementNS(NS, 'text');
      wkText.setAttribute('x', centreX);
      wkText.setAttribute('y', group._labelY + 14);
      wkText.setAttribute('text-anchor', 'middle');
      wkText.setAttribute('fill', 'rgba(255,255,255,0.22)');
      wkText.setAttribute('font-size', '9');
      wkText.setAttribute('font-family', 'monospace');
      wkText.setAttribute('font-weight', '700');
      wkText.setAttribute('letter-spacing', '2');
      wkText.textContent = `WEEK ${group.weekNum} — ${group.weekLabel.toUpperCase().slice(0, 32)}`;
      svg.appendChild(wkText);
    });

    // ── Edges ─────────────────────────────────────────────────
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const from = nodePositions[i], to = nodePositions[i + 1];
      const x1 = from.cx, y1 = from.y + NODE_H;
      const x2 = to.cx,   y2 = to.y;
      const cy1 = y1 + (y2 - y1) * 0.4;
      const cy2 = y2 - (y2 - y1) * 0.4;
      const crossWeek = from.step.weekNum !== to.step.weekNum;
      const bothDone  = from.step.completed && to.step.completed;

      const edge = document.createElementNS(NS, 'path');
      edge.setAttribute('d', `M${x1},${y1} C${x1},${cy1} ${x2},${cy2} ${x2},${y2}`);
      edge.setAttribute('fill', 'none');
      edge.setAttribute('stroke', crossWeek ? 'rgba(255,255,255,0.06)' : bothDone ? 'url(#aig-grad-line)' : 'rgba(255,255,255,0.08)');
      edge.setAttribute('stroke-width', crossWeek ? '1' : '2');
      edge.setAttribute('stroke-dasharray', (crossWeek || !from.step.completed) ? '5 4' : 'none');
      if (!crossWeek) edge.setAttribute('marker-end', 'url(#aig-arrow)');
      svg.appendChild(edge);
    }

    // ── Nodes ─────────────────────────────────────────────────
    nodePositions.forEach((pos, idx) => {
      const { step, x, y, cx, cy } = pos;
      const isCurrent   = step._id === current;
      const isCompleted = step.completed;
      const isLocked    = !isCompleted && !isCurrent && idx > 0 && !nodePositions[idx - 1].step.completed;

      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'aig-node');
      g.setAttribute('role', 'button');
      g.setAttribute('tabindex', isLocked ? '-1' : '0');
      g.setAttribute('aria-label', `Day ${step.dayNum}: ${step.title}${isCompleted ? ' (done)' : isCurrent ? ' — current' : ''}`);
      g.style.cursor  = isLocked ? 'default' : 'pointer';
      g.style.opacity = isLocked ? '0.35' : '1';

      // Glow halo — completed
      if (isCompleted) {
        const halo = document.createElementNS(NS, 'rect');
        halo.setAttribute('x', x - 2); halo.setAttribute('y', y - 2);
        halo.setAttribute('width', NODE_W + 4); halo.setAttribute('height', NODE_H + 4);
        halo.setAttribute('rx', '12'); halo.setAttribute('fill', 'none');
        halo.setAttribute('stroke', 'rgba(0,229,200,0.20)');
        halo.setAttribute('stroke-width', '5');
        halo.setAttribute('filter', 'url(#aig-glow)');
        g.appendChild(halo);
      }

      // Pulsing ring — current
      if (isCurrent) {
        const ring = document.createElementNS(NS, 'rect');
        ring.setAttribute('x', x - 2); ring.setAttribute('y', y - 2);
        ring.setAttribute('width', NODE_W + 4); ring.setAttribute('height', NODE_H + 4);
        ring.setAttribute('rx', '12'); ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', '#f59e0b');
        ring.setAttribute('stroke-width', '2'); ring.setAttribute('opacity', '0.7');
        g.appendChild(ring);
      }

      // Node body rect
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y);
      rect.setAttribute('width', NODE_W); rect.setAttribute('height', NODE_H);
      rect.setAttribute('rx', '10');
      rect.setAttribute('fill',
        isCompleted ? 'rgba(0,229,200,0.07)' :
        isCurrent   ? 'rgba(245,158,11,0.06)' :
                      'rgba(255,255,255,0.04)');
      rect.setAttribute('stroke',
        isCompleted ? 'rgba(0,229,200,0.50)' :
        isCurrent   ? 'rgba(245,158,11,0.55)' :
                      'rgba(255,255,255,0.07)');
      rect.setAttribute('stroke-width', isCompleted || isCurrent ? '1.5' : '1');
      g.appendChild(rect);

      // Day badge circle
      const badgeR = 12, badgeCx = x + 20, badgeCy = cy;
      const badge = document.createElementNS(NS, 'circle');
      badge.setAttribute('cx', badgeCx); badge.setAttribute('cy', badgeCy);
      badge.setAttribute('r', badgeR);
      badge.setAttribute('fill',
        isCompleted ? 'url(#aig-grad-done)' :
        isCurrent   ? 'rgba(245,158,11,0.20)' :
                      'rgba(255,255,255,0.06)');
      g.appendChild(badge);

      if (isCompleted) {
        const ck = document.createElementNS(NS, 'path');
        ck.setAttribute('d', `M${badgeCx-5},${badgeCy} L${badgeCx-1},${badgeCy+4} L${badgeCx+6},${badgeCy-5}`);
        ck.setAttribute('fill', 'none'); ck.setAttribute('stroke', '#000');
        ck.setAttribute('stroke-width', '2.2');
        ck.setAttribute('stroke-linecap', 'round'); ck.setAttribute('stroke-linejoin', 'round');
        g.appendChild(ck);
      } else {
        const numT = document.createElementNS(NS, 'text');
        numT.setAttribute('x', badgeCx); numT.setAttribute('y', badgeCy + 4);
        numT.setAttribute('text-anchor', 'middle');
        numT.setAttribute('fill', isCurrent ? '#f59e0b' : 'rgba(255,255,255,0.35)');
        numT.setAttribute('font-size', '9'); numT.setAttribute('font-family', 'monospace');
        numT.setAttribute('font-weight', '700');
        numT.textContent = String(step.dayNum);
        g.appendChild(numT);
      }

      // Title text
      const titleX   = x + 40;
      const maxChars = Math.floor((NODE_W - 48) / 6.8);
      const display  = step.title.length > maxChars ? step.title.slice(0, maxChars - 1) + '…' : step.title;

      const titleT = document.createElementNS(NS, 'text');
      titleT.setAttribute('x', titleX); titleT.setAttribute('y', cy - 5);
      titleT.setAttribute('fill',
        isCompleted ? '#00e5c8' : isCurrent ? '#f59e0b' : 'rgba(255,255,255,0.80)');
      titleT.setAttribute('font-size', '11');
      titleT.setAttribute('font-family', 'var(--font-ui, system-ui, sans-serif)');
      titleT.setAttribute('font-weight', '600');
      titleT.textContent = display;
      g.appendChild(titleT);

      // Time sub-label
      if (step.time) {
        const timeT = document.createElementNS(NS, 'text');
        timeT.setAttribute('x', titleX); timeT.setAttribute('y', cy + 10);
        timeT.setAttribute('fill', 'rgba(255,255,255,0.25)');
        timeT.setAttribute('font-size', '9'); timeT.setAttribute('font-family', 'monospace');
        timeT.textContent = '⏱ ' + step.time;
        g.appendChild(timeT);
      }

      // Status chip
      if (isCompleted) {
        _addChip(NS, g, x + NODE_W - 4, y + 6, '✓ done', '#00e5c8', 'rgba(0,229,200,0.12)');
      } else if (isCurrent) {
        _addChip(NS, g, x + NODE_W - 4, y + 6, '▶ current', '#f59e0b', 'rgba(245,158,11,0.12)');
      }

      // ── CLICK → open panel (not list view) ─────────────────
      if (!isLocked) {
        const _step = step; // closure capture
        function handleNodeClick(e) {
          e.preventDefault();
          _openPanel(_step);
        }
        g.addEventListener('click', handleNodeClick);
        g.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') handleNodeClick(e);
        });
      }

      svg.appendChild(g);
    });

    // ── Progress legend ────────────────────────────────────────
    const done  = steps.filter(s => s.completed).length;
    const total = steps.length;
    const pct   = total > 0 ? Math.round(done / total * 100) : 0;

    const legT = document.createElementNS(NS, 'text');
    legT.setAttribute('x', centreX);
    legT.setAttribute('y', totalH - SVG_PAD_BOT + 12);
    legT.setAttribute('text-anchor', 'middle');
    legT.setAttribute('fill', 'rgba(255,255,255,0.22)');
    legT.setAttribute('font-size', '10'); legT.setAttribute('font-family', 'monospace');
    legT.textContent = `${done} / ${total} days completed — ${pct}%`;
    svg.appendChild(legT);

    _svgWrapper.appendChild(svg);

    // Auto-scroll to first incomplete
    const firstInc = nodePositions.find(p => !p.step.completed);
    if (firstInc) setTimeout(() => { _svgWrapper.scrollTop = Math.max(0, firstInc.y - 30); }, 60);
  }

  // ─── SVG HELPERS ────────────────────────────────────────────
  function _makeLinearGrad(NS, id, stops, x1, y1, x2, y2) {
    const g = document.createElementNS(NS, 'linearGradient');
    g.setAttribute('id', id);
    g.setAttribute('x1', x1 + '%'); g.setAttribute('y1', y1 + '%');
    g.setAttribute('x2', x2 + '%'); g.setAttribute('y2', y2 + '%');
    stops.forEach(([offset, color, opacity]) => {
      const s = document.createElementNS(NS, 'stop');
      s.setAttribute('offset', offset);
      s.setAttribute('stop-color', color);
      s.setAttribute('stop-opacity', opacity);
      g.appendChild(s);
    });
    return g;
  }

  function _makeGlowFilter(NS, id, stdDev) {
    const f = document.createElementNS(NS, 'filter');
    f.setAttribute('id', id);
    f.setAttribute('x', '-40%'); f.setAttribute('y', '-40%');
    f.setAttribute('width', '180%'); f.setAttribute('height', '180%');
    const blur = document.createElementNS(NS, 'feGaussianBlur');
    blur.setAttribute('stdDeviation', stdDev); blur.setAttribute('result', 'blur');
    const merge = document.createElementNS(NS, 'feMerge');
    const mn1 = document.createElementNS(NS, 'feMergeNode'); mn1.setAttribute('in', 'blur');
    const mn2 = document.createElementNS(NS, 'feMergeNode'); mn2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mn1); merge.appendChild(mn2);
    f.appendChild(blur); f.appendChild(merge);
    return f;
  }

  function _makeArrow(NS, id, color) {
    const m = document.createElementNS(NS, 'marker');
    m.setAttribute('id', id);
    m.setAttribute('markerWidth', '7'); m.setAttribute('markerHeight', '7');
    m.setAttribute('refX', '5'); m.setAttribute('refY', '3');
    m.setAttribute('orient', 'auto');
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', 'M0,0 L0,6 L7,3 z');
    p.setAttribute('fill', color);
    m.appendChild(p);
    return m;
  }

  function _addChip(NS, parent, xRight, y, label, color, bg) {
    const pad = 5, charW = 5.5;
    const chipW = label.length * charW + pad * 2;
    const chipH = 14, chipX = xRight - chipW - 4;
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', chipX); r.setAttribute('y', y);
    r.setAttribute('width', chipW); r.setAttribute('height', chipH);
    r.setAttribute('rx', '7'); r.setAttribute('fill', bg);
    r.setAttribute('stroke', color); r.setAttribute('stroke-width', '0.8');
    r.setAttribute('opacity', '0.85');
    parent.appendChild(r);
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', chipX + chipW / 2); t.setAttribute('y', y + chipH / 2 + 3.5);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('fill', color); t.setAttribute('font-size', '7.5');
    t.setAttribute('font-family', 'monospace'); t.setAttribute('font-weight', '700');
    t.textContent = label;
    parent.appendChild(t);
  }

  // ─── TOGGLE BUTTON LOGIC ─────────────────────────────────────
  function _enterGraphMode() {
    _graphMode = true;
    if (_toggleBtn) {
      _toggleBtn.textContent = '☰ List View';
      _toggleBtn.style.borderColor = 'rgba(0,229,200,0.45)';
      _toggleBtn.style.color = '#00e5c8';
    }
    const weeksList  = document.getElementById('ai-weeks-list');
    const searchWrap = document.querySelector('#ai-screen-weeks .search-wrap');
    if (weeksList)   weeksList.style.display   = 'none';
    if (searchWrap)  searchWrap.style.display  = 'none';
    if (_svgWrapper) _svgWrapper.style.display = 'block';
    renderAIGraph();
  }

  function _exitGraphMode() {
    _graphMode = false;
    if (_toggleBtn) {
      _toggleBtn.textContent = '⬡ Graph View';
      _toggleBtn.style.borderColor = 'rgba(255,255,255,0.10)';
      _toggleBtn.style.color = 'rgba(255,255,255,0.75)';
    }
    const weeksList  = document.getElementById('ai-weeks-list');
    const searchWrap = document.querySelector('#ai-screen-weeks .search-wrap');
    if (weeksList)   weeksList.style.display   = '';
    if (searchWrap)  searchWrap.style.display  = '';
    if (_svgWrapper) _svgWrapper.style.display = 'none';
  }

  function _toggleView() {
    if (_graphMode) _exitGraphMode(); else _enterGraphMode();
  }

  // ─── INJECT TOGGLE UI ────────────────────────────────────────
  function injectGraphUI() {
    const weeksScreen = document.getElementById('ai-screen-weeks');
    if (!weeksScreen) return;

    if (document.getElementById('aig-svg-wrapper')) {
      _svgWrapper = document.getElementById('aig-svg-wrapper');
      _toggleBtn  = document.getElementById('aig-toggle-btn');
      _exitGraphMode();
      return;
    }

    _toggleBtn = document.createElement('button');
    _toggleBtn.id = 'aig-toggle-btn';
    _toggleBtn.textContent = '⬡ Graph View';
    _toggleBtn.setAttribute('aria-label', 'Switch to graph view');
    _toggleBtn.style.cssText = [
      'display:inline-flex','align-items:center','gap:6px',
      'padding:7px 14px',
      'background:rgba(255,255,255,0.04)',
      'color:rgba(255,255,255,0.75)',
      'font-weight:600','font-size:11px',
      'font-family:var(--font-ui,system-ui)',
      'border-radius:8px','cursor:pointer',
      'border:1px solid rgba(255,255,255,0.10)',
      'margin:0 12px 10px',
      'transition:all 0.18s',
      'touch-action:manipulation',
    ].join(';');
    _toggleBtn.addEventListener('click', _toggleView);

    _svgWrapper = document.createElement('div');
    _svgWrapper.id = 'aig-svg-wrapper';
    _svgWrapper.setAttribute('aria-label', 'AI roadmap graph');
    _svgWrapper.style.cssText = [
      'display:none',
      'overflow:auto',
      '-webkit-overflow-scrolling:touch',
      'touch-action:pan-x pan-y',
      'margin:0 12px 12px',
      'border:1px solid rgba(255,255,255,0.07)',
      'border-radius:14px',
      'background:rgba(255,255,255,0.02)',
      'max-height:68vh',
    ].join(';');

    const sectionDiv = weeksScreen.querySelector('.section');
    if (sectionDiv) {
      weeksScreen.insertBefore(_svgWrapper, sectionDiv);
      weeksScreen.insertBefore(_toggleBtn, _svgWrapper);
    } else {
      weeksScreen.appendChild(_toggleBtn);
      weeksScreen.appendChild(_svgWrapper);
    }

    // Build panel DOM early
    _buildPanelDOM();
  }

  // ─── PUBLIC API ──────────────────────────────────────────────
  window.AIRoadmapGraph = {
    onLevelSelected(levelKey) {
      _levelKey = levelKey;
      window._aiGraphCurrentLevel = levelKey;
      injectGraphUI();
    },
    refresh() {
      if (_graphMode) renderAIGraph();
    },
    reset() {
      _levelKey = null;
      window._aiGraphCurrentLevel = null;
      _exitGraphMode();
      _closePanel();
    },
  };

})();
