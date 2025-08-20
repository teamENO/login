async function loadCSV() {
  const response = await fetch('users.csv');
  const text = await response.text();
  const lines = text.trim().split('\n').slice(1);
  const users = {};
  lines.forEach(line => {
    const [username, password] = line.split(',');
    users[username] = password;
  });
  return users;
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hashed = await sha256(password);
  const users = await loadCSV();

  if (users[username] === hashed) {
    document.getElementById('result').textContent = '✅ ログイン成功！';
  } else {
    document.getElementById('result').textContent = '❌ 認証失敗';
  }
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
