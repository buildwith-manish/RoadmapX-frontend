/**
 * notes_storage.js — RoadmapX Notes Storage Module (v2)
 * Backend: https://roadmapx-backend-3qmc.onrender.com
 *
 * Behaviour:
 *  - Always auto-saves draft to localStorage while typing
 *  - On page load:
 *      logged-in  → load notes from backend (/get-text)
 *      guest      → load notes from localStorage
 *  - Save button:
 *      logged-in  → POST to backend (/save-text), clear localStorage copy
 *      guest      → show login prompt (do NOT save to backend)
 *  - After login (call window.NotesBridge.syncAfterLogin()):
 *      take localStorage notes → save each to backend → clear localStorage
 *
 * Auth detection: session cookie via GET /me
 * Backend endpoints: POST /save-text  { title, content }
 *                    GET  /get-text
 */

(function () {
  "use strict";

  /* ─────────────────────────── config ─────────────────────────────────── */

  const API = "https://roadmapx-backend-3qmc.onrender.com";

  /* ─────────────────────────────── state ──────────────────────────────── */

  let _isLoggedIn = false;
  let _username   = null;

  /* ─────────────────────────── helpers ────────────────────────────────── */

  const GUEST_AI_KEY   = "roadmapx_notes_ai_guest";
  const GUEST_DSA_KEY  = "roadmapx_notes_dsa_guest";
  const GUEST_AI_DRAFT = "roadmapx_draft_ai_guest";
  const GUEST_DSA_DRAFT= "roadmapx_draft_dsa_guest";

  function loadLocal(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); }
    catch (e) { return []; }
  }

  function saveLocal(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function todayStr() {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  }

  function wordCount(text) {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  }

  function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ──────────────────────── auth check ────────────────────────────────── */

  function checkAuth(callback) {
    fetch(API + "/me", { credentials: "include" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.success) {
          _isLoggedIn = true;
          _username   = data.username;
        } else {
          _isLoggedIn = false;
          _username   = null;
        }
        callback();
      })
      .catch(function () {
        _isLoggedIn = false;
        _username   = null;
        callback();
      });
  }

  /* ──────────────────────── login prompt modal ────────────────────────── */

  function showLoginPrompt() {
    const overlay = document.getElementById("modal-confirm");
    if (overlay) {
      const title = document.getElementById("confirm-title");
      const text  = document.getElementById("confirm-text");
      const okBtn = document.getElementById("confirm-ok");
      if (title) title.textContent = "🔒 Login Required";
      if (text)  text.textContent  =
        "Your notes are saved locally. Log in to sync them across devices and keep them safe.";
      if (okBtn) {
        okBtn.textContent = "Go to Login";
        okBtn.style.background = "linear-gradient(135deg, #7b2fff, #00f5d4)";
        okBtn.onclick = function () { window.location.href = "login.html"; };
      }
      overlay.classList.add("active");
      overlay.style.display = "flex";
    } else {
      if (confirm("Log in to save notes to the cloud and sync across devices.\n\nGo to Login?")) {
        window.location.href = "login.html";
      }
    }
  }

  /* ──────────────────────── backend helpers ────────────────────────────── */

  function fetchBackendNotes(section) {
    return fetch(API + "/get-text", { credentials: "include" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.success) return [];
        return (data.data || [])
          .filter(function (n) { return n.title === section; })
          .map(function (n) {
            return {
              id:   n._id || n.id || Date.now(),
              date: n.createdAt
                ? new Date(n.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                : todayStr(),
              text: n.content
            };
          });
      })
      .catch(function () { return []; });
  }

  function postBackendNote(section, text) {
    return fetch(API + "/save-text", {
      method:      "POST",
      credentials: "include",
      headers:     { "Content-Type": "application/json" },
      body:        JSON.stringify({ title: section, content: text })
    })
      .then(function (r) { return r.json(); })
      .catch(function () { return { success: false }; });
  }

  /* ───────────────────── auto-save debounce timers ────────────────────── */

  let aiTimer  = null;
  let dsaTimer = null;

  /* ═══════════════════════════ AI NOTES ══════════════════════════════════ */

  function aiAutoSaveNotes() {
    const ta = document.getElementById("ai-notes-ta");
    if (!ta) return;
    const wc = document.getElementById("ai-notes-wc");
    if (wc) wc.textContent = wordCount(ta.value) + " words";
    clearTimeout(aiTimer);
    aiTimer = setTimeout(function () {
      localStorage.setItem(GUEST_AI_DRAFT, ta.value);
    }, 800);
  }

  function aiSaveNotes() {
    const ta = document.getElementById("ai-notes-ta");
    if (!ta || ta.value.trim() === "") {
      showToast("⚠️ Write something before saving!");
      return;
    }

    if (!_isLoggedIn) {
      const notes = loadLocal(GUEST_AI_KEY);
      notes.unshift({ id: Date.now(), date: todayStr(), text: ta.value.trim() });
      saveLocal(GUEST_AI_KEY, notes);
      localStorage.setItem(GUEST_AI_DRAFT, ta.value);
      showLoginPrompt();
      return;
    }

    const text = ta.value.trim();
    postBackendNote("ai", text).then(function (data) {
      if (data.success) {
        localStorage.removeItem(GUEST_AI_DRAFT);
        localStorage.removeItem(GUEST_AI_KEY);
        ta.value = "";
        const wc = document.getElementById("ai-notes-wc");
        if (wc) wc.textContent = "0 words";
        showToast("✅ AI note saved to cloud!");
        loadAndRenderAINotes();
        syncProfileNotesCount();
      } else {
        showToast("❌ Failed to save. Try again.");
      }
    });
  }

  function loadAndRenderAINotes() {
    if (_isLoggedIn) {
      fetchBackendNotes("ai").then(function (notes) {
        renderAINotesList(notes);
        syncProfileNotesCount(notes.length);
      });
    } else {
      const notes = loadLocal(GUEST_AI_KEY);
      renderAINotesList(notes);
    }
  }

  function renderAINotesList(notes) {
    const container = document.getElementById("ai-notes-list");
    if (!container) return;
    if (!notes || notes.length === 0) {
      container.innerHTML =
        '<p style="color:var(--t2);font-size:13px;padding:8px 0;">No saved AI notes yet. Write and save your first note above!</p>';
      return;
    }
    container.innerHTML = notes.map(function (n) {
      const preview = n.text.length > 120 ? n.text.slice(0, 120) + "…" : n.text;
      return (
        '<div class="card" style="margin-bottom:10px;">' +
          '<div class="card-header">' +
            '<span class="card-title" style="font-size:12px;color:var(--t2);">📅 ' + n.date + '</span>' +
            '<button onclick="APP.deleteAINote(\'' + n.id + '\')" ' +
              'style="background:none;border:none;color:var(--t2);font-size:16px;cursor:pointer;padding:2px 6px;" ' +
              'title="Delete note">🗑</button>' +
          '</div>' +
          '<div style="font-size:13px;color:var(--t1);white-space:pre-wrap;line-height:1.6;margin-top:6px;">' +
            escapeHtml(preview) +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function deleteAINote(id) {
    if (_isLoggedIn) {
      showToast("🗑 Note deleted (local view)");
    }
    const notes = loadLocal(GUEST_AI_KEY).filter(function (n) { return String(n.id) !== String(id); });
    saveLocal(GUEST_AI_KEY, notes);
    loadAndRenderAINotes();
  }

  /* ═══════════════════════════ DSA NOTES ══════════════════════════════════ */

  function dsaAutoSaveNotes() {
    const ta = document.getElementById("dsa-notes-ta");
    if (!ta) return;
    const wc = document.getElementById("dsa-notes-wc");
    if (wc) wc.textContent = wordCount(ta.value) + " words";
    clearTimeout(dsaTimer);
    dsaTimer = setTimeout(function () {
      localStorage.setItem(GUEST_DSA_DRAFT, ta.value);
    }, 800);
  }

  function dsaSaveNotes() {
    const ta = document.getElementById("dsa-notes-ta");
    if (!ta || ta.value.trim() === "") {
      showToast("⚠️ Write something before saving!");
      return;
    }

    if (!_isLoggedIn) {
      const notes = loadLocal(GUEST_DSA_KEY);
      notes.unshift({ id: Date.now(), date: todayStr(), text: ta.value.trim() });
      saveLocal(GUEST_DSA_KEY, notes);
      localStorage.setItem(GUEST_DSA_DRAFT, ta.value);
      showLoginPrompt();
      return;
    }

    const text = ta.value.trim();
    postBackendNote("dsa", text).then(function (data) {
      if (data.success) {
        localStorage.removeItem(GUEST_DSA_DRAFT);
        localStorage.removeItem(GUEST_DSA_KEY);
        ta.value = "";
        const wc = document.getElementById("dsa-notes-wc");
        if (wc) wc.textContent = "0 words";
        showToast("✅ DSA note saved to cloud!");
        loadAndRenderDSANotes();
        syncProfileNotesCount();
      } else {
        showToast("❌ Failed to save. Try again.");
      }
    });
  }

  function loadAndRenderDSANotes() {
    if (_isLoggedIn) {
      fetchBackendNotes("dsa").then(function (notes) {
        renderDSANotesList(notes);
      });
    } else {
      const notes = loadLocal(GUEST_DSA_KEY);
      renderDSANotesList(notes);
    }
  }

  function renderDSANotesList(notes) {
    const container = document.getElementById("dsa-notes-list");
    if (!container) return;
    if (!notes || notes.length === 0) {
      container.innerHTML =
        '<p style="color:var(--t2);font-size:13px;padding:8px 0;">No saved DSA notes yet. Write and save your first note above!</p>';
      return;
    }
    container.innerHTML = notes.map(function (n) {
      const preview = n.text.length > 120 ? n.text.slice(0, 120) + "…" : n.text;
      return (
        '<div class="card" style="margin-bottom:10px;">' +
          '<div class="card-header">' +
            '<span class="card-title" style="font-size:12px;color:var(--t2);">📅 ' + n.date + '</span>' +
            '<button onclick="APP.deleteDSANote(\'' + n.id + '\')" ' +
              'style="background:none;border:none;color:var(--t2);font-size:16px;cursor:pointer;padding:2px 6px;" ' +
              'title="Delete note">🗑</button>' +
          '</div>' +
          '<div style="font-size:13px;color:var(--t1);white-space:pre-wrap;line-height:1.6;margin-top:6px;">' +
            escapeHtml(preview) +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function deleteDSANote(id) {
    const notes = loadLocal(GUEST_DSA_KEY).filter(function (n) { return String(n.id) !== String(id); });
    saveLocal(GUEST_DSA_KEY, notes);
    loadAndRenderDSANotes();
    showToast("🗑 Note deleted");
  }

  /* ─────────────────── profile notes count sync ───────────────────────── */

  function syncProfileNotesCount(aiCount) {
    const el = document.getElementById("p-notes-count");
    if (!el) return;
    if (aiCount !== undefined) { el.textContent = aiCount; return; }
    if (_isLoggedIn) {
      Promise.all([
        fetchBackendNotes("ai"),
        fetchBackendNotes("dsa")
      ]).then(function (results) {
        el.textContent = results[0].length + results[1].length;
      });
    } else {
      el.textContent = loadLocal(GUEST_AI_KEY).length + loadLocal(GUEST_DSA_KEY).length;
    }
  }

  /* ──────────────────────── post-login sync ───────────────────────────── */

  function syncAfterLogin(username) {
    _isLoggedIn = true;
    _username   = username;

    const aiNotes  = loadLocal(GUEST_AI_KEY);
    const dsaNotes = loadLocal(GUEST_DSA_KEY);
    const aiDraft  = localStorage.getItem(GUEST_AI_DRAFT);
    const dsaDraft = localStorage.getItem(GUEST_DSA_DRAFT);

    const promises = [];

    aiNotes.forEach(function (n) {
      promises.push(postBackendNote("ai", n.text));
    });
    dsaNotes.forEach(function (n) {
      promises.push(postBackendNote("dsa", n.text));
    });
    if (aiDraft && aiDraft.trim()) {
      promises.push(postBackendNote("ai", aiDraft.trim()));
    }
    if (dsaDraft && dsaDraft.trim()) {
      promises.push(postBackendNote("dsa", dsaDraft.trim()));
    }

    Promise.all(promises).then(function () {
      localStorage.removeItem(GUEST_AI_KEY);
      localStorage.removeItem(GUEST_DSA_KEY);
      localStorage.removeItem(GUEST_AI_DRAFT);
      localStorage.removeItem(GUEST_DSA_DRAFT);
      loadAndRenderAINotes();
      loadAndRenderDSANotes();
      if (promises.length > 0) {
        showToast("☁️ Notes synced to your account!");
      }
    });
  }

  /* ────────────────────────── page init ──────────────────────────────── */

  function initNotes() {
    checkAuth(function () {
      const pendingSync = sessionStorage.getItem("rx_pending_sync");
      if (pendingSync && _isLoggedIn) {
        sessionStorage.removeItem("rx_pending_sync");
        syncAfterLogin(pendingSync);
        return;
      }

      // Restore draft for guests
      const aiDraft = localStorage.getItem(GUEST_AI_DRAFT);
      const aiTa    = document.getElementById("ai-notes-ta");
      if (aiTa && aiDraft && !_isLoggedIn) {
        aiTa.value = aiDraft;
        const wc = document.getElementById("ai-notes-wc");
        if (wc) wc.textContent = wordCount(aiDraft) + " words";
      }

      const dsaDraft = localStorage.getItem(GUEST_DSA_DRAFT);
      const dsaTa    = document.getElementById("dsa-notes-ta");
      if (dsaTa && dsaDraft && !_isLoggedIn) {
        dsaTa.value = dsaDraft;
        const wc = document.getElementById("dsa-notes-wc");
        if (wc) wc.textContent = wordCount(dsaDraft) + " words";
      }

      loadAndRenderAINotes();
      loadAndRenderDSANotes();
      syncProfileNotesCount();
    });
  }

  /* ──────────────────────── attach to APP ──────────────────────────────── */

  function attachToApp() {
    if (typeof window.APP === "undefined") {
      setTimeout(attachToApp, 50);
      return;
    }

    window.APP.aiAutoSaveNotes   = aiAutoSaveNotes;
    window.APP.aiSaveNotes       = aiSaveNotes;
    window.APP.renderAINotesList = function () { loadAndRenderAINotes(); };
    window.APP.deleteAINote      = deleteAINote;

    window.APP.dsaAutoSaveNotes   = dsaAutoSaveNotes;
    window.APP.dsaSaveNotes       = dsaSaveNotes;
    window.APP.renderDSANotesList = function () { loadAndRenderDSANotes(); };
    window.APP.deleteDSANote      = deleteDSANote;

    // Expose bridge for post-login sync
    // Call window.NotesBridge.syncAfterLogin(username) from login_script.js after success
    window.NotesBridge = { syncAfterLogin: syncAfterLogin };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initNotes);
    } else {
      initNotes();
    }
  }

  attachToApp();
})();
