/* eslint-disable no-undef */
import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getUserPosts, deletePost } from '../services/pets.js';
import { getSession } from '../utils/session.js';
import { getLoggedInUser } from '../services/users.js';
import redirect from '../app.js';

const acceptDelete = id => {
  deletePost(id);
  document.getElementById(`modal-${id}`).style.display = 'none';
  redirect('/myPosts');
};
const cancelDelete = id => {
  document.getElementById(`modal-${id}`).style.display = 'none';
};

const showModal = id => {
  document.getElementById(`modal-${id}`).style.display = 'block';
};

const confirmDelete = id => {
  return html`
    <div id="myModal" class="modal">
      <div class="modal-content">
        Are you really sure you want to delete this post?<br />
        <button id="acceptBtn" class="modalBtn" @click=${e => acceptDelete(id)}>
          Confirm
        </button>
        <button id="cancelBtn" class="modalBtn" @click=${e => cancelDelete(id)}>
          Cancel
        </button>
      </div>
    </div>
  `;
};

const showSinglePost = petPost => {
  return html`
    ${petPost.activePost
      ? html`
          <div class="hiddenModal" id="modal-${petPost._id}">
            ${confirmDelete(petPost._id)}
          </div>
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
            <button
              type="button"
              class="deletePostBtn"
              @click=${e => showModal(petPost._id)}
            >Delete this post!
            </button>
          </div>
        `
      : html``}
  `;
};

const showPosts = async () => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  const userEmail = user.email;
  const pets = await getUserPosts(userEmail);
  if (pets.length > 0) {
    return html`
      <ul>
        ${repeat(pets, pet => pet.id, (pet, index) => showSinglePost(pet))}
      </ul>
    `;
  } else {
    return html`
      <ul>
        <div class="noPets">
          You haven't entered posts!
        </div>
      </ul>
    `;
  }
};

const myPosts = async () => {
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
    </div>
  `;
};

export default myPosts;
