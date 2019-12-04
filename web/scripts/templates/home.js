/* eslint-disable no-undef */
import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { removePostId } from '../utils/session.js';
import { getAllPosts, getPostsByCity } from '../services/pets.js';
import redirect from '../app.js';

const showSinglePost = petPost => {
  return html`
    ${petPost.activePost
      ? html`
          <div
            class="petPost + name-${petPost.petCharacteristics.name.toLowerCase()} + breed-${petPost.petCharacteristics.breed.toLowerCase()} + animal-${petPost.petCharacteristics.animalSpecies.toLowerCase()}"
          >
            <h3 class="petName">
              ${petPost.petCharacteristics.name}
            </h3>
            <div class="petPhoto">
              <img
                src=${petPost.petCharacteristics.photoUrl}
                class="petPhoto lit-route-link"
                data-to="/petPost/${petPost._id}"
              />
            </div>
            <div class="basicPetInfo">
              ${petPost.petCharacteristics.breed} -
              ${petPost.isMissing
                ? html`
                    Missing!
                  `
                : html`
                    Recently found!
                  `}
            </div>
          </div>
        `
      : html``}
  `;
};

const getLocation = () => {
  const city = document.getElementById('select').value;
  window.localStorage.setItem('city', city);
  document.getElementById('myModal').style.display = 'none';
  redirect('/home');
};
const cancelLocation = () => {
  window.localStorage.setItem('city', '0');
  document.getElementById('myModal').style.display = 'none';
  redirect('/home');
};

const askLocation = () => {
  if (window.localStorage.getItem('city') !== 'none') {
    return html``;
  }
  return html`
    <div id="myModal" class="modal">
      <div class="modal-content">
        <select id="select" name="city">
          <option value="0">Select City:</option>
          <option value="Montevideo">Montevideo</option>
          <option value="Canelones">Canelones</option>
          <option value="Maldonado">Maldonado</option>
          <option value="Rocha">Rocha</option>
          <option value="Lavalleja">Lavalleja</option>
          <option value="Florida">Florida</option>
          <option value="Flores">Flores</option>
          <option value="San">San José</option>
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
          <option value="Artigas">Artigas</option> </select
        ><br />
        <button id="acceptBtn" class="modalBtn" @click=${getLocation}>
          Accept
        </button>
        <button id="cancelBtn" class="modalBtn" @click=${cancelLocation}>
          Cancel
        </button>
      </div>
    </div>
  `;
};

const changeLocation = () => {
  window.localStorage.setItem('city', 'none');
  redirect('/home');
};

const showPosts = async () => {
  const cityFilter = window.localStorage.getItem('city');
  let pets;
  if (cityFilter && cityFilter !== '0') {
    pets = await getPostsByCity(cityFilter);
  } else {
    pets = await getAllPosts();
  }

  return html`
    ${pets[0]
      ? html`
          <ul>
            ${repeat(pets, pet => pet.id, pet => showSinglePost(pet))}
          </ul>
        `
      : html`
          <div class="noPets">No Pets found</div>
        `}
  `;
};

const home = async () => {
  removePostId();
  const handleSubmit = async event => {
    event.preventDefault();
    const search = event.target.searchbar.value.toLowerCase();
    const inputOptions = document.querySelectorAll('.inputRad');
    const pets = document.querySelectorAll('.petPost');
    const errorDiv = document.querySelector('.error-post');
    pets.forEach(p => {
      p.style.display = 'none';
    });
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const rad of inputOptions) {
        if (rad.checked) {
          if (rad.value == 'all') {
            errorDiv.style.display = 'none';
            pets.forEach(post => {
              post.style.display = 'inline-block';
            });
          } else if (rad.value == 'animal') {
            const postsFound = document.querySelectorAll('.animal-' + search);
            if (postsFound.length > 0) {
              errorDiv.style.display = 'none';
              postsFound.forEach(post => {
                post.style.display = 'inline-block';
              });
            } else {
              errorDiv.style.display = 'inline-block';
            }
          } else if (rad.value == 'breed') {
            const postsFound = document.querySelectorAll('.breed-' + search);
            if (postsFound.length > 0) {
              errorDiv.style.display = 'none';
              postsFound.forEach(post => {
                post.style.display = 'inline-block';
              });
            } else {
              errorDiv.style.display = 'inline-block';
            }
          } else {
            const postsFound = document.querySelectorAll('.name-' + search);
            if (postsFound.length > 0) {
              postsFound.forEach(post => {
                post.style.display = 'inline-block';
              });
            } else {
              errorDiv.style.display = 'inline-block';
            }
          }
        }
      }
    } catch (err) {
      errorDiv.style.display = 'inline-block';
    }
  };

  return html`
    ${askLocation()}
    <h1 class="title">Missing Pets</h1>
    <div class="filter-bar">
      <form @submit=${handleSubmit} action="">
        <div class="search-bar">
          <input
            type="text"
            class="search-file"
            name="searchbar"
            id="search-bar"
            placeholder="Search"
          />
        </div>
        <div class="filter-options">
          <div class="radOption">
            <input
              type="radio"
              class="inputRad form-radio"
              name="filterOption"
              value="all"
              checked
            />
            <label>All</label>
          </div>
          <div class="radOption">
            <input
              type="radio"
              class="inputRad form-radio"
              name="filterOption"
              value="animal"
            />
            <label>Animal</label>
          </div>
          <div class="radOption">
            <input
              type="radio"
              class="inputRad form-radio"
              name="filterOption"
              value="name"
            />
            <label>Name</label>
          </div>
          <div class="radOption">
            <input
              type="radio"
              class="inputRad form-radio"
              name="filterOption"
              value="breed"
            />
            <label>Breed</label>
          </div>
        </div>
      </form>
      <div class="error-post">
        <h1>Any post found !</h1>
      </div>
    </div>
    <div class="homeBody">
      <div class="post">${await showPosts()}</div>
      <button type="button" class="changeLocBtn" @click=${changeLocation}>
        Want to see posts from another city?<br />Change your location here!
      </button>
    </div>
  `;
};
export default home;
