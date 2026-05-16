// ═══════════════════════════════════════════════════════════
//  RoadmapX — Offline Detection & Auto-Retry  (IIFE)
//
//  • Detects connectivity via @capacitor/network (native) or
//    browser online/offline events (web)
//  • Shows a styled dark banner at the top when offline
//  • Auto-retries the last failed fetch when connection restores
//  • Self-contained — no external dependencies
// ═══════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────
  var isOnline = true;
  var lastFailedRequest = null;
  var banner = null;
  var RETRY_DELAY = 1500; // ms after reconnection before retrying

  // ── Banner injection ─────────────────────────────────────
  function createBanner() {
    if (banner) return banner;

    banner = document.createElement('div');
    banner.id = 'rx-offline-banner';
    banner.textContent = '\u26A0\uFE0F No internet connection';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'assertive');

    // Inline styles — no external CSS needed
    banner.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'right: 0',
      'z-index: 99999',
      'background: #05050f',
      'color: #ffffff',
      'font-family: system-ui, -apple-system, sans-serif',
      'font-size: 13px',
      'font-weight: 600',
      'text-align: center',
      'padding: 10px 16px',
      'border-bottom: 1px solid rgba(0, 229, 200, 0.25)',
      'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5)',
      'display: none',
      'line-height: 1.4',
      'letter-spacing: 0.3px',
      '-webkit-font-smoothing: antialiased'
    ].join(';');

    document.body.appendChild(banner);
    return banner;
  }

  function showBanner() {
    var b = createBanner();
    b.style.display = 'block';
    // Push page content down so banner doesn't overlap
    document.body.style.paddingTop = (b.offsetHeight || 40) + 'px';
  }

  function hideBanner() {
    if (banner) {
      banner.style.display = 'none';
      document.body.style.paddingTop = '';
    }
  }

  // ── Offline / Online handlers ────────────────────────────
  function wentOffline() {
    if (isOnline) {
      isOnline = false;
      showBanner();
    }
  }

  function wentOnline() {
    if (!isOnline) {
      isOnline = true;
      hideBanner();
      retryLastFailed();
    }
  }

  // ── Auto-retry logic ─────────────────────────────────────
  // Monkey-patch window.fetch to capture failed requests
  var originalFetch = window.fetch;
  window.fetch = function () {
    var args = arguments;
    var url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url ? args[0].url : '');

    // Skip offline.js itself and non-API requests
    if (url.indexOf('offline.js') !== -1) {
      return originalFetch.apply(this, args);
    }

    return originalFetch.apply(this, args).catch(function (err) {
      // Only store API-like requests (skip static assets)
      if (url && (url.indexOf('/api/') !== -1 || url.indexOf('/auth/') !== -1 ||
          url.indexOf('/me') !== -1 || url.indexOf('/get-') !== -1 ||
          url.indexOf('/logout') !== -1 || url.indexOf('/login') !== -1 ||
          url.indexOf('/register') !== -1 || url.indexOf('/post-') !== -1)) {
        lastFailedRequest = {
          url: url,
          args: args,
          timestamp: Date.now()
        };
      }

      // If we're offline, ensure banner is showing
      if (!isOnline || (err && (err.name === 'TypeError' || err.message === 'Failed to fetch' || err.message === 'NetworkError when attempting to fetch resource.'))) {
        wentOffline();
      }

      throw err; // Re-throw so callers still handle it
    });
  };

  function retryLastFailed() {
    if (!lastFailedRequest) return;

    var req = lastFailedRequest;
    lastFailedRequest = null;

    // Don't retry very old requests (> 5 minutes)
    if (Date.now() - req.timestamp > 5 * 60 * 1000) return;

    // Small delay to let network stabilise
    setTimeout(function () {
      if (!isOnline) return; // Went offline again before retry

      originalFetch.apply(window, req.args).then(function (res) {
        if (res.ok) {
          console.log('[RoadmapX] Auto-retry succeeded for:', req.url);
        }
      }).catch(function () {
        // Retry failed — store again for next reconnection
        lastFailedRequest = req;
      });
    }, RETRY_DELAY);
  }

  // ── Capacitor Network plugin detection ───────────────────
  function initCapacitorNetwork() {
    if (typeof window.Capacitor === 'undefined' || !window.Capacitor.Plugins || !window.Capacitor.Plugins.Network) {
      return false;
    }

    try {
      var Network = window.Capacitor.Plugins.Network;

      // Get initial status
      Network.getStatus().then(function (status) {
        isOnline = status.connected;
        if (!isOnline) {
          wentOffline();
        }
      }).catch(function () {
        // Fallback: assume online
      });

      // Listen for changes
      Network.addListener('networkStatusChange', function (status) {
        if (status.connected) {
          wentOnline();
        } else {
          wentOffline();
        }
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  // ── Browser online/offline events ────────────────────────
  function initBrowserEvents() {
    // Set initial state from navigator
    isOnline = typeof navigator.onLine === 'boolean' ? navigator.onLine : true;

    if (!isOnline) {
      wentOffline();
    }

    window.addEventListener('online', wentOnline);
    window.addEventListener('offline', wentOffline);
  }

  // ── Initialise ───────────────────────────────────────────
  function init() {
    // Wait for DOM before injecting banner
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        startDetection();
      });
    } else {
      startDetection();
    }
  }

  function startDetection() {
    // Try Capacitor first; fall back to browser events
    var capacitorOk = initCapacitorNetwork();
    if (!capacitorOk) {
      initBrowserEvents();
    }
  }

  init();
})();
