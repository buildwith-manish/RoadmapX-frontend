/**
 * login_script.js — RoadmapX Auth UI Logic
 * Login/Signup panel removed. Only Google + OTP sign-in available.
 */

const API  = window.RX_API || "https://roadmapx-backend-3qmc.onrender.com";
const HOME = 'index.html';

function getAPI() { return API; }

// ── Logout ────────────────────────────────────────────────────────────────
window.rxLogout = async function () {
  try {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
  } catch (e) { /* ignore */ }

  try {
    if (window.HybridData && typeof window.HybridData.onLogout === 'function') {
      window.HybridData.onLogout();
    }
  } catch (e) { /* ignore */ }

  localStorage.removeItem('rx_token');
  localStorage.removeItem('rx_user');

  window.location.replace(HOME);
};
