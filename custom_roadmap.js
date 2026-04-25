'use strict';
/* ═══════════════════════════════════════════════════════
   ROADMAPX — roadmap.js
   Modular vanilla JS, localStorage persistence
═══════════════════════════════════════════════════════ */

// ── SVG GRADIENT (inject into DOM for Pomodoro ring) ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDefs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svgDefs.innerHTML = `
    <defs>
      <linearGradient id="pomoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00f5d4"/>
        <stop offset="100%" stop-color="#7b2fff"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svgDefs);
  init();
});

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
const STATE = {
  tasks: [],
  currentView: 'day',
  currentDayOffset: 0,   // days from today
  currentWeekOffset: 0,  // weeks from today
  streak: 0,
  lastCompletionDate: null,
  pomodoroTask: null,
  notesTask: null,
  settings: { pomoDuration: 25, shortBreak: 5 },
  calMonth: new Date(),
  calSelectedDate: null,
  globalNotes: [],
  aiGeneratedTasks: [],
  roadmaps: [],            // ── Custom roadmap system
};

// ═══════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════
const LS = {
  save() {
    localStorage.setItem('roadmapx_tasks', JSON.stringify(STATE.tasks));
    localStorage.setItem('roadmapx_streak', STATE.streak);
    localStorage.setItem('roadmapx_lastCompletion', STATE.lastCompletionDate || '');
    localStorage.setItem('roadmapx_settings', JSON.stringify(STATE.settings));
    localStorage.setItem('roadmapx_globalNotes', JSON.stringify(STATE.globalNotes));
    localStorage.setItem('roadmapx_view', STATE.currentView);
    localStorage.setItem('roadmapx_custom_roadmaps', JSON.stringify(STATE.roadmaps));
  },
  load() {
    try {
      STATE.tasks = JSON.parse(localStorage.getItem('roadmapx_tasks') || '[]');
      STATE.streak = parseInt(localStorage.getItem('roadmapx_streak') || '0');
      STATE.lastCompletionDate = localStorage.getItem('roadmapx_lastCompletion') || null;
      STATE.settings = { ...STATE.settings, ...JSON.parse(localStorage.getItem('roadmapx_settings') || '{}') };
      STATE.globalNotes = JSON.parse(localStorage.getItem('roadmapx_globalNotes') || '[]');
      STATE.currentView = localStorage.getItem('roadmapx_view') || 'day';
      STATE.roadmaps = JSON.parse(localStorage.getItem('roadmapx_custom_roadmaps') || '[]');
    } catch (e) {
      console.error('LS.load error', e);
    }
  }
};

// ═══════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function dateKey(date) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function todayKey() { return dateKey(new Date()); }

function offsetDate(baseDate, days) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatDateShort(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getTasksForDate(key) {
  return STATE.tasks.filter(t => t.date === key);
}

function isSameDay(d1, d2) {
  return dateKey(d1) === dateKey(d2);
}

function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ═══════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════
function showToast(msg, icon = '✅', duration = 3000) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-icon">${icon}</span>${escHtml(msg)}`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 280);
  }, duration);
}

// ═══════════════════════════════════════════════════════
// SIDEBAR + NAVIGATION
// ═══════════════════════════════════════════════════════
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function switchPanel(panelName) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const panel = document.getElementById(`panel-${panelName}`);
  if (panel) panel.classList.add('active');
  document.querySelectorAll(`.nav-item[data-panel="${panelName}"]`).forEach(n => n.classList.add('active'));

  if (panelName === 'calendar') renderCalendar();
  if (panelName === 'notes-panel') renderGlobalNotes();
  if (panelName === 'custom-roadmaps') renderRoadmaps();
}

// Wire sidebar nav
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.dataset.panel;
    switchPanel(panel);
  });
});

// ═══════════════════════════════════════════════════════
// VIEW TOGGLE (Day / Week)
// ═══════════════════════════════════════════════════════
function switchView(view) {
  STATE.currentView = view;
  LS.save();

  document.getElementById('btn-day-view').classList.toggle('active', view === 'day');
  document.getElementById('btn-week-view').classList.toggle('active', view === 'week');
  document.getElementById('day-view').classList.toggle('active', view === 'day');
  document.getElementById('week-view').classList.toggle('active', view === 'week');

  if (view === 'day') renderDayView();
  else renderWeekView();
}

// ═══════════════════════════════════════════════════════
// DAY VIEW
// ═══════════════════════════════════════════════════════
function getCurrentDayDate() {
  return offsetDate(new Date(), STATE.currentDayOffset);
}

function navigateDay(delta) {
  STATE.currentDayOffset += delta;
  renderDayView();
}

function goToToday() {
  STATE.currentDayOffset = 0;
  STATE.currentWeekOffset = 0;
  if (STATE.currentView === 'day') renderDayView();
  else renderWeekView();
}

function renderDayView() {
  const date = getCurrentDayDate();
  const key  = dateKey(date);

  // Header date
  const titleEl = document.getElementById('day-view-title');
  const isToday = key === todayKey();
  titleEl.textContent = isToday ? `Today — ${formatDate(date)}` : formatDate(date);
  document.getElementById('header-date-display').textContent = formatDateShort(date);

  const tasks = getTasksForDate(key);
  const container = document.getElementById('day-task-list');
  const emptyEl   = document.getElementById('day-empty');

  if (tasks.length === 0) {
    container.innerHTML = '';
    emptyEl.style.display = 'flex';
  } else {
    emptyEl.style.display = 'none';
    container.innerHTML = tasks.map((t, i) => renderTaskCard(t, i)).join('');
    attachTaskCardListeners();
  }

  updateProgress();
}

