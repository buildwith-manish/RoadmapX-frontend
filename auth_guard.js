/**
 * auth_guard.js — RoadmapX Auth Guard (UPDATED)
 *
 * ORIGINAL BUG: Only checked localStorage. A user could set
 *   rx_token = "true" manually and bypass auth entirely.
 *   Also: localStorage doesn't know if the backend session expired.
 *
 * FIX: We now always verify with GET /me on the backend.
 *   - Valid session   → proceed, update localStorage to match.
 *   - Invalid session → clear localStorage and redirect to login.
 *
 * We also accept the rx_token localStorage flag as a fast-path
 * first check: if it's absent we redirect immediately without
 * a network round-trip (common case for unauthenticated visitors).
 */
(async function () {
  const API = 'https://roadmapx-backend-3qmc.onrender.com';

  // Fast path: if there's no local token at all, don't bother
  // hitting the network — just redirect immediately.
  const localToken = localStorage.getItem('rx_token');
  if (!localToken) {
    window.location.replace('login.html');
    return;
  }

  // Slow path: confirm the session is still valid on the server.
  // This catches cases where the server session expired but the
  // localStorage flag is still set (e.g., after 7 days).
  try {
    const res  = await fetch(API + '/me', {
      credentials: 'include',  // send the session cookie
    });
    const data = await res.json();

    if (data && data.success) {
      // Session is valid — keep localStorage in sync
      localStorage.setItem('rx_token', 'true');
      localStorage.setItem('rx_user', data.username);
      // Auth guard passed — do nothing, page loads normally
    } else {
      // Session expired or invalid — clear stale local state and redirect
      localStorage.removeItem('rx_token');
      localStorage.removeItem('rx_user');
      window.location.replace('login.html');
    }
  } catch (e) {
    // Network error — we can't verify the session.
    // Decision: allow through with a warning rather than
    // blocking the user from their own app just because
    // Render's server is cold-starting.
    // The app will still work in localStorage (guest) mode.
    console.warn('[auth_guard] Could not verify session with backend. Allowing through with local data.');
  }
})();
