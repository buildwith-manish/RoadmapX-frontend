// ═══════════════════════════════════════════════════════
//  RoadmapX — Centralised API Config  (Bug #7 fix)
//
//  SINGLE SOURCE OF TRUTH for the backend URL.
//  Load this as the FIRST <script> in every HTML page:
//
//    <script src="config.js"></script>
//
//  Then all other JS files use window.RX_API instead of
//  their own hardcoded copy of the backend URL. To switch
//  environments (dev / staging / prod) you only need to
//  change ONE line — right here.
// ═══════════════════════════════════════════════════════

(function () {
  // ── Environment detection ──────────────────────────────
  // Cloudflare Pages preview URLs contain "pages.dev".
  // Local dev runs on localhost or 127.0.0.1.
  // Everything else is treated as production.
  const host = window.location.hostname;

  let apiBase;

  if (host === 'localhost' || host === '127.0.0.1') {
    // Local development — point at the local backend
    apiBase = 'http://localhost:5000';
  } else {
    // Production / Cloudflare Pages — point at Render backend
    apiBase = 'https://roadmapx-backend-3qmc.onrender.com';
  }

  // Expose globally — never ends with a trailing slash
  window.RX_API = apiBase;
})();