function renderTaskCard(task, index = 0) {
  const priorityClass = `priority-${task.priority || 'medium'}`;
  const statusClass   = `status-${(task.status || 'not-started').replace(/\s+/g,'-')}`;
  const tags = (task.tags || []).map(tag => `<span class="task-tag tag-${escHtml(tag)}">${escHtml(tag)}</span>`).join('');
  const statusLabel = task.status === 'done' ? '✓ Done' : task.status === 'in-progress' ? '⚡ In Progress' : '○ Not Started';
  const statusCls   = task.status === 'done' ? 'done' : task.status === 'in-progress' ? 'in-progress' : 'not-started';
  const revBadge    = task.isRevision ? `<span class="revision-badge">🔁 Revision</span>` : '';
  const hasNotes    = task.notes && task.notes.trim();

  return `
    <div class="task-card ${priorityClass} ${statusClass}${task.isRevision ? ' is-revision' : ''}"
         id="card-${task.id}" style="animation-delay:${index * 0.05}s">
      <div class="task-card-inner">
        <div class="task-card-top">
          <div class="task-left">
            <div class="task-title-row">
              <span class="task-title">${escHtml(task.title)}</span>
              ${revBadge}
            </div>
            ${task.description ? `<div class="task-desc">${escHtml(task.description)}</div>` : ''}
          </div>
          <div class="task-right">
            <button class="status-pill ${statusCls}" onclick="cycleStatus('${task.id}')" title="Click to change status">
              ${statusLabel}
            </button>
          </div>
        </div>
        ${tags ? `<div class="task-tags">${tags}</div>` : ''}
      </div>
      <div class="task-actions">
        <button class="task-action-btn btn-pomo" onclick="openPomodoro('${task.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Pomodoro
        </button>
        <button class="task-action-btn" onclick="scheduleRevision('${task.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          Revision
        </button>
        <button class="task-action-btn" onclick="openNotes('${task.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Notes${hasNotes ? ' •' : ''}
        </button>
        <button class="task-action-btn" onclick="openEditTask('${task.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </button>
        <button class="task-action-btn" onclick="deleteTask('${task.id}')" style="margin-left:auto;color:var(--c3)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
        ${task.status !== 'done' ? `
        <button class="task-action-btn btn-complete" onclick="markComplete('${task.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Complete
        </button>` : ''}
      </div>
      ${hasNotes ? `
      <div class="task-notes-inline" id="notes-inline-${task.id}">
        <div class="task-notes-text">${escHtml(task.notes)}</div>
      </div>` : ''}
    </div>`;
}

function attachTaskCardListeners() {
  // Drag and Drop — from day view cards
  document.querySelectorAll('.task-card').forEach(card => {
    card.setAttribute('draggable', true);
    card.addEventListener('dragstart', e => {
      const id = card.id.replace('card-', '');
      e.dataTransfer.setData('taskId', id);
      card.style.opacity = '0.5';
    });
    card.addEventListener('dragend', () => { card.style.opacity = ''; });
  });
}

// ═══════════════════════════════════════════════════════
// WEEK VIEW
// ═══════════════════════════════════════════════════════
function getWeekStart() {
  const base = offsetDate(new Date(), STATE.currentWeekOffset * 7);
  return getMondayOfWeek(base);
}

function navigateWeek(delta) {
  STATE.currentWeekOffset += delta;
  renderWeekView();
}

function renderWeekView() {
  const weekStart = getWeekStart();
  const weekEnd   = offsetDate(weekStart, 6);
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = todayKey();

  document.getElementById('week-range-label').textContent =
    `${formatDateShort(weekStart)} — ${formatDateShort(weekEnd)}`;

  const grid = document.getElementById('week-grid');
  grid.innerHTML = days.map((dayName, i) => {
    const date   = offsetDate(weekStart, i);
    const key    = dateKey(date);
    const tasks  = getTasksForDate(key);
    const isToday = key === today;

    const miniCards = tasks.map(t => renderMiniTask(t)).join('');

    return `
      <div class="week-col${isToday ? ' is-today' : ''}" id="wkcol-${key}"
           ondragover="weekColDragOver(event, '${key}')"
           ondragleave="weekColDragLeave(event, '${key}')"
           ondrop="weekColDrop(event, '${key}')">
        <div class="week-col-header">
          <div class="week-col-day">${dayName}</div>
          <div class="week-col-date">${date.getDate()}</div>
        </div>
        <div class="week-col-tasks" id="wcol-tasks-${key}">
          ${miniCards || ''}
        </div>
        <div class="week-col-add">
          <button class="week-col-add-btn" onclick="openAddTaskForDate('${key}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add
          </button>
        </div>
      </div>`;
  }).join('');

  // Wire drag from mini tasks
  document.querySelectorAll('.mini-task').forEach(card => {
    card.setAttribute('draggable', true);
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('taskId', card.dataset.id);
      card.style.opacity = '0.4';
    });
    card.addEventListener('dragend', () => { card.style.opacity = ''; });
    card.addEventListener('click', () => {
      const task = STATE.tasks.find(t => t.id === card.dataset.id);
      if (task) {
        STATE.currentDayOffset = Math.round((new Date(task.date) - new Date(todayKey())) / 86400000);
        switchView('day');
      }
    });
  });
}

function renderMiniTask(task) {
  const tags = (task.tags || []).slice(0,2).map(tag =>
    `<span class="mini-task-tag tag-${escHtml(tag)}">${escHtml(tag)}</span>`
  ).join('');
  return `
    <div class="mini-task priority-${task.priority || 'medium'} status-${(task.status||'not-started').replace(/\s+/g,'-')}"
         data-id="${task.id}">
      <div class="mini-task-title">${escHtml(task.title)}</div>
      ${tags ? `<div class="mini-task-tags">${tags}</div>` : ''}
    </div>`;
}

// Drag & Drop for week columns
function weekColDragOver(e, key) {
  e.preventDefault();
  document.getElementById(`wkcol-${key}`)?.classList.add('drag-over');
}
function weekColDragLeave(e, key) {
  document.getElementById(`wkcol-${key}`)?.classList.remove('drag-over');
}
function weekColDrop(e, key) {
  e.preventDefault();
  document.getElementById(`wkcol-${key}`)?.classList.remove('drag-over');
  const taskId = e.dataTransfer.getData('taskId');
  const task   = STATE.tasks.find(t => t.id === taskId);
  if (task && task.date !== key) {
    task.date = key;
    LS.save();
    renderWeekView();
    if (STATE.currentView === 'day') renderDayView();
    showToast(`Task moved to ${formatDateShort(new Date(key + 'T00:00:00'))}`, '📅');
  }
}

// ═══════════════════════════════════════════════════════
// TASK CRUD
// ═══════════════════════════════════════════════════════
let _editingTaskId = null;

function openAddTask() {
  _editingTaskId = null;
  document.getElementById('add-task-modal-title').textContent = 'Add Task';
  document.getElementById('task-edit-id').value = '';
  document.getElementById('task-title-input').value = '';
  document.getElementById('task-desc-input').value = '';
  document.getElementById('task-date-input').value = dateKey(getCurrentDayDate());
  document.getElementById('task-priority-input').value = 'medium';
  // Clear tags
  document.querySelectorAll('#tag-selector .tag-opt').forEach(b => b.classList.remove('selected'));
  openModal('modal-add-task');
  setTimeout(() => document.getElementById('task-title-input').focus(), 100);
}

function openAddTaskForDate(key) {
  openAddTask();
  document.getElementById('task-date-input').value = key;
}

