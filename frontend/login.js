const Semail = document.querySelector('.sign-email-input');
const Susername = document.querySelector('.sign-username-input');
const Spassword = document.querySelector('.sign-pass-input');
const email = document.querySelector('.log-email-input');
const password = document.querySelector('.log-pass-input');
const loginBtn = document.querySelector('.login');
const signupBtn = document.querySelector('.signup');
const showLogin = document.querySelector(".to-login");
const showSignup = document.querySelector(".to-signup");

const loginContainer = document.querySelector(".l-attop ");
const signupContainer = document.querySelector(".s-atbottom ")



loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);

showLogin.addEventListener("click", showLoginFun);
showSignup.addEventListener("click", showSignupFun);

function showLoginFun(){
  loginContainer.classList.add("show-login-signup");
  signupContainer.classList.remove("show-login-signup")
}

function showSignupFun(){
  loginContainer.classList.remove("show-login-signup");
  signupContainer.classList.add("show-login-signup")
}


async function login() {
  try {
    const info = {
      email: email.value,
      password: password.value,
    }
      const response = await fetch('https://notesapp-five-steel.vercel.app/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
      });
      const data = await response.json();
      if (response.ok) {
          // Login successful
          localStorage.setItem('token', data.token);
          // Redirect or perform any other action upon successful login
          console.log('Login successful');
          window.location.href = 'index.html';
      } else {
          // Handle login failure
          console.log(data.message);
      }
  } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
  }
}

// Signup function
async function signup() {
  try {
    const info = {
      email: Semail.value,
      password: Spassword.value,
      username: Susername.value
    }
      const response = await fetch('https://notesapp-five-steel.vercel.app/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
      });
      const data = await response.json();
      if (response.ok) {
          // Signup successful
          localStorage.setItem('token', data.token);
          // Redirect or perform any other action upon successful signup
          console.log('Signup successful');
          window.location.href = 'index.html';
      } else {
          // Handle signup failure
          console.log(data.message);
      }
  } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
  }
}



