import { html } from '../../node_modules/lit-html/lit-html.js';

import { logIn } from '../services/auth.js';

const login = async () => {
  const handleSubmit = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // await logIn(email, password);
    const errorDiv = document.querySelector('.login-error');
    try {
      await logIn(email, password);
    } catch (err) {
      errorDiv.style.display = 'inline-block';
      document.getElementById("loginForm").reset();
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    }
  };

  return html`
    <div class="box">
      <h2>Login</h2>
      <form @submit=${handleSubmit} id="loginForm">
        <div class="inputBox">
          <input
            id="email"
            type="email"
            name="email"
            required
            onkeyup="this.setAttribute('value', this.value);"
            value=""
          />
          <label>Username</label>
        </div>
        <div class="inputBox">
          <input
            id="password"
            type="password"
            name="password"
            required
            value=""
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <label>Password</label>
        </div>
        <input type="submit" name="sign-in" value="Sign In" />
        <a href="/signup" name="sign-up" value="Sign Up">
          Signup
        </a>
        <div class="login-error">
          There was a problem with your login
        </div>
      </form>
    </div>
    <div></div>
  `;
};

export default login;