function openEditTask(taskId) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task) return;
  _editingTaskId = taskId;
  document.getElementById('add-task-modal-title').textContent = 'Edit Task';
  document.getElementById('task-edit-id').value = taskId;
  document.getElementById('task-title-input').value = task.title || '';
  document.getElementById('task-desc-input').value = task.description || '';
  document.getElementById('task-date-input').value = task.date || '';
  document.getElementById('task-priority-input').value = task.priority || 'medium';
  document.querySelectorAll('#tag-selector .tag-opt').forEach(b => {
    b.classList.toggle('selected', (task.tags || []).includes(b.dataset.tag));
  });
  openModal('modal-add-task');
}

function saveTask() {
  const title    = document.getElementById('task-title-input').value.trim();
  const desc     = document.getElementById('task-desc-input').value.trim();
  const date     = document.getElementById('task-date-input').value;
  const priority = document.getElementById('task-priority-input').value;
  const tags     = [...document.querySelectorAll('#tag-selector .tag-opt.selected')].map(b => b.dataset.tag);

  if (!title) { showToast('Task title is required!', '⚠️'); return; }
  if (!date)  { showToast('Please pick a date.', '⚠️'); return; }

  if (_editingTaskId) {
    const task = STATE.tasks.find(t => t.id === _editingTaskId);
    if (task) {
      task.title = title; task.description = desc;
      task.date = date; task.priority = priority; task.tags = tags;
    }
    showToast('Task updated!', '✏️');
  } else {
    const task = { id: uid(), title, description: desc, date, priority, tags, status: 'not-started', notes: '', isRevision: false, pomodoroCount: 0, createdAt: Date.now() };
    STATE.tasks.push(task);
    showToast('Task added!', '✅');
  }

  LS.save();
  closeModal('modal-add-task');
  renderCurrentView();
}

function deleteTask(taskId) {
  STATE.tasks = STATE.tasks.filter(t => t.id !== taskId);
  LS.save();
  renderCurrentView();
  showToast('Task deleted.', '🗑️');
}

function cycleStatus(taskId) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task) return;
  const cycle = ['not-started', 'in-progress', 'done'];
  const idx   = cycle.indexOf(task.status || 'not-started');
  task.status = cycle[(idx + 1) % cycle.length];
  if (task.status === 'done') completeTask(taskId, false);
  else {
    LS.save();
    renderCurrentView();
  }
}

function markComplete(taskId) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task || task.status === 'done') return;
  task.status = 'done';
  completeTask(taskId, true);
}

function completeTask(taskId, withRevision = true) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.status = 'done';
  task.completedAt = Date.now();

  // Update streak
  const today = todayKey();
  if (STATE.lastCompletionDate !== today) {
    const yesterday = dateKey(offsetDate(new Date(), -1));
    STATE.streak = STATE.lastCompletionDate === yesterday ? STATE.streak + 1 : 1;
    STATE.lastCompletionDate = today;
    updateStreakDisplay();
  }

  // Auto-schedule revision for next day (if not already a revision)
  if (withRevision && !task.isRevision) {
    const revDate  = dateKey(offsetDate(new Date(task.date + 'T00:00:00'), 1));
    const existing = STATE.tasks.find(t => t.originalId === task.id && t.isRevision);
    if (!existing) {
      STATE.tasks.push({
        id: uid(), title: task.title, description: task.description,
        date: revDate, priority: task.priority, tags: task.tags,
        status: 'not-started', notes: '', isRevision: true,
        originalId: task.id, pomodoroCount: 0, createdAt: Date.now()
      });
      showToast(`Revision scheduled for ${formatDateShort(new Date(revDate + 'T00:00:00'))}`, '🔁');
    }
  }

  LS.save();
  renderCurrentView();
  updateProgress();
  if (!withRevision) showToast('Status updated!', '⚡');
  else showToast('Task completed! 🎉', '🔥');
}

function scheduleRevision(taskId) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task) return;
  const revDate  = dateKey(offsetDate(new Date(task.date + 'T00:00:00'), 1));
  const existing = STATE.tasks.find(t => t.originalId === task.id && t.isRevision);
  if (existing) { showToast('Revision already scheduled!', '📅'); return; }
  STATE.tasks.push({
    id: uid(), title: task.title, description: task.description,
    date: revDate, priority: task.priority, tags: task.tags,
    status: 'not-started', notes: '', isRevision: true,
    originalId: task.id, pomodoroCount: 0, createdAt: Date.now()
  });
  LS.save();
  showToast(`Revision scheduled for tomorrow!`, '🔁');
}

function toggleTag(btn) {
  btn.classList.toggle('selected');
}

// ═══════════════════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════════════════
function updateProgress() {
  const key   = dateKey(getCurrentDayDate());
  const tasks = getTasksForDate(key);
  const done  = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('progress-label').textContent = `${done} / ${total} tasks`;
  document.getElementById('progress-pct').textContent   = `${pct}%`;
  document.getElementById('progress-fill').style.width  = `${pct}%`;
}

function updateStreakDisplay() {
  document.getElementById('sidebar-streak').textContent = STATE.streak;
}

// ═══════════════════════════════════════════════════════
// POMODORO
// ═══════════════════════════════════════════════════════
const POMO = {
  interval: null,
  totalSeconds: 0,
  remainingSeconds: 0,
  isRunning: false,
  session: 1,   // 1-4
  phase: 'focus', // focus | break
};
const RING_CIRCUMFERENCE = 2 * Math.PI * 88; // r=88

function openPomodoro(taskId) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task) return;
  STATE.pomodoroTask = task;
  resetPomodoro(true);
  document.getElementById('pomo-task-name').textContent = task.title;
  openModal('modal-pomodoro');
}

function resetPomodoro(silent = false) {
  clearInterval(POMO.interval);
  POMO.isRunning = false;
  POMO.phase = 'focus';
  POMO.totalSeconds = (parseInt(STATE.settings.pomoDuration) || 25) * 60;
  POMO.remainingSeconds = POMO.totalSeconds;
  if (!silent) POMO.session = 1;
  updatePomoDisplay();
  updatePomoIcon(false);
}

function togglePomodoro() {
  if (POMO.isRunning) {
    clearInterval(POMO.interval);
    POMO.isRunning = false;
    updatePomoIcon(false);
  } else {
    POMO.isRunning = true;
    POMO.interval  = setInterval(tickPomodoro, 1000);
    updatePomoIcon(true);
  }
}

function tickPomodoro() {
  if (POMO.remainingSeconds <= 0) {
    clearInterval(POMO.interval);
    POMO.isRunning = false;
    pomodoroPhaseEnd();
    return;
  }
  POMO.remainingSeconds--;
  updatePomoDisplay();
}

