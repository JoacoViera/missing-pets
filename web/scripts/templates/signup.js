/* eslint-disable no-undef */
import { html } from '../../node_modules/lit-html/lit-html.js';
import { createUser } from '../services/users.js';
import { logIn } from '../services/auth.js';

const signup = async () => {
  const handleSubmit = async event => {
    event.preventDefault();
    const errorDiv = document.querySelector('.signup-error');
    errorDiv.innerHTML = '';

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const city = event.target.city.value;
    const terms = document.querySelector('.terms').checked;

    if (firstName.length < 2 || firstName == '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a correct name';
    } else if (lastName.length < 2 || lastName == '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a correct last name';
    } else if (city == 0) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please select a City';
    } else if (email == '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a correct mail address';
      document.querySelector('#email').value = '';
    } else if (!(email.includes('.com') || email.includes('.net'))) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a correct email address.';
    } else if (password == '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a password';
    } else if (password.length < 6) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML =
        'Please write a password with more than 8 characters.';
    } else if (password !== confirmPassword) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Your password does not match';
      document.querySelector('#password').value = '';
      document.querySelector('#confirmPassword').value = '';
    } else if (!terms) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You have to accept the terms and conditions.';
    } else {
      await createUser(email, password, firstName, lastName, city);
      await logIn(email, password);
    }
  };

  return html`
    <div class="form-style">
      <h1>Sign Up Now!<span>Sign up and find or post your found pet!</span></h1>
      <form @submit=${handleSubmit}>
        <div class="section"><span>1</span>First Name, Last Name & Address</div>
        <div class="inner-wrap">
          <label
            >Your First Name <input id="firstName" type="text" name="firstName"
          /></label>
          <label
            >Your Last Name <input id="lastName" type="text" name="lastName"
          /></label>
          <label
            >City
            <div class="custom-select" style="width:200px;">
              <select name="city">
                <option value="0">Select City:</option>
                <option value="Montevideo">Montevideo</option>
                <option value="Canelones">Canelones</option>
                <option value="Maldonado">Maldonado</option>
                <option value="Rocha">Rocha</option>
                <option value="Lavalleja">Lavalleja</option>
                <option value="Florida">Florida</option>
                <option value="Flores">Flores</option>
                <option value="San José">San José</option>
                <option value="Colonia">Colonia</option>
                <option value="Soriano">Soriano</option>
                <option value="Treinta y Tres">Treinta y Tres</option>
                <option value="Durazno">Durazno</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Cerro Largo">Cerro Largo</option>
                <option value="Tacuarembó">Tacuarembó</option>
                <option value="Paysandú">Paysandú</option>
                <option value="Salto">Salto</option>
                <option value="Rivera">Rivera</option>
                <option value="Artigas">Artigas</option>
              </select>
            </div></label
          >
        </div>
        <div class="section"><span>2</span>Email</div>
        <div class="inner-wrap">
          <label
            >Email Address <input type="email" id="email" name="email"
          /></label>
        </div>

        <div class="section"><span>3</span>Passwords</div>
        <div class="inner-wrap">
          <label
            >Password <input type="password" id="password" name="password"
          /></label>
          <label
            >Confirm Password
            <input type="password" id="confirmPassword" name="confirmPassword"
          /></label>
        </div>
        <div class="button-section">
          <input type="submit" value="Sign up" />
          <span class="privacy-policy">
            <input type="checkbox" id="terms" class="terms" name="terms" />You
            agree to our Terms and Policy.
          </span>
        </div>
        <div class="signup-error">
          There was a problem with your login
        </div>
      </form>
    </div>
  `;
};

export default signup;
