let isRendering = false;

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h & 0x7fffffff;
}

// 清理输入中的不可见字符
function sanitizeInput(input) {
  return input.trim().replace(/\s+/g, '');
}

function renderTurnstile(callback) {
  if (isRendering) return; // 防止重复渲染
  isRendering = true;

  if (!window.turnstile) {
    alert('无法加载 Turnstile 脚本，请检查网络或禁用广告拦截！');
    isRendering = false;
    return;
  }

  const turnstileElement = document.querySelector('.cf-turnstile');
  if (!turnstileElement) {
    alert('Turnstile 元素未找到，请刷新页面！');
    isRendering = false;
    return;
  }

  window.turnstile.render(turnstileElement, {
    sitekey: 'YOUR_TURNSTILE_SITEKEY', // 替换为真实 Sitekey
    callback: function(token) {
      callback(token);
      window.turnstile.reset(turnstileElement);
      isRendering = false;
    },
    'error-callback': function(error) {
      console.error('Turnstile 错误:', error);
      alert('Turnstile 验证失败：' + (error || '未知错误') + '，请检查 Sitekey 或网络！');
      window.turnstile.reset(turnstileElement);
      isRendering = false;
    },
    'timeout-callback': function() {
      console.warn('Turnstile 超时');
      alert('Turnstile 验证超时，请刷新页面！');
      window.turnstile.reset(turnstileElement);
      isRendering = false;
    }
  });
}

function signup() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;

  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  renderTurnstile(function(token) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      alert('用户已存在！');
    } else {
      users[username] = { id: hash(username + Date.now()), password: hash(password), remember };
      localStorage.setItem('users', JSON.stringify(users));
      login();
    }
  });
}

function login() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;

  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  renderTurnstile(function(token) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[username]) {
      alert('用户不存在，请先注册！');
    } else if (users[username].password !== hash(password)) {
      alert('密码错误，请重试！');
    } else {
      const expires = remember ? 7 : 1;
      document.cookie = `auth=${users[username].id};max-age=${expires * 86400};path=/`;
      alert('登录成功！');
      window.location.href = 'index.html';
    }
  });
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

// 显示/隐藏密码
function togglePassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

window.onload = checkAuth;
