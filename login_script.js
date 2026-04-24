/**
 * login_script.js — RoadmapX Login/Signup UI (UPDATED)
 *
 * CHANGE: After a successful login, we now call
 *   HybridData.onLoginSuccess(username)
 * which migrates any guest localStorage data to the backend
 * before redirecting. This replaces the old NotesBridge call.
 *
 * BUG FIX: Original code called window.NotesBridge.syncAfterLogin()
 * before notes_storage.js had loaded, causing a TypeError.
 * Now we use HybridData which is guaranteed to be ready (loaded
 * before this script in index.html).
 */

const API  = 'https://roadmapx-backend-3qmc.onrender.com';
const HOME = 'index.html';

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

document.querySelectorAll('.eye-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const inp = document.getElementById(btn.dataset.target);
    if (!inp) return;
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.classList.toggle('showing', show);
  });
});

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
      credentials: 'include',  // Important: lets the browser receive the session cookie
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success) {
      showMsg('login', 'Access granted. Syncing data...', 'success');

      // FIX: Use HybridData to migrate guest localStorage → backend.
      // This is the proper replacement for the old NotesBridge call.
      // It awaits the migration before redirecting so no data is lost.
      if (window.HybridData) {
        await window.HybridData.onLoginSuccess(data.username);
      } else {
        // Fallback if hybrid_data.js somehow isn't loaded
        localStorage.setItem('rx_token', 'true');
        localStorage.setItem('rx_user', data.username);
        // Legacy notes sync (backwards compat)
        if (window.NotesBridge) window.NotesBridge.syncAfterLogin(data.username);
      }

      showMsg('login', 'Access granted. Redirecting...', 'success');
      setTimeout(() => { window.location.href = HOME; }, 700);
    } else {
      showMsg('login', data.message || 'Login failed.', 'error');
      setLoading('login-btn', false);
    }
  } catch (err) {
    showMsg('login', 'Cannot reach server.', 'error');
    setLoading('login-btn', false);
  }
}

let currentSignupStep = 1;

function goStep(n) {
  hideMsg('signup');
  document.getElementById('s-step-' + currentSignupStep).classList.remove('active');
  document.getElementById('s-step-' + n).classList.add('active');
  const dot1 = document.getElementById('sdot-1');
  const dot2 = document.getElementById('sdot-2');
  dot1.classList.remove('active', 'done');
  dot2.classList.remove('active', 'done');
  if (n === 1) dot1.classList.add('active');
  if (n === 2) { dot1.classList.add('done'); dot2.classList.add('active'); }
  document.getElementById('sline-1').classList.toggle('done', n > 1);
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

async function signupStep2() {
  hideMsg('signup');
  const username = document.getElementById('s-username').value.trim();
  const password = document.getElementById('s-password').value;
  const confirm  = document.getElementById('s-confirm').value;
  if (!password || !confirm) { showMsg('signup', 'Fill both password fields.', 'error'); return; }
  if (password.length < 6)   { showMsg('signup', 'Password must be 6+ characters.', 'error'); return; }
  if (password !== confirm)  { showMsg('signup', 'Passwords do not match.', 'error'); return; }

  setLoading('signup-btn', true);
  try {
    const res = await fetch(`${API}/register`, {
      method:      'POST',
      credentials: 'include',
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      showMsg('signup', 'Account created! Please login.', 'success');
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

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const loginHidden = document.getElementById('login-panel').classList.contains('hidden');
  if (!loginHidden) doLogin();
  else if (currentSignupStep === 1) signupStep1();
  else signupStep2();
});

// Logout helper — now also calls HybridData.onLogout() to clear the cache
window.rxLogout = async function () {
  try {
    // Tell the backend to destroy the session
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
  } catch (e) { /* ignore network error on logout */ }

  if (window.HybridData) window.HybridData.onLogout();

  localStorage.removeItem('rx_token');
  localStorage.removeItem('rx_user');
  window.location.replace('login.html');
};
