document.querySelector('#togglePassword').addEventListener('click', () => {
  const passwordInput = document.querySelector('#password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

document.querySelector('#login').addEventListener('click', () => {
  const account = document.querySelector('#account').value;
  const password = document.querySelector('#password').value;
  fetch('./login', {
    method: 'post',
    body: JSON.stringify({ account, password }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((res) => {
      return res.text();
    })
    .then((result) => {
      console.log(result);
    });
});
