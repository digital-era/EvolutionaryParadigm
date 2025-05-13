function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h & 0x7fffffff;
}

// 清理输入中的不可见字符
function sanitizeInput(input) {
  return input.trim().replace(/\s+/g, '');
}

// GitHub 配置
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/digital-era/EvolutionaryParadigm/main/data/users.json';
const GITHUB_API_URL = 'https://api.github.com/repos/digital-era/EvolutionaryParadigm/contents/data/users.json';
const GITHUB_TOKEN = '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'; // 替换为您的 PAT

async function fetchUsers() {
  try {
    const response = await fetch(GITHUB_RAW_URL);
    return response.ok ? await response.json() : {};
  } catch (error) {
    console.error('获取用户数据失败:', error);
    alert('无法连接到用户数据存储，请检查网络！');
    return {};
  }
}

async function saveUsers(users) {
  try {
    // 获取当前文件 SHA（避免覆盖）
    const getResponse = await fetch(GITHUB_API_URL, {
      headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const { sha } = await getResponse.json();

    // 编码内容为 Base64
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(users))));
    const response = await fetch(GITHUB_API_URL, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update users.json',
        content,
        sha
      })
    });
    if (!response.ok) throw new Error('GitHub API 写入失败');
  } catch (error) {
    console.error('保存用户数据失败:', error);
    alert('无法保存用户数据，请稍后重试！');
  }
}

async function signup() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const token = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]')?.value;

  if (!token) {
    alert('请通过 Turnstile 验证！');
    console.error('缺少 Turnstile token，请检查 Sitekey 或网络');
    if (window.turnstile) window.turnstile.reset('.cf-turnstile');
    return;
  }
  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  const users = await fetchUsers();
  if (users[username]) {
    alert('用户已存在！');
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
    alert('请通过 Turnstile 验证！');
    console.error('缺少 Turnstile token，请检查 Sitekey 或网络');
    if (window.turnstile) window.turnstile.reset('.cf-turnstile');
    return;
  }

  const users = await fetchUsers();
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

// 显示/隐藏密码
function togglePassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

// 初始化 Turnstile 并处理错误
document.addEventListener('DOMContentLoaded', () => {
  if (window.turnstile) {
    window.turnstile.render('.cf-turnstile', {
      callback: function(token) {
        console.log('Turnstile 验证通过，token:', token);
      },
      'error-callback': function(error) {
        console.error('Turnstile 错误:', error);
        alert('Turnstile 验证失败：' + (error || '未知错误') + '，请检查 Sitekey 或网络！');
        window.turnstile.reset('.cf-turnstile');
      },
      'timeout-callback': function() {
        console.warn('Turnstile 超时');
        alert('Turnstile 验证超时，请刷新页面！');
        window.turnstile.reset('.cf-turnstile');
      }
    });
  }
});

window.onload = checkAuth;
