function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h & 0x7fffffff;
}

function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]').value;
  if (!token) return alert('请通过验证！');
  if (!username || !password) return alert('请输入用户名和密码！');
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) return alert('用户已存在！');
  users[username] = { id: hash(username + Date.now()), password: hash(password) };
  localStorage.setItem('users', JSON.stringify(users));
  login();
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]').value;
  if (!token) return alert('请通过验证！');
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (!users[username] || users[username].password !== hash(password)) return alert('用户名或密码错误！');
  const expires = remember ? 7 : 1;
  document.cookie = `auth=${users[username].id};max-age=${expires * 86400};path=/`;
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

window.onload = checkAuth;
