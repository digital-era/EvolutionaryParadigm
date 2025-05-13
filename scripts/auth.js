function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h & 0x7fffffff;
}

// Clean input to remove invisible characters
function sanitizeInput(input) {
  return input.trim().replace(/\s+/g, '');
}

function signup() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]')?.value;

  if (!token) {
    alert('请通过 Turnstile 验证！');
    console.error('Turnstile token missing, check Sitekey or network');
    return;
  }
  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) {
    alert('用户已存在！');
    return;
  }

  users[username] = { id: hash(username + Date.now()), password: hash(password) };
  localStorage.setItem('users', JSON.stringify(users));
  login();
}

function login() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]')?.value;

  if (!token) {
    alert('请通过 Turnstile 验证！');
    console.error('Turnstile token missing, check Sitekey or network');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (!users[username]) {
    alert('用户不存在，请先注册！');
    return;
  }
  if (users[username].password !== hash(password)) {
    alert('密码错误，请重试！');
    return;
  }

  const expires = remember ? 7 : 1;
  document.cookie = `auth=${users[username].id};max-age=${expires * 86400};path=/`;
  alert('登录成功！');
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
    authLink.innerHTML = `<a href="#" onclick="logout()">退出</a>`;
    const restricted = document.getElementById('restricted-content');
    if (restricted) restricted.style.display = 'block';
  } else {
    authLink.innerHTML = `<a href="login.html">登录</a>`;
    if (window.location.pathname.includes('ai-learning.html')) {
      window.location.href = 'login.html';
    }
  }
}

// Show/hide password
function togglePassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

window.onload = checkAuth;
