/**
 * auth_guard.js — RoadmapX Soft Auth Guard (Guest-First Mode)
 *
 * CHANGE: No longer forces a redirect to login.html.
 * Instead, we silently check if a session exists and:
 *   - If logged in  → set rx_token + rx_user in localStorage, update header UI
 *   - If guest      → clear stale tokens, render guest header UI
 *
 * This mirrors the ChatGPT / Canva "use first, sign in later" pattern.
 * The header dynamically shows either:
 *   • Guest  → "Sign In" button
 *   • Logged In → username + logout icon
 */
(async function () {
  const API = 'https://roadmapx-backend-3qmc.onrender.com';

  // ── Helper: update header to reflect auth state ──────────────────────
  function applyGuestHeader() {
    const hdrRight = document.querySelector('.hdr-right');
    if (!hdrRight) return;

    // Remove profile/logout buttons
    hdrRight.querySelectorAll('button[title="Profile"], button[title="Logout"]').forEach(b => b.remove());

    // FIX: Remove Stats button for guests — stats page requires auth.
    // Showing the button but hard-redirecting to login is a broken UX path.
    hdrRight.querySelectorAll('button[title="Stats"], a[href="stats.html"]').forEach(b => b.remove());
    // Also catch stats buttons identified by href or data attribute
    hdrRight.querySelectorAll('[data-page="stats"], .stats-btn').forEach(b => b.remove());

    // Remove any existing sign-in pill to avoid duplicates
    hdrRight.querySelector('.hdr-signin-btn') && hdrRight.querySelector('.hdr-signin-btn').remove();

    // Insert Sign In button
    const signinBtn = document.createElement('button');
    signinBtn.className = 'hdr-btn hdr-signin-btn';
    signinBtn.title = 'Sign In';
    signinBtn.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 11px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      font-family: var(--font-mono, monospace);
      background: linear-gradient(135deg, rgba(0,229,200,0.15), rgba(124,58,237,0.15));
      border: 1px solid rgba(0,229,200,0.35);
      color: #00e5c8;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    `;
    signinBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      Sign In
    `;
    signinBtn.addEventListener('click', () => { window.location.href = 'login.html'; });
    hdrRight.appendChild(signinBtn);
  }

  function applyLoggedInHeader(username) {
    const hdrRight = document.querySelector('.hdr-right');
    if (!hdrRight) return;

    // Remove any sign-in button
    hdrRight.querySelector('.hdr-signin-btn') && hdrRight.querySelector('.hdr-signin-btn').remove();
    // Remove any existing user pill to avoid duplicates
    hdrRight.querySelector('.hdr-user-pill') && hdrRight.querySelector('.hdr-user-pill').remove();

    // Ensure profile + logout buttons exist
    const hasProfile = hdrRight.querySelector('button[title="Profile"]');
    const hasLogout  = hdrRight.querySelector('button[title="Logout"]');

    // Insert username pill before profile button (or at end)
    const pill = document.createElement('div');
    pill.className = 'hdr-user-pill';
    pill.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      font-family: var(--font-mono, monospace);
      background: linear-gradient(135deg, rgba(0,229,200,0.12), rgba(124,58,237,0.12));
      border: 1px solid rgba(0,229,200,0.25);
      color: var(--t1, #fff);
      max-width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
    pill.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        style="width:11px;height:11px;flex-shrink:0;color:#00e5c8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span title="${username}">${username}</span>
    `;

    const refBtn = hasProfile || hasLogout;
    if (refBtn) {
      hdrRight.insertBefore(pill, refBtn);
    } else {
      hdrRight.appendChild(pill);
    }

    // Make sure profile + logout are there
    if (!hasProfile) {
      const profileBtn = document.createElement('button');
      profileBtn.className = 'hdr-btn';
      profileBtn.title = 'Profile';
      profileBtn.onclick = () => { window.location.href = 'profile.html'; };
      profileBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      hdrRight.appendChild(profileBtn);
    }
    if (!hasLogout) {
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'hdr-btn';
      logoutBtn.title = 'Logout';
      logoutBtn.onclick = () => { if (window.rxLogout) window.rxLogout(); };
      logoutBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`;
      hdrRight.appendChild(logoutBtn);
    }
  }

  // ── Check session ─────────────────────────────────────────────────────
  const localToken = localStorage.getItem('rx_token');

  // Fast path: no local token → immediately show guest UI, skip network
  if (!localToken) {
    // Wait for DOM if needed
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyGuestHeader);
    } else {
      applyGuestHeader();
    }
    return;
  }

  // Slow path: verify existing session is still valid
  try {
    const res  = await fetch(API + '/me', { credentials: 'include' });
    const data = await res.json();

    if (data && data.success) {
      localStorage.setItem('rx_token', 'true');
      localStorage.setItem('rx_user', data.username);
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyLoggedInHeader(data.username));
      } else {
        applyLoggedInHeader(data.username);
      }
    } else {
      // Session expired — reset to guest
      localStorage.removeItem('rx_token');
      localStorage.removeItem('rx_user');
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyGuestHeader);
      } else {
        applyGuestHeader();
      }
    }
  } catch (e) {
    // Network error — treat existing local token as valid (offline/cold start)
    const savedUser = localStorage.getItem('rx_user') || 'User';
    console.warn('[auth_guard] Could not verify session. Using local token.');
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyLoggedInHeader(savedUser));
    } else {
      applyLoggedInHeader(savedUser);
    }
  }
})();
