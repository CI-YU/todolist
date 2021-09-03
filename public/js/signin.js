document.querySelector('#signin').addEventListener('click', () => {
  const name = document.querySelector('#username').value;
  const account = document.querySelector('#account').value;
  const password = document.querySelector('#password').value;
  console.log(account);
  console.log(password);
  fetch('./users', {
    method: 'post',
    body: JSON.stringify({ name, account, password }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => {
      return res.text();
    })
    .then((result) => {
      alert(result);
    });
});

document.querySelector('#togglePassword').addEventListener('click', () => {
  const passwordInput = document.querySelector('#password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});
