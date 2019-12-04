import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSession } from '../utils/session.js';
import redirect from '../app.js';
import { updateUser, getLoggedInUser } from '../services/users.js';

const account = async () => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  const userId = user._id;
  const userName = user.firstName;
  const lastname = user.lastName;
  const city = user.city;
  const email = user.email;

  const handleSubmit = async event => {
    event.preventDefault();
    const newFirstName = event.target.name.value;
    const newLastName = event.target.lastName.value;
    let newCity = event.target.newCity.value;

    const errorDiv = document.querySelector('.account-error');
    if (newCity == 0) {
      newCity = city;
    }
    if (newFirstName.length < 2 || newFirstName == '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a correct name';
    } else if (newLastName.length < 2 || newLastName == '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please write a correct last name';
    } else {
      if (
        newFirstName !== userName ||
        newLastName !== lastname ||
        newCity !== city
      ) {
        try {
          await updateUser(userId, newFirstName, newLastName, newCity);
          errorDiv.style.display = 'inline-block';
          errorDiv.innerHTML = 'Information updated successfully';
          errorDiv.style.color = 'white';
          errorDiv.style.background = 'green';
          document.querySelector('#city').value = newCity;
        } catch (err) {
          errorDiv.style.display = 'inline-block';
        }
      } else {
        errorDiv.style.display = 'inline-block';
        errorDiv.innerHTML = 'Non information was updated';
      }
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    }
  };

  return html`
    ${user
      ? html`
          <div class="box accountBox">
            <h2>Account Information</h2>
            <form @submit=${handleSubmit} id="loginForm">
              <div class="inputBox">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  onkeyup="this.setAttribute('value', this.value);"
                  value="${userName}"
                />
                <label>Name</label>
              </div>
              <div class="inputBox">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  required
                  onkeyup="this.setAttribute('value', this.value);"
                  value="${lastname}"
                />
                <label>Surname</label>
              </div>
              <div class="inputBox">
                <input
                  id="city"
                  type="text"
                  name="actualCity"
                  required
                  onkeyup="this.setAttribute('value', this.value);"
                  value="${city}"
                  readonly
                />
                <label>City</label>
              </div>
              <div class="select-city">
                <label class="labelTittle">Change City</label>
                <select name="newCity">
                  id="city"
                  <option value="0">Select City:</option>
                  <option value="Artigas">Artigas</option>
                  <option value="Canelones">Canelones</option>
                  <option value="Cerro Largo">Cerro Largo</option>
                  <option value="Colonia">Colonia</option>
                  <option value="Durazno">Durazno</option>
                  <option value="Flores">Flores</option>
                  <option value="Florida">Florida</option>
                  <option value="Lavalleja">Lavalleja</option>
                  <option value="Maldonado">Maldonado</option>
                  <option value="Montevideo">Montevideo</option>
                  <option value="Paysandú">Paysandú</option>
                  <option value="Río Negro">Río Negro</option>
                  <option value="Rivera">Rivera</option>
                  <option value="Rocha">Rocha</option>
                  <option value="San José">San José</option>
                  <option value="Soriano">Soriano</option>
                  <option value="Salto">Salto</option>
                  <option value="Tacuarembó">Tacuarembó</option>
                  <option value="Treinta y Tres">Treinta y Tres</option>
                </select>
              </div>
              <div class="inputBox">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  onkeyup="this.setAttribute('value', this.value);"
                  value="${email}"
                  readonly
                />
                <label>Email</label>
              </div>
              <input
                type="submit"
                name="save"
                value="Save"
                class="saveAccount"
              />
              <input
                type="submit"
                name="cancel"
                value="Cancel"
                class="cancelAccount"
                @click=${e => redirect('/home')}
              />
            </form>
            <div class="account-error">
              There was a problem with the update.
            </div>
          </div>
          <div></div>
        `
      : html`
          ${redirect('/home')}
        `}
  `;
};
export default account;
