// ═══════════════════════════════════════════════════════════════
//  tab-ai-rm-integration.js
//
//  WHAT THIS FILE DOES:
//  1. Registers 'ai-rm' as a valid tab in APP.switchTab
//  2. Adds APP.openAiVisualRoadmap() — call it from any button
//  3. Adds 'visual' as a sub-tab in switchAISub (for the Visual
//     Graph button inside #ai-subtab-bar)
//  4. Updates HOME progress pill for ai_visual_progress
//
//  HOW TO USE:
//  Add <script src="tab-ai-rm-integration.js"></script>
//  in index.html AFTER script.js and AFTER tab-ai-rm-part6.js
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Wait until APP is ready ───────────────────────────────────
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {

    // ──────────────────────────────────────────────────────────
    // 1. PATCH APP.switchTab to recognise 'ai-rm'
    // ──────────────────────────────────────────────────────────
    if (typeof APP !== 'undefined' && typeof APP.switchTab === 'function') {
      const _orig = APP.switchTab.bind(APP);

      APP.switchTab = function (name) {
        if (name === 'ai-rm') {
          // Hide all panels, show tab-ai-rm
          document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

          const panel = document.getElementById('tab-ai-rm');
          if (panel) panel.classList.add('active');

          // Run the roadmap init if it hasn't rendered yet
          if (typeof aiRmInit === 'function') {
            aiRmInit();
          }

          // Push to nav history if APP supports it
          if (typeof __pushNavState === 'function') {
            __pushNavState({ tab: 'ai-rm' });
          }

          return;
        }
        _orig(name);
      };
    }

    // ──────────────────────────────────────────────────────────
    // 2. PUBLIC HELPER — call from any button
    //    onclick="APP.openAiVisualRoadmap()"
    // ──────────────────────────────────────────────────────────
    if (typeof APP !== 'undefined') {
      APP.openAiVisualRoadmap = function () {
        APP.switchTab('ai-rm');
      };
    }

    // ──────────────────────────────────────────────────────────
    // 3. PATCH APP.switchAISub to handle 'visual' sub-tab
    //    Adds support for the "Visual" button in #ai-subtab-bar
    // ──────────────────────────────────────────────────────────
    if (typeof APP !== 'undefined' && typeof APP.switchAISub === 'function') {
      const _origSub = APP.switchAISub.bind(APP);

      APP.switchAISub = function (name, btn) {
        if (name === 'visual') {
          // Update subtab button active state
          document.querySelectorAll('#ai-subtab-bar .section-subtab').forEach(b => b.classList.remove('active'));
          if (btn) btn.classList.add('active');

          // Open the visual roadmap as a tab
          APP.switchTab('ai-rm');
          return;
        }
        _origSub(name, btn);
      };
    }

    // ──────────────────────────────────────────────────────────
    // 4. UPDATE HOME CARD PROGRESS from ai_visual_progress
    //    Reads the same localStorage key Part 6 writes to,
    //    and updates the green progress bar on the AI card.
    // ──────────────────────────────────────────────────────────
    function updateHomeAiVisualProgress() {
      try {
        const prog = JSON.parse(localStorage.getItem('ai_visual_progress') || '{}');
        const done = Object.values(prog).filter(v => v.status === 'done').length;

        // Total nodes: we read from the IIFE's exposed data if available,
        // otherwise use a fixed count (90 nodes across 14 sections + final)
        const total = 90;
        const pct = Math.round((done / total) * 100);

        // The AI home card progress bar
        const fill = document.getElementById('home-ai-prog');
        if (fill) fill.style.width = pct + '%';
      } catch (e) {
        // silent fail
      }
    }

    // Run once on load
    updateHomeAiVisualProgress();

    // Re-run whenever storage changes (other tabs / Part 6 writes)
    window.addEventListener('storage', function (e) {
      if (e.key === 'ai_visual_progress') {
        updateHomeAiVisualProgress();
      }
    });

  }); // end ready()

})();