function pomodoroPhaseEnd() {
  if (POMO.phase === 'focus') {
    // Increment pomodoro count on task
    if (STATE.pomodoroTask) {
      const task = STATE.tasks.find(t => t.id === STATE.pomodoroTask.id);
      if (task) { task.pomodoroCount = (task.pomodoroCount || 0) + 1; LS.save(); }
    }
    showToast('Focus session complete! Take a break.', '⏱️', 4000);
    POMO.phase = 'break';
    POMO.totalSeconds = (parseInt(STATE.settings.shortBreak) || 5) * 60;
    POMO.remainingSeconds = POMO.totalSeconds;
    // Mark dot
    const dots = document.querySelectorAll('.pomo-dot');
    if (dots[POMO.session - 1]) dots[POMO.session - 1].classList.add('active');
    if (POMO.session < 4) POMO.session++;
  } else {
    showToast('Break over! Ready for next session?', '🔥', 3000);
    POMO.phase = 'focus';
    POMO.totalSeconds = (parseInt(STATE.settings.pomoDuration) || 25) * 60;
    POMO.remainingSeconds = POMO.totalSeconds;
  }
  document.getElementById('pomo-session-num').textContent = POMO.session;
  updatePomoDisplay();
  updatePomoIcon(false);
}

function skipPomodoro() { pomodoroPhaseEnd(); }

function updatePomoDisplay() {
  const mins = String(Math.floor(POMO.remainingSeconds / 60)).padStart(2, '0');
  const secs = String(POMO.remainingSeconds % 60).padStart(2, '0');
  document.getElementById('pomo-display').textContent = `${mins}:${secs}`;
  document.getElementById('pomo-status-text').textContent = POMO.phase === 'focus' ? 'Focus' : 'Break';

  const ratio   = POMO.remainingSeconds / POMO.totalSeconds;
  const offset  = RING_CIRCUMFERENCE * (1 - ratio);
  const ringEl  = document.getElementById('pomo-ring-fill');
  if (ringEl) {
    ringEl.style.strokeDasharray  = RING_CIRCUMFERENCE;
    ringEl.style.strokeDashoffset = offset;
    ringEl.setAttribute('stroke', POMO.phase === 'focus' ? 'url(#pomoGrad)' : 'var(--c4)');
  }

  const pct = (1 - ratio) * 100;
  const progFill = document.getElementById('pomo-progress-fill');
  if (progFill) progFill.style.width = `${pct}%`;

  // Update tab title when running
  if (POMO.isRunning) {
    document.title = `${mins}:${secs} — ${POMO.phase === 'focus' ? '🔴 Focus' : '🟢 Break'}`;
  }
}

function updatePomoIcon(running) {
  const icon = document.getElementById('pomo-icon');
  if (!icon) return;
  if (running) {
    icon.innerHTML = '<line x1="6" y1="4" x2="6" y2="20"/><line x1="18" y1="4" x2="18" y2="20"/>';
  } else {
    icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  }
}

// ═══════════════════════════════════════════════════════
// NOTES
// ═══════════════════════════════════════════════════════
function openNotes(taskId) {
  const task = STATE.tasks.find(t => t.id === taskId);
  if (!task) return;
  STATE.notesTask = task;
  document.getElementById('notes-task-title').textContent = task.title;
  document.getElementById('notes-editor').value = task.notes || '';
  openModal('modal-notes');
  setTimeout(() => document.getElementById('notes-editor').focus(), 100);
}

function saveNotes() {
  if (!STATE.notesTask) return;
  const task = STATE.tasks.find(t => t.id === STATE.notesTask.id);
  if (task) {
    task.notes = document.getElementById('notes-editor').value;
    LS.save();
    renderCurrentView();
    showToast('Notes saved!', '📝');
  }
  closeModal('modal-notes');
}

// Global notes (Notes panel)
function addGlobalNote() {
  STATE.globalNotes.push({ id: uid(), title: 'New Note', body: '', createdAt: Date.now() });
  LS.save();
  renderGlobalNotes();
}

