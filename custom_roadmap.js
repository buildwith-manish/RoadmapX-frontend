/* ═══════════════════════════════════════════════════════
   CUSTOM ROADMAP SYSTEM — JS ADDITIONS
   Append this entire block to the END of roadmap.js
   (after the existing code, before or after the init function)

   Integrates with:
   - STATE.tasks  (step completion → creates task)
   - LS.save()    (persistence layer)
   - showToast()  (notifications)
   - uid()        (id generation)
   - escHtml()    (XSS safety)
   - todayKey()   (date key)
   - openModal() / closeModal()  (modal system)
═══════════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────────
// CUSTOM ROADMAP STATE + STORAGE KEY
// ──────────────────────────────────────────────────────
STATE.roadmaps = [];   // Extended onto existing STATE object

const CR_KEY = 'roadmapx_custom_roadmaps';

/** Load custom roadmaps from localStorage */
function crLoad() {
  try {
    STATE.roadmaps = JSON.parse(localStorage.getItem(CR_KEY) || '[]');
  } catch (e) {
    STATE.roadmaps = [];
    console.error('crLoad error', e);
  }
}

/** Persist custom roadmaps to localStorage */
function crSave() {
  localStorage.setItem(CR_KEY, JSON.stringify(STATE.roadmaps));
}

// ──────────────────────────────────────────────────────
// ACTIVE ROADMAP POINTER
// ──────────────────────────────────────────────────────
let CR_ACTIVE_ID = null;   // id of roadmap currently open in detail view

function getActiveRoadmap() {
  return STATE.roadmaps.find(r => r.id === CR_ACTIVE_ID) || null;
}

