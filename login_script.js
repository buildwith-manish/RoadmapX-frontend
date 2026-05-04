/**
 * login_script.js — RoadmapX Auth UI Logic (Bug-Fixed)
 *
 * ROOT CAUSE FIXES:
 *
 * 1. TOKEN WRITE BEFORE REDIRECT: The old code delegated token storage to
 *    HybridData.onLoginSuccess(). If HybridData wasn't loaded or threw, the
 *    token was never written to localStorage. auth_guard then saw no token on
 *    index.html load and skipped /me entirely, rendering guest UI.
 *    Fixed: we ALWAYS write rx_token + rx_user ourselves immediately after a
 *    successful login response, BEFORE calling HybridData (which can still
 *    do its data migration on top).
 *
 * 2. REDIRECT TIMING: We now redirect after confirming the token is written,
 *    so auth_guard on index.html has something to optimistically render while
 *    the /me verify is in flight.
 *
 * 3. LOGOUT: Returns to index.html (not login.html). The guest-first UX
 *    means users can continue without logging in again.
 */

const API  = window.RX_API; // set by config.js
const HOME = 'index.html';

// ── Tab switcher ─────────────────────────────────────────────────────────
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('tab-login').classList.toggle('active', isLogin);
  document.getElementById('tab-signup').classList.toggle('active', !isLogin);
  document.getElementById('login-panel').classList.toggle('hidden', !isLogin);
  document.getElementById('signup-panel').classList.toggle('hidden', isLogin);
  document.getElementById('subtitle').textContent = isLogin
    ? '// Track your AI journey'
    : '// Create your account';
  hideMsg('login');
  hideMsg('signup');
}

switchTab('login');

// ── Password visibility toggle ────────────────────────────────────────────
document.querySelectorAll('.eye-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const inp = document.getElementById(btn.dataset.target);
    if (!inp) return;
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.classList.toggle('showing', show);
  });
});

// ── Message helpers ───────────────────────────────────────────────────────
function showMsg(panel, text, type) {
  const box = document.getElementById(panel + '-msg');
  if (!box) return;
  box.className = 'msg-box ' + type + ' visible';
  document.getElementById(panel + '-msg-text').textContent = text;
}

function hideMsg(panel) {
  const box = document.getElementById(panel + '-msg');
  if (box) box.classList.remove('visible');
}

function setLoading(btnId, state) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = state;
  btn.classList.toggle('loading', state);
}

// ── Login ─────────────────────────────────────────────────────────────────
async function doLogin() {
  hideMsg('login');
  const username = document.getElementById('l-username').value.trim();
  const password = document.getElementById('l-password').value;

  if (!username || !password) {
    showMsg('login', 'Both fields required.', 'error');
    return;
  }

  setLoading('login-btn', true);

  try {
    const res = await fetch(`${API}/login`, {
      method:      'POST',
      credentials: 'include',          // sends + receives the session cookie
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ email: username, password }),
    });

    const data = await res.json();

    if (data.success) {
      showMsg('login', 'Access granted. Syncing...', 'success');

      // FIX: Always write token ourselves FIRST, unconditionally.
      // Do NOT rely solely on HybridData — if it fails, the token would be
      // missing and auth_guard would render guest UI after redirect.
      localStorage.setItem('rx_token', 'true');
      localStorage.setItem('rx_user', data.username);

      // Then let HybridData do its data migration (best-effort, non-blocking)
      try {
        if (window.HybridData && typeof window.HybridData.onLoginSuccess === 'function') {
          await window.HybridData.onLoginSuccess(data.username);
        }
      } catch (hybridErr) {
        // HybridData failure must NOT stop the login flow.
        // Token is already written above — redirect will still work.
        console.warn('[login] HybridData.onLoginSuccess failed:', hybridErr);
      }

      // Legacy notes bridge (backwards compat)
      try {
        if (window.NotesBridge && typeof window.NotesBridge.syncAfterLogin === 'function') {
          window.NotesBridge.syncAfterLogin(data.username);
        }
      } catch (e) { /* ignore */ }

      showMsg('login', 'Redirecting...', 'success');

      // Short delay so the success message is visible, then redirect.
      // auth_guard on index.html will read rx_token from localStorage
      // immediately (optimistic render) and then confirm via /me.
      setTimeout(() => { window.location.href = HOME; }, 600);

    } else {
      showMsg('login', data.message || 'Login failed. Check credentials.', 'error');
      setLoading('login-btn', false);
    }
  } catch (err) {
    console.error('[login] fetch error:', err);
    showMsg('login', 'Cannot reach server. Check your connection.', 'error');
    setLoading('login-btn', false);
  }
}

