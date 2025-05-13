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

  if (window.turnstile) {
    window.turnstile.render('.cf-turnstile', {
      sitekey: '0x4AAAAAABc5G-f32NFLbksc', // 替换为真实 Sitekey
      callback: function(token) {
        if (localStorage.getItem('user_' + username)) {
          alert('用户名已存在，请选择其他用户名！');
        } else {
          localStorage.setItem('user_' + username, JSON.stringify({ password, remember }));
          alert('注册成功！请在其他设备上使用相同用户名和密码登录。');
        }
        window.turnstile.reset('.cf-turnstile');
      },
      'error-callback': function(error) {
        console.error('Turnstile 错误:', error);
        alert('Turnstile 验证失败：' + (error || '未知错误') + '，请检查网络或稍后重试！');
      },
      'timeout-callback': function() {
        console.warn('Turnstile 超时');
        alert('Turnstile 验证超时，请刷新页面！');
      }
    });
  } else {
    alert('无法加载 Turnstile 脚本，请检查网络或禁用广告拦截！');
  }
}

function login() {
  const username = sanitizeInput(document.getElementById('username').value);
  const password = sanitizeInput(document.getElementById('password').value);
  const remember = document.getElementById('remember').checked;

  if (!username || !password) {
    alert('请输入用户名和密码！');
    return;
  }

  if (window.turnstile) {
    window.turnstile.render('.cf-turnstile', {
      sitekey: 'YOUR_TURNSTILE_SITEKEY', // 替换为真实 Sitekey
      callback: function(token) {
        const user = JSON.parse(localStorage.getItem('user_' + username));
        if (!user) {
          alert('用户不存在，请先注册！');
        } else if (user.password === password) {
          if (remember) {
            localStorage.setItem('loggedInUser', username);
          }
          alert('登录成功！');
          window.location.href = 'ai-learning.html';
        } else {
          alert('密码错误，请重试！');
        }
        window.turnstile.reset('.cf-turnstile');
      },
      'error-callback': function(error) {
        console.error('Turnstile 错误:', error);
        alert('Turnstile 验证失败：' + (error || '未知错误') + '，请检查网络或稍后重试！');
      },
      'timeout-callback': function() {
        console.warn('Turnstile 超时');
        alert('Turnstile 验证超时，请刷新页面！');
      }
    });
  } else {
    alert('无法加载 Turnstile 脚本，请检查网络或禁用广告拦截！');
  }
}

// 显示/隐藏密码
function togglePassword() {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}