// ──────────────────────────────────────────────────────
// PROGRESS HELPERS
// ──────────────────────────────────────────────────────
function crGetProgress(roadmap) {
  let total = 0, done = 0;
  (roadmap.weeks || []).forEach(w => {
    (w.steps || []).forEach(s => {
      total++;
      if (s.completed) done++;
    });
  });
  return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

// ──────────────────────────────────────────────────────
// 1. RENDER — LIST VIEW (cards)
// ──────────────────────────────────────────────────────
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
      <div class="cr-card" onclick="openRoadmapDetail('${r.id}')"
           style="animation-delay:${i * 0.05}s">
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

// ──────────────────────────────────────────────────────
// 2. OPEN / CLOSE DETAIL VIEW
// ──────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────
// 3. RENDER — DETAIL VIEW
// ──────────────────────────────────────────────────────
function renderRoadmapDetail() {
  const roadmap = getActiveRoadmap();
  if (!roadmap) { closeRoadmapDetail(); return; }

  // Header
  document.getElementById('cr-detail-title').textContent = roadmap.title;
  document.getElementById('cr-detail-desc').textContent  = roadmap.description || '';

  // Progress
  const { total, done, pct } = crGetProgress(roadmap);
  document.getElementById('cr-progress-label').textContent = `${done} / ${total} step${total !== 1 ? 's' : ''}`;
  document.getElementById('cr-progress-pct').textContent   = `${pct}%`;
  document.getElementById('cr-progress-fill').style.width  = `${pct}%`;

  // Weeks
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

/** Renders one collapsible week block */
function renderWeekBlock(roadmapId, week, weekIndex) {
  const steps     = week.steps || [];
  const doneCount = steps.filter(s => s.completed).length;
  const allDone   = steps.length > 0 && doneCount === steps.length;

  const stepRows = steps.map((step, si) => renderStepRow(roadmapId, week.id, step, si)).join('');

  return `
    <div class="cr-week-block" id="week-block-${week.id}">
      <div class="cr-week-header" onclick="toggleWeekOpen('${week.id}')">
        <svg class="cr-week-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        <div class="cr-week-title">${escHtml(week.title)}</div>
        <span class="cr-week-step-count">${steps.length} step${steps.length !== 1 ? 's' : ''}</span>
        ${allDone ? `<span class="cr-week-done-badge">✓ Complete</span>` : doneCount > 0 ? `<span class="cr-week-step-count" style="color:var(--c1)">${doneCount}/${steps.length} done</span>` : ''}
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

/** Renders one step row inside a week */
function renderStepRow(roadmapId, weekId, step, stepIndex) {
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
          onchange="toggleStepComplete('${roadmapId}','${weekId}','${step.id}',this.checked)"
          title="${step.completed ? 'Mark incomplete' : 'Mark complete'}"/>
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

// ──────────────────────────────────────────────────────
// 4. WEEK ACCORDION TOGGLE
// ──────────────────────────────────────────────────────
function toggleWeekOpen(weekId) {
  const block = document.getElementById(`week-block-${weekId}`);
  if (block) block.classList.toggle('open');
}

// ──────────────────────────────────────────────────────
// 5. ROADMAP CRUD
// ──────────────────────────────────────────────────────

/** Open modal to create a new roadmap */
function openCreateRoadmapModal() {
  document.getElementById('cr-roadmap-modal-title').textContent = 'Create Roadmap';
  document.getElementById('cr-roadmap-edit-id').value           = '';
  document.getElementById('cr-roadmap-title-input').value       = '';
  document.getElementById('cr-roadmap-desc-input').value        = '';
  openModal('modal-cr-roadmap');
  setTimeout(() => document.getElementById('cr-roadmap-title-input').focus(), 80);
}

/** Open modal to edit existing roadmap */
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

/** Save (create or update) a roadmap from modal */
function saveRoadmap() {
  const title = document.getElementById('cr-roadmap-title-input').value.trim();
  if (!title) { showToast('Please enter a roadmap title.', '⚠️'); return; }

  const editId = document.getElementById('cr-roadmap-edit-id').value;
  const desc   = document.getElementById('cr-roadmap-desc-input').value.trim();

  if (editId) {
    // UPDATE existing
    const roadmap = STATE.roadmaps.find(r => r.id === editId);
    if (roadmap) {
      roadmap.title       = title;
      roadmap.description = desc;
    }
    showToast('Roadmap updated!', '✏️');
  } else {
    // CREATE new
    const newRoadmap = {
      id:          uid(),
      title,
      description: desc,
      createdAt:   Date.now(),
      weeks:       [],
    };
    STATE.roadmaps.push(newRoadmap);
    showToast(`"${title}" created!`, '🗺️');
  }

  crSave();
  closeModal('modal-cr-roadmap');

  // Re-render whichever view is active
  if (CR_ACTIVE_ID) renderRoadmapDetail();
  else renderRoadmaps();
}

/** Delete the currently open roadmap */
function deleteCurrentRoadmap() {
  const roadmap = getActiveRoadmap();
  if (!roadmap) return;
  if (!confirm(`Delete "${roadmap.title}"? This cannot be undone.`)) return;

  STATE.roadmaps = STATE.roadmaps.filter(r => r.id !== roadmap.id);
  crSave();
  showToast('Roadmap deleted.', '🗑️');
  closeRoadmapDetail();
}

// ──────────────────────────────────────────────────────
// 6. WEEK CRUD
// ──────────────────────────────────────────────────────

/** Open modal to add a new week to the active roadmap */
function openAddWeekModal() {
  document.getElementById('cr-week-modal-title').textContent = 'Add Week';
  document.getElementById('cr-week-edit-id').value           = '';
  document.getElementById('cr-week-title-input').value       = '';
  openModal('modal-cr-week');
  setTimeout(() => document.getElementById('cr-week-title-input').focus(), 80);
}

/** Open modal to edit an existing week */
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

/** Save (create or update) a week from modal */
function saveWeek() {
  const title = document.getElementById('cr-week-title-input').value.trim();
  if (!title) { showToast('Please enter a week title.', '⚠️'); return; }

  const roadmap = getActiveRoadmap();
  if (!roadmap) return;

  const editId = document.getElementById('cr-week-edit-id').value;

  if (editId) {
    // UPDATE
    const week = roadmap.weeks.find(w => w.id === editId);
    if (week) week.title = title;
    showToast('Week updated!', '✏️');
  } else {
    // CREATE
    roadmap.weeks.push({ id: uid(), title, steps: [] });
    showToast(`Week added!`, '📅');
  }

  crSave();
  closeModal('modal-cr-week');
  renderRoadmapDetail();
}

/** Delete a week from a roadmap */
function deleteWeek(roadmapId, weekId) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  if (!confirm(`Delete "${week.title}" and all its steps?`)) return;

  roadmap.weeks = roadmap.weeks.filter(w => w.id !== weekId);
  crSave();
  showToast('Week deleted.', '🗑️');
  renderRoadmapDetail();
}

// ──────────────────────────────────────────────────────
// 7. STEP CRUD
// ──────────────────────────────────────────────────────

/** Open modal to add a new step to a week */
function openAddStepModal(roadmapId, weekId) {
  document.getElementById('cr-step-modal-title').textContent = 'Add Step';
  document.getElementById('cr-step-week-id').value           = weekId;
  document.getElementById('cr-step-edit-id').value           = '';
  document.getElementById('cr-step-title-input').value       = '';
  document.getElementById('cr-step-desc-input').value        = '';
  openModal('modal-cr-step');
  setTimeout(() => document.getElementById('cr-step-title-input').focus(), 80);
}

/** Open modal to edit an existing step */
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

/** Save (create or update) a step from modal */
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
    // UPDATE
    const step = week.steps.find(s => s.id === editId);
    if (step) { step.title = title; step.description = desc; }
    showToast('Step updated!', '✏️');
  } else {
    // CREATE
    week.steps.push({
      id:          uid(),
      title,
      description: desc,
      completed:   false,
      completedAt: null,
    });
    showToast('Step added!', '➕');
  }

  crSave();
  closeModal('modal-cr-step');
  renderRoadmapDetail();
}

/** Delete a step from a week */
function deleteStep(roadmapId, weekId, stepId) {
  const roadmap = STATE.roadmaps.find(r => r.id === roadmapId);
  if (!roadmap) return;
  const week = roadmap.weeks.find(w => w.id === weekId);
  if (!week) return;
  const step = week.steps.find(s => s.id === stepId);
  if (!step) return;
  if (!confirm(`Delete step "${step.title}"?`)) return;

  week.steps = week.steps.filter(s => s.id !== stepId);
  crSave();
  showToast('Step deleted.', '🗑️');
  renderRoadmapDetail();
}

// ──────────────────────────────────────────────────────
// 8. STEP COMPLETION (integrates with tasks + streak)
// ──────────────────────────────────────────────────────
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
    // ── Integration: create a task in STATE.tasks so it shows in
    //    calendar, streak, and revision system ──
    const task = {
      id:           uid(),
      title:        step.title,
      description:  step.description || `Completed from roadmap: ${roadmap.title}`,
      date:         todayKey(),
      priority:     'medium',
      tags:         ['Roadmap'],
      status:       'done',
      notes:        '',
      isRevision:   false,
      pomodoroCount: 0,
      createdAt:    Date.now(),
      // Mark source so it won't be duplicated if re-triggered
      _fromRoadmap: true,
      _stepId:      stepId,
    };
    STATE.tasks.push(task);
    LS.save();  // Persist main tasks

    // Update streak
    updateStreakOnCompletion();

    showToast(`"${step.title}" completed! 🎯`, '✅');

    // Animate the row
    const row = document.getElementById(`step-row-${stepId}`);
    if (row) {
      row.classList.add('just-completed');
      setTimeout(() => row.classList.remove('just-completed'), 400);
    }
  } else {
    // Un-completing: remove the auto-created task to keep data clean
    STATE.tasks = STATE.tasks.filter(t => !(t._fromRoadmap && t._stepId === stepId));
    LS.save();
    showToast(`Step marked incomplete.`, '↩️');
  }

  crSave();

  // Re-render progress without full detail re-render for smoothness
  updateRoadmapProgress(roadmap);
}

/** Update just the progress bar without re-rendering all weeks */
function updateRoadmapProgress(roadmap) {
  const { total, done, pct } = crGetProgress(roadmap);
  const labelEl = document.getElementById('cr-progress-label');
  const pctEl   = document.getElementById('cr-progress-pct');
  const fillEl  = document.getElementById('cr-progress-fill');

  if (labelEl) labelEl.textContent = `${done} / ${total} step${total !== 1 ? 's' : ''}`;
  if (pctEl)   pctEl.textContent   = `${pct}%`;
  if (fillEl)  fillEl.style.width  = `${pct}%`;
}

/** Update streak when a step is completed
 *  Reuses the existing streak mechanism from the app */
function updateStreakOnCompletion() {
  const today = todayKey();
  if (STATE.lastCompletionDate !== today) {
    const yesterday = dateKey(offsetDate(new Date(), -1));
    if (STATE.lastCompletionDate === yesterday) {
      STATE.streak++;
    } else if (STATE.lastCompletionDate !== today) {
      STATE.streak = 1;
    }
    STATE.lastCompletionDate = today;
    LS.save();
    updateStreakDisplay();
  }
}

// ──────────────────────────────────────────────────────
// 9. PANEL SWITCH HOOK
//    Extend the existing switchPanel() to render roadmaps
//    when the custom-roadmaps panel is selected.
//
//    HOW TO APPLY: In roadmap.js, find the switchPanel function
//    and add this line after the existing panel switching logic:
//
//      if (panelName === 'custom-roadmaps') renderRoadmaps();
//
//    OR just use the patch below which wraps switchPanel safely.
// ──────────────────────────────────────────────────────
(function patchSwitchPanel() {
  const _orig = window.switchPanel || switchPanel;
  function switchPanel(panelName) {
    _orig(panelName);
    if (panelName === 'custom-roadmaps') renderRoadmaps();
  }
  // Re-assign on window so onclick="switchPanel(...)" in HTML calls the new version
  window.switchPanel = switchPanel;
  // Also re-wire the nav-item listeners (they use the captured switchPanel reference)
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = null;   // clear any old direct handlers
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      window.switchPanel(panel);
    });
  });
})();

// ──────────────────────────────────────────────────────
// 10. INIT HOOK — load custom roadmaps on startup
// ──────────────────────────────────────────────────────
(function patchInit() {
  // crLoad() needs to run after the DOM is ready.
  // Because this script is appended after existing code, DOMContentLoaded
  // may have already fired. Call immediately if document is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crLoad);
  } else {
    crLoad();
    // Update the nav badge on load
    const badge = document.getElementById('nav-custom-roadmaps-count');
    if (badge) badge.textContent = STATE.roadmaps.length;
  }
})();