// ── Signup step 1 ─────────────────────────────────────────────────────────
let currentSignupStep = 1;

function goStep(n) {
  hideMsg('signup');
  document.getElementById('s-step-' + currentSignupStep).classList.remove('active');
  document.getElementById('s-step-' + n).classList.add('active');

  const dot1  = document.getElementById('sdot-1');
  const dot2  = document.getElementById('sdot-2');
  const line1 = document.getElementById('sline-1');

  dot1.classList.remove('active', 'done');
  dot2.classList.remove('active', 'done');
  if (n === 1) dot1.classList.add('active');
  if (n === 2) { dot1.classList.add('done'); dot2.classList.add('active'); }
  line1.classList.toggle('done', n > 1);

  currentSignupStep = n;
  if (n === 1) {
    document.getElementById('s-password').value = '';
    document.getElementById('s-confirm').value  = '';
  }
}

function signupStep1() {
  hideMsg('signup');
  const username = document.getElementById('s-username').value.trim();
  if (!username || username.length < 3) {
    showMsg('signup', 'Username must be 3+ characters.', 'error');
    return;
  }
  goStep(2);
}

// ── Signup step 2 ─────────────────────────────────────────────────────────
async function signupStep2() {
  hideMsg('signup');
  const username = document.getElementById('s-username').value.trim();
  const password = document.getElementById('s-password').value;
  const confirm  = document.getElementById('s-confirm').value;

  if (!password || !confirm)  { showMsg('signup', 'Fill both password fields.', 'error'); return; }
  if (password.length < 6)    { showMsg('signup', 'Password must be 6+ characters.', 'error'); return; }
  if (password !== confirm)   { showMsg('signup', 'Passwords do not match.', 'error'); return; }

  setLoading('signup-btn', true);

  try {
    const res = await fetch(`${API}/register`, {
      method:      'POST',
      credentials: 'include',
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ email: username, password }),
    });
    const data = await res.json();

    if (data.success) {
      showMsg('signup', 'Account created! Please log in.', 'success');
      setTimeout(() => {
        setLoading('signup-btn', false);
        goStep(1);
        document.getElementById('s-username').value = '';
        switchTab('login');
        document.getElementById('l-username').value = username;
      }, 1500);
    } else {
      showMsg('signup', data.message || 'Registration failed.', 'error');
      setLoading('signup-btn', false);
    }
  } catch (err) {
    showMsg('signup', 'Cannot reach server.', 'error');
    setLoading('signup-btn', false);
  }
}

// ── Keyboard shortcuts ────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const authView = document.getElementById('auth-form-view');
  if (!authView || authView.style.display === 'none') return;

  const loginHidden = document.getElementById('login-panel').classList.contains('hidden');
  if (!loginHidden) doLogin();
  else if (currentSignupStep === 1) signupStep1();
  else signupStep2();
});

// ── Logout ────────────────────────────────────────────────────────────────
window.rxLogout = async function () {
  try {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
  } catch (e) { /* ignore */ }

  // Clean up HybridData cache
  try {
    if (window.HybridData && typeof window.HybridData.onLogout === 'function') {
      window.HybridData.onLogout();
    }
  } catch (e) { /* ignore */ }

  // Clear local auth cache
  localStorage.removeItem('rx_token');
  localStorage.removeItem('rx_user');

  // Return to app as guest — no forced login wall
  window.location.replace(HOME);
};
