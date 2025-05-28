function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h & 0x7fffffff;
}

function sanitizeInput(input) {
  return input.trim().replace(/\s+/g, '');
}

// Translation helper function
function t(key, params = {}) {
  const text = translations[currentLang] && translations[currentLang][key] ? translations[currentLang][key] : key;
  return Object.keys(params).reduce((str, k) => str.replace(`{${k}}`, params[k]), text);
}

const OSS_API_URL = 'https://aiep-users.vercel.app/api/oss-users/oss-users';

async function fetchUsers() {
  try {
    const response = await fetch(OSS_API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(t('auth_fetch_users_error'), error);
    alert(t('auth_fetch_users_alert'));
    return {};
  }
}

async function saveUsers(users) {
  try {
    const response = await fetch(OSS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users })
    });
    if (!response.ok) throw new Error(`OSS API error: HTTP ${response.status}`);
  } catch (error) {
    console.error(t('auth_save_users_error'), error);
    alert(t('auth_save_users_alert'));
  }
}

async function signup() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]')?.value;

  if (!token) {
    alert(t('auth_missing_turnstile_alert'));
    console.error(t('auth_missing_turnstile_error'));
    if (window.turnstile) window.turnstile.reset('.cf-turnstile');
    return;
  }
  if (!username || !password) {
    alert(t('auth_missing_credentials_alert'));
    return;
  }

  const users = await fetchUsers();
  if (users[username]) {
    alert(t('auth_user_exists_alert'));
    return;
  }

  users[username] = { id: hash(username + Date.now()), password: hash(password) };
  await saveUsers(users);
  login();
}

async function login() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]')?.value;

  if (!token) {
    alert(t('auth_missing_turnstile_alert'));
    console.error(t('auth_missing_turnstile_error'));
    if (window.turnstile) window.turnstile.reset('.cf-turnstile');
    return;
  }
  if (!username || !password) {
    alert(t('auth_missing_credentials_alert'));
    return;
  }

  const users = await fetchUsers();
  if (!users[username]) {
    alert(t('auth_user_not_found_alert'));
    return;
  }
  if (users[username].password !== hash(password)) {
    alert(t('auth_invalid_password_alert'));
    return;
  }

  const expires = remember ? 7 : 1;
  document.cookie = `auth=${users[username].id};max-age=${expires * 86400};path=/`;
  alert(t('auth_login_success_alert'));
  window.location.href = 'index.html';
}

function logout() {
  document.cookie = 'auth=;max-age=0;path=/';
  window.location.href = 'index.html';
}

function checkAuth() {
  const cookies = document.cookie.split(';').reduce((acc, c) => {
    const [k, v] = c.trim().split('=');
    acc[k] = v;
    return acc;
  }, {});
  const authLink = document.getElementById('auth-link');
  if (cookies.auth) {
    authLink.innerHTML = `<a href="#" onclick="logout()">${t('auth_logout_link')}</a>`;
    const restricted = document.getElementById('restricted-content');
    if (restricted) restricted.style.display = 'block';
  } 
}

function togglePassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.turnstile) {
    window.turnstile.render('.cf-turnstile', {
      callback: function(token) {
        console.log(t('auth_turnstile_success'), token);
      },
      'error-callback': function(error) {
        console.error(t('auth_turnstile_error'), error);
        alert(t('auth_turnstile_error_alert', { error: error || 'unknown error' }));
        window.turnstile.reset('.cf-turnstile');
      },
      'timeout-callback': function() {
        console.warn(t('auth_turnstile_timeout'));
        alert(t('auth_turnstile_timeout_alert'));
        window.turnstile.reset('.cf-turnstile');
      }
    });
  }
});

window.onload = checkAuth;