function renderGlobalNotes() {
  const container = document.getElementById('global-notes-grid');
  if (STATE.globalNotes.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="empty-title">No notes yet</div></div>`;
    return;
  }
  container.innerHTML = STATE.globalNotes.map((note, i) => `
    <div class="note-card" style="animation-delay:${i*0.05}s" onclick="openGlobalNoteEditor('${note.id}')">
      <div class="note-card-title">${escHtml(note.title)}</div>
      <div class="note-card-body">${escHtml(note.body || 'Empty note...')}</div>
    </div>`).join('');
}

function openGlobalNoteEditor(noteId) {
  const note = STATE.globalNotes.find(n => n.id === noteId);
  if (!note) return;
  const title = prompt('Note title:', note.title);
  if (title !== null) note.title = title;
  const body = prompt('Note content:', note.body);
  if (body !== null) note.body = body;
  LS.save();
  renderGlobalNotes();
}

// ═══════════════════════════════════════════════════════
// CALENDAR
// ═══════════════════════════════════════════════════════
function calNavigate(delta) {
  STATE.calMonth = new Date(STATE.calMonth.getFullYear(), STATE.calMonth.getMonth() + delta, 1);
  renderCalendar();
}

function renderCalendar() {
  const y   = STATE.calMonth.getFullYear();
  const m   = STATE.calMonth.getMonth();
  const today = new Date();

  document.getElementById('cal-month-label').textContent =
    STATE.calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const firstDay = new Date(y, m, 1);
  const lastDay  = new Date(y, m + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Mon=0

  let html = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    .map(d => `<div class="cal-day-name">${d}</div>`).join('');

  // Blank cells before month start
  for (let i = 0; i < startDow; i++) {
    html += `<div class="cal-day other-month"></div>`;
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date   = new Date(y, m, day);
    const key    = dateKey(date);
    const tasks  = getTasksForDate(key);
    const isToday = isSameDay(date, today);
    const hasTasks    = tasks.some(t => !t.isRevision);
    const hasRevision = tasks.some(t => t.isRevision);

    html += `<div class="cal-day${isToday ? ' today' : ''}${hasTasks ? ' has-tasks' : ''}${hasRevision && !hasTasks ? ' has-revision' : ''}"
      onclick="calSelectDay('${key}')">${day}</div>`;
  }

  document.getElementById('calendar-grid').innerHTML = html;

  // Re-render selected day detail
  if (STATE.calSelectedDate) calSelectDay(STATE.calSelectedDate);
}

function calSelectDay(key) {
  STATE.calSelectedDate = key;
  const tasks   = getTasksForDate(key);
  const detailEl = document.getElementById('cal-day-detail');
  const titleEl  = document.getElementById('cal-detail-title');

  titleEl.textContent = formatDate(new Date(key + 'T00:00:00'));

  const tasksHtml = tasks.length === 0
    ? '<div style="font-size:13px;color:var(--t2)">No tasks or revisions this day.</div>'
    : tasks.map(t => `
        <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:11px;padding:2px 7px;border-radius:99px;background:${t.status==='done'?'rgba(0,230,118,0.1)':'rgba(120,120,168,0.1)'};color:${t.status==='done'?'var(--c5)':'var(--t2)'};">${t.status==='done'?'✓':t.isRevision?'🔁':'○'}</span>
          <span style="font-size:13px;font-weight:600;flex:1">${escHtml(t.title)}</span>
          ${t.isRevision ? '<span class="revision-badge">Revision</span>' : ''}
        </div>`).join('');

  document.getElementById('cal-detail-tasks').innerHTML = tasksHtml;
  detailEl.style.display = 'block';
}

// ═══════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════
function saveSetting(key, value) {
  STATE.settings[key] = key === 'pomoDuration' || key === 'shortBreak' ? parseInt(value) : value;
  LS.save();
  showToast('Setting saved.', '⚙️');
}

function confirmReset() {
  if (confirm('Reset ALL data? This cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
}

// ═══════════════════════════════════════════════════════
// AI ROADMAP GENERATOR
// ═══════════════════════════════════════════════════════
function openAIModal() {
  resetAIGenerator();
  // Set start date to today
  document.getElementById('ai-start-date').value = todayKey();
  openModal('modal-ai');
}

function resetAIGenerator() {
  document.getElementById('ai-generator-area').style.display = 'block';
  document.getElementById('ai-loading').style.display       = 'none';
  document.getElementById('ai-preview').style.display       = 'none';
  STATE.aiGeneratedTasks = [];
}

// AI roadmap templates (client-side, no API needed)
const AI_TEMPLATES = {
  dsa: [
    { title: 'Arrays & Strings — Basics', desc: 'Two-pointer technique, sliding window, prefix sums', tags: ['DSA'] },
    { title: 'Hashing & Hash Maps', desc: 'Frequency counters, anagram problems, two-sum variations', tags: ['DSA'] },
    { title: 'Recursion & Backtracking', desc: 'Permutations, combinations, N-Queens, Sudoku', tags: ['DSA'] },
    { title: 'Linked Lists', desc: 'Reversal, cycle detection, merge operations', tags: ['DSA'] },
    { title: 'Stacks & Queues', desc: 'Monotonic stack, priority queue, sliding window max', tags: ['DSA'] },
    { title: 'Binary Search', desc: 'Classic binary search, search in rotated array, matrix search', tags: ['DSA'] },
    { title: 'Binary Trees — Traversals', desc: 'DFS (inorder, preorder, postorder), BFS, level order', tags: ['DSA'] },
    { title: 'Binary Search Trees', desc: 'Validation, LCA, inorder successor, range queries', tags: ['DSA'] },
    { title: 'Graphs — BFS & DFS', desc: 'Number of islands, connected components, flood fill', tags: ['DSA'] },
    { title: 'Dynamic Programming — 1D', desc: 'Fibonacci variants, climbing stairs, house robber', tags: ['DSA'] },
    { title: 'Dynamic Programming — 2D', desc: 'Grid DP, unique paths, matrix chain multiplication', tags: ['DSA'] },
    { title: 'Greedy Algorithms', desc: 'Interval scheduling, activity selection, fractional knapsack', tags: ['DSA'] },
    { title: 'Tries & String Algorithms', desc: 'Trie insert/search, KMP, Rabin-Karp', tags: ['DSA'] },
    { title: 'Heaps & Priority Queues', desc: 'Top K elements, merge K sorted lists, median finder', tags: ['DSA'] },
    { title: 'Mock Interview — Easy', desc: '5 LeetCode easy problems, timed 60 min', tags: ['DSA', 'Review'] },
    { title: 'Mock Interview — Medium', desc: '3 LeetCode medium problems, timed 60 min', tags: ['DSA', 'Review'] },
  ],
  web: [
    { title: 'HTML5 Semantics & Accessibility', desc: 'Semantic tags, ARIA roles, form validation', tags: ['Web'] },
    { title: 'CSS Flexbox & Grid', desc: 'Layout patterns, responsive design, CSS variables', tags: ['Web'] },
    { title: 'JavaScript Fundamentals', desc: 'ES6+, closures, promises, async/await', tags: ['Web'] },
    { title: 'DOM Manipulation', desc: 'Event listeners, dynamic rendering, performance', tags: ['Web'] },
    { title: 'React — Core Concepts', desc: 'Components, props, state, hooks (useState, useEffect)', tags: ['Web'] },
    { title: 'React — Advanced Patterns', desc: 'Context, useReducer, custom hooks, memoization', tags: ['Web'] },
    { title: 'Node.js & Express', desc: 'REST APIs, middleware, routing, error handling', tags: ['Web'] },
    { title: 'Databases — SQL & NoSQL', desc: 'PostgreSQL basics, MongoDB, indexing, aggregation', tags: ['Web'] },
    { title: 'Authentication & Security', desc: 'JWT, OAuth2, bcrypt, CORS, rate limiting', tags: ['Web'] },
    { title: 'Deployment & DevOps', desc: 'Docker basics, CI/CD, environment config, Vercel/Railway', tags: ['Web'] },
  ],
  ai: [
    { title: 'Python for ML — NumPy & Pandas', desc: 'Array operations, dataframes, vectorization', tags: ['AI', 'Math'] },
    { title: 'Statistics & Probability', desc: 'Distributions, Bayes theorem, MLE, hypothesis testing', tags: ['AI', 'Math'] },
    { title: 'Linear Algebra for ML', desc: 'Matrices, eigenvalues, SVD, PCA intuition', tags: ['AI', 'Math'] },
    { title: 'Supervised Learning', desc: 'Linear regression, logistic regression, decision trees', tags: ['AI'] },
    { title: 'Neural Networks — Basics', desc: 'Perceptron, backpropagation, activation functions', tags: ['AI'] },
    { title: 'CNNs & Computer Vision', desc: 'Convolutions, pooling, transfer learning, ResNet', tags: ['AI'] },
    { title: 'NLP & Transformers', desc: 'Tokenization, attention, BERT, GPT architecture', tags: ['AI'] },
    { title: 'Reinforcement Learning', desc: 'MDPs, Q-learning, policy gradients', tags: ['AI'] },
    { title: 'MLOps & Deployment', desc: 'FastAPI, model serving, monitoring, Docker', tags: ['AI', 'System'] },
    { title: 'Capstone Project', desc: 'End-to-end ML project with dataset to deployment', tags: ['AI', 'Project'] },
  ],
};

function pickTemplate(goal) {
  const g = goal.toLowerCase();
  if (g.includes('dsa') || g.includes('algorithm') || g.includes('data struct')) return AI_TEMPLATES.dsa;
  if (g.includes('web') || g.includes('frontend') || g.includes('react') || g.includes('node') || g.includes('fullstack')) return AI_TEMPLATES.web;
  if (g.includes('ai') || g.includes('ml') || g.includes('machine') || g.includes('deep') || g.includes('neural')) return AI_TEMPLATES.ai;
  // Default: mix
  return [...AI_TEMPLATES.dsa.slice(0,6), ...AI_TEMPLATES.web.slice(0,4), ...AI_TEMPLATES.ai.slice(0,4)];
}

async function generateAIRoadmap() {
  const goal     = document.getElementById('ai-goal-input').value.trim();
  const startStr = document.getElementById('ai-start-date').value;
  const duration = parseInt(document.getElementById('ai-duration').value) || 30;

  if (!goal)     { showToast('Please enter your learning goal.', '⚠️'); return; }
  if (!startStr) { showToast('Please pick a start date.', '⚠️'); return; }

  const selectedTags = [...document.querySelectorAll('#ai-tag-selector .tag-opt.selected')].map(b => b.dataset.tag);

  document.getElementById('ai-generator-area').style.display = 'none';
  document.getElementById('ai-loading').style.display        = 'flex';

  // Simulate AI generation with loading states
  const loadingSteps = ['Analyzing your goal...', 'Building curriculum...', 'Scheduling tasks...', 'Optimizing sequence...'];
  for (let i = 0; i < loadingSteps.length; i++) {
    document.getElementById('ai-loading-sub').textContent = loadingSteps[i];
    await sleep(600);
  }

  const template  = pickTemplate(goal);
  const startDate = new Date(startStr + 'T00:00:00');
  const interval  = Math.floor(duration / template.length);
  const tasks     = [];

  template.forEach((item, i) => {
    const taskDate = offsetDate(startDate, i * interval);
    const tags     = selectedTags.length > 0
      ? [...new Set([...item.tags, ...selectedTags])]
      : item.tags;
    tasks.push({
      id: uid(), title: item.title, description: item.desc,
      date: dateKey(taskDate), priority: i < 3 ? 'high' : i < 8 ? 'medium' : 'low',
      tags, status: 'not-started', notes: '', isRevision: false,
      pomodoroCount: 0, createdAt: Date.now(),
    });
  });

  STATE.aiGeneratedTasks = tasks;
  document.getElementById('ai-loading').style.display = 'none';

  // Show preview
  document.getElementById('ai-preview').style.display = 'block';
  document.getElementById('ai-preview-title').textContent = `"${goal}"`;
  document.getElementById('ai-preview-count').textContent = `${tasks.length} tasks over ${duration} days`;

  const list = document.getElementById('ai-preview-list');
  list.innerHTML = tasks.map((t, i) => `
    <div class="ai-preview-item" style="animation-delay:${i*0.04}s">
      <div class="ai-preview-day">${formatDateShort(new Date(t.date + 'T00:00:00'))}</div>
      <div class="ai-preview-text">${escHtml(t.title)}</div>
      <div class="ai-preview-tags">${t.tags.slice(0,2).map(tag => `<span class="task-tag tag-${escHtml(tag)}">${escHtml(tag)}</span>`).join('')}</div>
    </div>`).join('');
}

function applyAIRoadmap() {
  if (STATE.aiGeneratedTasks.length === 0) return;
  STATE.tasks.push(...STATE.aiGeneratedTasks);
  STATE.aiGeneratedTasks = [];
  LS.save();
  closeModal('modal-ai');
  renderCurrentView();
  showToast(`${STATE.tasks.filter(t=>!t.isRevision).length} tasks added to your roadmap!`, '🚀', 4000);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══════════════════════════════════════════════════════
// MODAL HELPERS
// ═══════════════════════════════════════════════════════
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  // Stop pomodoro if closing that modal
  if (id === 'modal-pomodoro') {
    clearInterval(POMO.interval);
    POMO.isRunning = false;
    document.title = 'RoadmapX — My Roadmap';
  }
}
function closeModalOnBackdrop(e, id) {
  if (e.target.classList.contains('modal-overlay')) closeModal(id);
}

// ESC closes modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

// ═══════════════════════════════════════════════════════
// RENDER HELPERS
// ═══════════════════════════════════════════════════════
function renderCurrentView() {
  if (STATE.currentView === 'day') renderDayView();
  else renderWeekView();
  updateProgress();
  updateStreakDisplay();
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
function init() {
  LS.load();

  // Apply saved settings
  document.getElementById('setting-pomodoro').value    = STATE.settings.pomoDuration || 25;
  document.getElementById('setting-short-break').value = STATE.settings.shortBreak || 5;

  // Set header date
  document.getElementById('header-date-display').textContent = formatDateShort(new Date());

  // Apply saved view
  switchView(STATE.currentView);
  updateStreakDisplay();

  // Initialize panel
  switchPanel('roadmap');
}

// ═══════════════════════════════════════════════════════
// CUSTOM ROADMAP SYSTEM
// ═══════════════════════════════════════════════════════

// ── ACTIVE ROADMAP POINTER ────────────────────────────
let CR_ACTIVE_ID = null;

function getActiveRoadmap() {
  return STATE.roadmaps.find(r => r.id === CR_ACTIVE_ID) || null;
}

// ── PROGRESS HELPER ───────────────────────────────────
function crGetProgress(roadmap) {
  let total = 0, done = 0;
  (roadmap.weeks || []).forEach(w => {
    (w.steps || []).forEach(s => { total++; if (s.completed) done++; });
  });
  return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

// ── RENDER LIST VIEW ──────────────────────────────────
function renderRoadmaps() {
  const grid    = document.getElementById('cr-grid');
  const emptyEl = document.getElementById('cr-empty');
  const badge   = document.getElementById('nav-custom-roadmaps-count');
  if (!grid) return;
  if (badge) badge.textContent = STATE.roadmaps.length;

  if (STATE.roadmaps.length === 0) {
    grid.innerHTML = '';
    emptyEl.style.display = 'flex';
    return;
  }
  emptyEl.style.display = 'none';
  grid.innerHTML = STATE.roadmaps.map((r, i) => {
    const { total, done, pct } = crGetProgress(r);
    const weekCount = (r.weeks || []).length;
    return `
      <div class="cr-card" onclick="openRoadmapDetail('${r.id}')" style="animation-delay:${i * 0.05}s">
        <div class="cr-card-title">${escHtml(r.title)}</div>
        <div class="cr-card-desc">${escHtml(r.description || 'No description')}</div>
        <div class="cr-card-meta">
          <span class="cr-card-stat">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${weekCount} week${weekCount !== 1 ? 's' : ''}
          </span>
          <span class="cr-card-stat">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${done}/${total} steps
          </span>
        </div>
        <div class="cr-card-progress-track">
          <div class="cr-card-progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="cr-card-pct">${pct}% complete</span>
      </div>`;
  }).join('');
}

// ── OPEN / CLOSE DETAIL ───────────────────────────────
function openRoadmapDetail(id) {
  CR_ACTIVE_ID = id;
  document.getElementById('cr-list-view').style.display   = 'none';
  document.getElementById('cr-detail-view').style.display = 'block';
  renderRoadmapDetail();
}

function closeRoadmapDetail() {
  CR_ACTIVE_ID = null;
  document.getElementById('cr-list-view').style.display   = '';
  document.getElementById('cr-detail-view').style.display = 'none';
  renderRoadmaps();
}

// ── RENDER DETAIL VIEW ────────────────────────────────
function renderRoadmapDetail() {
  const roadmap = getActiveRoadmap();
  if (!roadmap) { closeRoadmapDetail(); return; }

  document.getElementById('cr-detail-title').textContent = roadmap.title;
  document.getElementById('cr-detail-desc').textContent  = roadmap.description || '';

  const { total, done, pct } = crGetProgress(roadmap);
  document.getElementById('cr-progress-label').textContent = `${done} / ${total} step${total !== 1 ? 's' : ''}`;
  document.getElementById('cr-progress-pct').textContent   = `${pct}%`;
  document.getElementById('cr-progress-fill').style.width  = `${pct}%`;

  const weeksContainer = document.getElementById('cr-weeks');
  const weeksEmpty     = document.getElementById('cr-weeks-empty');
  const weeks = roadmap.weeks || [];

  if (weeks.length === 0) {
    weeksContainer.innerHTML = '';
    weeksEmpty.style.display = 'flex';
    return;
  }
  weeksEmpty.style.display = 'none';
  weeksContainer.innerHTML = weeks.map((week, wi) => renderWeekBlock(roadmap.id, week, wi)).join('');
}

function renderWeekBlock(roadmapId, week, weekIndex) {
  const steps     = week.steps || [];
  const doneCount = steps.filter(s => s.completed).length;
  const allDone   = steps.length > 0 && doneCount === steps.length;
  const stepRows  = steps.map(step => renderStepRow(roadmapId, week.id, step)).join('');

  return `
    <div class="cr-week-block" id="week-block-${week.id}">
      <div class="cr-week-header" onclick="toggleWeekOpen('${week.id}')">
        <svg class="cr-week-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        <div class="cr-week-title">${escHtml(week.title)}</div>
        <span class="cr-week-step-count">${steps.length} step${steps.length !== 1 ? 's' : ''}</span>
        ${allDone
          ? `<span class="cr-week-done-badge">✓ Complete</span>`
          : doneCount > 0
            ? `<span class="cr-week-step-count" style="color:var(--c1)">${doneCount}/${steps.length} done</span>`
            : ''}
        <div class="cr-week-actions" onclick="event.stopPropagation()">
          <button class="cr-icon-btn" title="Edit week" onclick="openEditWeekModal('${roadmapId}','${week.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="cr-icon-btn danger" title="Delete week" onclick="deleteWeek('${roadmapId}','${week.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
      </div>
      <div class="cr-week-body">
        ${stepRows}
        <button class="cr-add-step-btn" onclick="openAddStepModal('${roadmapId}','${week.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Step
        </button>
      </div>
    </div>`;
}

function renderStepRow(roadmapId, weekId, step) {
  const completedDate = step.completedAt
    ? `<span class="cr-step-date">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Completed ${new Date(step.completedAt).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
       </span>` : '';
  return `
    <div class="cr-step${step.completed ? ' completed' : ''}" id="step-row-${step.id}">
      <div class="cr-checkbox-wrap">
        <input type="checkbox" class="cr-checkbox"
          ${step.completed ? 'checked' : ''}
          onchange="toggleStepComplete('${roadmapId}','${weekId}','${step.id}',this.checked)"/>
      </div>
      <div class="cr-step-content">
        <div class="cr-step-title">${escHtml(step.title)}</div>
        ${step.description ? `<div class="cr-step-desc">${escHtml(step.description)}</div>` : ''}
        ${completedDate}
      </div>
      <div class="cr-step-actions">
        <button class="cr-icon-btn" title="Edit step" onclick="openEditStepModal('${roadmapId}','${weekId}','${step.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="cr-icon-btn danger" title="Delete step" onclick="deleteStep('${roadmapId}','${weekId}','${step.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
      </div>
    </div>`;
}

// ── WEEK ACCORDION ────────────────────────────────────
function toggleWeekOpen(weekId) {
  const block = document.getElementById(`week-block-${weekId}`);
  if (block) block.classList.toggle('open');
}

// ── ROADMAP CRUD ──────────────────────────────────────
function openCreateRoadmapModal() {
  document.getElementById('cr-roadmap-modal-title').textContent = 'Create Roadmap';
  document.getElementById('cr-roadmap-edit-id').value           = '';
  document.getElementById('cr-roadmap-title-input').value       = '';
  document.getElementById('cr-roadmap-desc-input').value        = '';
  openModal('modal-cr-roadmap');
  setTimeout(() => document.getElementById('cr-roadmap-title-input').focus(), 80);
}

function openEditRoadmapModal() {
  const roadmap = getActiveRoadmap();
  if (!roadmap) return;
  document.getElementById('cr-roadmap-modal-title').textContent = 'Edit Roadmap';
  document.getElementById('cr-roadmap-edit-id').value           = roadmap.id;
  document.getElementById('cr-roadmap-title-input').value       = roadmap.title;
  document.getElementById('cr-roadmap-desc-input').value        = roadmap.description || '';
  openModal('modal-cr-roadmap');
  setTimeout(() => document.getElementById('cr-roadmap-title-input').focus(), 80);
}

function saveRoadmap() {
  const title = document.getElementById('cr-roadmap-title-input').value.trim();
  if (!title) { showToast('Please enter a roadmap title.', '⚠️'); return; }
  const editId = document.getElementById('cr-roadmap-edit-id').value;
  const desc   = document.getElementById('cr-roadmap-desc-input').value.trim();

  if (editId) {
    const roadmap = STATE.roadmaps.find(r => r.id === editId);
    if (roadmap) { roadmap.title = title; roadmap.description = desc; }
    showToast('Roadmap updated!', '✏️');
  } else {
    STATE.roadmaps.push({ id: uid(), title, description: desc, createdAt: Date.now(), weeks: [] });
    showToast(`"${title}" created!`, '🗺️');
  }

  LS.save();
  closeModal('modal-cr-roadmap');
  if (CR_ACTIVE_ID) renderRoadmapDetail(); else renderRoadmaps();
}

function deleteCurrentRoadmap() {
  const roadmap = getActiveRoadmap();
  if (!roadmap) return;
  if (!confirm(`Delete "${roadmap.title}"? This cannot be undone.`)) return;
  STATE.roadmaps = STATE.roadmaps.filter(r => r.id !== roadmap.id);
  LS.save();
  showToast('Roadmap deleted.', '🗑️');
  closeRoadmapDetail();
}

// ── WEEK CRUD ─────────────────────────────────────────
function openAddWeekModal() {
  document.getElementById('cr-week-modal-title').textContent = 'Add Week';
  document.getElementById('cr-week-edit-id').value           = '';
  document.getElementById('cr-week-title-input').value       = '';
  openModal('modal-cr-week');
  setTimeout(() => document.getElementById('cr-week-title-input').focus(), 80);
}

function openEditWeekModal(roadmapId, weekId) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  document.getElementById('cr-week-modal-title').textContent = 'Edit Week';
  document.getElementById('cr-week-edit-id').value           = weekId;
  document.getElementById('cr-week-title-input').value       = week.title;
  openModal('modal-cr-week');
  setTimeout(() => document.getElementById('cr-week-title-input').focus(), 80);
}

function saveWeek() {
  const title = document.getElementById('cr-week-title-input').value.trim();
  if (!title) { showToast('Please enter a week title.', '⚠️'); return; }
  const roadmap = getActiveRoadmap();
  if (!roadmap) return;
  const editId = document.getElementById('cr-week-edit-id').value;

  if (editId) {
    const week = roadmap.weeks.find(w => w.id === editId);
    if (week) week.title = title;
    showToast('Week updated!', '✏️');
  } else {
    roadmap.weeks.push({ id: uid(), title, steps: [] });
    showToast('Week added!', '📅');
  }

  LS.save();
  closeModal('modal-cr-week');
  renderRoadmapDetail();
}

function deleteWeek(roadmapId, weekId) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  if (!confirm(`Delete "${week.title}" and all its steps?`)) return;
  roadmap.weeks = roadmap.weeks.filter(w => w.id !== weekId);
  LS.save();
  showToast('Week deleted.', '🗑️');
  renderRoadmapDetail();
}

// ── STEP CRUD ─────────────────────────────────────────
function openAddStepModal(roadmapId, weekId) {
  document.getElementById('cr-step-modal-title').textContent = 'Add Step';
  document.getElementById('cr-step-week-id').value           = weekId;
  document.getElementById('cr-step-edit-id').value           = '';
  document.getElementById('cr-step-title-input').value       = '';
  document.getElementById('cr-step-desc-input').value        = '';
  openModal('modal-cr-step');
  setTimeout(() => document.getElementById('cr-step-title-input').focus(), 80);
}

function openEditStepModal(roadmapId, weekId, stepId) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  const step = week.steps.find(s => s.id === stepId);
  if (!step) return;
  document.getElementById('cr-step-modal-title').textContent = 'Edit Step';
  document.getElementById('cr-step-week-id').value           = weekId;
  document.getElementById('cr-step-edit-id').value           = stepId;
  document.getElementById('cr-step-title-input').value       = step.title;
  document.getElementById('cr-step-desc-input').value        = step.description || '';
  openModal('modal-cr-step');
  setTimeout(() => document.getElementById('cr-step-title-input').focus(), 80);
}

function saveStep() {
  const title = document.getElementById('cr-step-title-input').value.trim();
  if (!title) { showToast('Please enter a step title.', '⚠️'); return; }
  const roadmap = getActiveRoadmap();
  if (!roadmap) return;
  const weekId = document.getElementById('cr-step-week-id').value;
  const week   = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  const editId = document.getElementById('cr-step-edit-id').value;
  const desc   = document.getElementById('cr-step-desc-input').value.trim();

  if (editId) {
    const step = week.steps.find(s => s.id === editId);
    if (step) { step.title = title; step.description = desc; }
    showToast('Step updated!', '✏️');
  } else {
    week.steps.push({ id: uid(), title, description: desc, completed: false, completedAt: null });
    showToast('Step added!', '➕');
  }

  LS.save();
  closeModal('modal-cr-step');
  renderRoadmapDetail();
}

function deleteStep(roadmapId, weekId, stepId) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  const step = week.steps.find(s => s.id === stepId);
  if (!step) return;
  if (!confirm(`Delete step "${step.title}"?`)) return;
  week.steps = week.steps.filter(s => s.id !== stepId);
  LS.save();
  showToast('Step deleted.', '🗑️');
  renderRoadmapDetail();
}

// ── STEP COMPLETION (integrates with tasks + streak) ──
function toggleStepComplete(roadmapId, weekId, stepId, isChecked) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  const step = week.steps.find(s => s.id === stepId);
  if (!step) return;

  step.completed   = isChecked;
  step.completedAt = isChecked ? Date.now() : null;

  if (isChecked) {
    // Create a real task in STATE.tasks → feeds calendar, streak, revision
    const task = {
      id: uid(), title: step.title,
      description: step.description || `From roadmap: ${roadmap.title}`,
      date: todayKey(), priority: 'medium', tags: ['Roadmap'],
      status: 'done', notes: '', isRevision: false,
      pomodoroCount: 0, createdAt: Date.now(),
      _fromRoadmap: true, _stepId: stepId,
    };
    STATE.tasks.push(task);

    // Update streak
    const today = todayKey();
    if (STATE.lastCompletionDate !== today) {
      const yesterday = dateKey(offsetDate(new Date(), -1));
      STATE.streak = STATE.lastCompletionDate === yesterday ? STATE.streak + 1 : 1;
      STATE.lastCompletionDate = today;
      updateStreakDisplay();
    }

    showToast(`"${step.title}" completed! 🎯`, '✅');

    // Animate row
    const row = document.getElementById(`step-row-${stepId}`);
    if (row) {
      row.classList.add('just-completed');
      setTimeout(() => row.classList.remove('just-completed'), 400);
    }
  } else {
    // Remove the auto-created task when unchecking
    STATE.tasks = STATE.tasks.filter(t => !(t._fromRoadmap && t._stepId === stepId));
    showToast('Step marked incomplete.', '↩️');
  }

  LS.save();

  // Update progress bar smoothly without full re-render
  const { total, done, pct } = crGetProgress(roadmap);
  const labelEl = document.getElementById('cr-progress-label');
  const pctEl   = document.getElementById('cr-progress-pct');
  const fillEl  = document.getElementById('cr-progress-fill');
  if (labelEl) labelEl.textContent = `${done} / ${total} step${total !== 1 ? 's' : ''}`;
  if (pctEl)   pctEl.textContent   = `${pct}%`;
  if (fillEl)  fillEl.style.width  = `${pct}%`;

  // Update the step row to reflect new state
  const row = document.getElementById(`step-row-${stepId}`);
  if (row) row.className = `cr-step${isChecked ? ' completed' : ''}`;
}
