document.querySelector('#signin').addEventListener('click', () => {
  const account = document.querySelector('#account').value;
  const password = document.querySelector('#password').value;
  console.log(account);
  console.log(password);
});

document.querySelector('#togglePassword').addEventListener('click', () => {
  const passwordInput = document.querySelector('#password');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});
