let turnstileToken = null;

function initTurnstile() {
  if (window.turnstile && !turnstileToken) {
    window.turnstile.render('.cf-turnstile', {
      sitekey: '0x4AAAAAAXXXX',
      callback: function(token) {
        turnstileToken = token;
      },
      'error-callback': function() {
        alert('Turnstile 验证失败，请检查网络或稍后重试！');
        turnstileToken = null;
      },
      'timeout-callback': function() {
        alert('Turnstile 验证超时，请刷新页面！');
        turnstileToken = null;
      }
    });
  }
}

// 页面加载时初始化 Turnstile
document.addEventListener('DOMContentLoaded', initTurnstile);

// 清理输入中的不可见字符
function sanitizeInput(input) {
  return input.trim().replace(/\s+/g, '');
}

function signup() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;

  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  if (!turnstileToken) {
    alert('请完成 Turnstile 验证！');
    initTurnstile();
    return;
  }

  if (localStorage.getItem('user_' + username)) {
    alert('用户名已存在，请选择其他用户名！');
    return;
  }

  localStorage.setItem('user_' + username, JSON.stringify({ password, remember }));
  alert('注册成功！请在其他设备上使用相同用户名和密码登录。');
  turnstileToken = null; // 重置 token
  window.turnstile.reset('.cf-turnstile');
}

function login() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;

  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  if (!turnstileToken) {
    alert('请完成 Turnstile 验证！');
    initTurnstile();
    return;
  }

  const user = JSON.parse(localStorage.getItem('user_' + username));
  if (!user) {
    alert('用户不存在，请先注册！');
    turnstileToken = null;
    window.turnstile.reset('.cf-turnstile');
    return;
  }

  if (user.password === password) {
    if (remember) {
      localStorage.setItem('loggedInUser', username);
    }
    alert('登录成功！');
    window.location.href = 'ai-learning.html';
  } else {
    alert('密码错误，请重试！');
    turnstileToken = null;
    window.turnstile.reset('.cf-turnstile');
  }
}

// 显示/隐藏密码
function togglePassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}
