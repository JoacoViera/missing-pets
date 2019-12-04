/* eslint-disable prettier/prettier */
import { html } from '../../node_modules/lit-html/lit-html.js';

import { createPetPost } from '../services/pets.js';
import { getSession } from '../utils/session.js';
import { getLoggedInUser } from '../services/users.js';
import redirect from '../app.js';

let url = '';
const readURL = async input => {
  if (typeof input !== 'undefined') {
    if (input.srcElement.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('petImg').src = e.target.result;
        url = e.target.result;
      };
      reader.readAsDataURL(input.srcElement.files[0]);
    }
  }
};
const posts = async () => {
  const handleSubmit = async event => {
    event.preventDefault();
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = '';

    let error = false;
    const found = event.target.found.checked;
    const missing = event.target.missing.checked;
    const dateFM = event.target.foundMissing.value;
    const generalDesc = event.target.description.value;
    const animalSpecies = event.target.animalSpecies.value;
    const address = event.target.address.value;
    const breed = event.target.breed.value;
    const name =
      event.target.name.value === '' ? 'NoName' : event.target.name.value;
    const gender = event.target.gender.value;
    const desexed = event.target.desexed.value;
    const age = event.target.age.value;
    const color = event.target.color.value;
    const collar =
      event.target.collar.value === '' ? 'NoCollar' : event.target.collar.value;
    const photoUrl = url;
    const session = getSession();
    const user = session ? await getLoggedInUser() : null;
    const userEmail = user.email;
    const city = event.target.city.value;

    if (!found && !missing) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML =
        'You must select if you are looking for or lost a pet';
      error = true;
    } else if (dateFM === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must select a date';
      error = true;
    } else if (generalDesc === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must write a description';
      error = true;
    } else if (address === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must write a lost/found address';
      error = true;
    } else if (animalSpecies === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must write a animal species';
      error = true;
    } else if (breed === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must write a breed';
      error = true;
    } else if (gender === 0) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must select a gender';
      error = true;
    } else if (desexed === 0) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must select if is desexed';
      error = true;
    } else if (age === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must select an age';
      error = true;
    } else if (url === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must select an image';
      error = true;
    } else if (color === '') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must write a pet color';
      error = true;
    } else if (city === 0) {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please select a City';
      error = true;
    }

    if (!error) {
      try {
        let isMissing;
        if (missing) {
          isMissing = true;
        } else {
          isMissing = false;
        }
        await createPetPost(
          userEmail,
          dateFM,
          generalDesc,
          address,
          isMissing,
          city,
          animalSpecies,
          breed,
          name,
          gender,
          desexed,
          age,
          color,
          collar,
          photoUrl,
        );
        redirect('/home');
      } catch (err) {
        console.log('error en la creacion');
        console.log(err);
      }
    }
  };

  return html`
    <div class="box-create-post">

      <h2>Generate New Post</h2>
      
      <div id="errorDiv" class="signup-error">
        There was a problem with your post
      </div>
      
      <form id="generatePost" @submit=${handleSubmit}>
        <div class="choice">
          <label class="label-post" for="missing">
            Missing Pet
          </label>
          <input
            type="radio"
            class="radio"
            name="x"
            value="missing"
            id="missing"
          />

          <label class="label-post" for="found"> Found Pet</label>

          <input type="radio" class="radio" name="x" value="found" id="found" />
        </div>

        <div class="post-class">
          <label class="label-post" for="foundMissing">
            Found/Missing Date
          </label>
          <input type="date" name="foundMissing" id="foundMissing" />
        </div>

        <div class="post-class">
          <label class="label-post" for="description">
            General Description
          </label>
            <textarea id="description"></textarea>
        </div>

        <div class="post-class select-choice">
          <label class="label-post" for="customSelect">
            Found/Missing Department
          </label>
          
          <select id="customSelect" name="city">
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
          <input type="text" name="address" id="address" />
          <label for="address"> Lost/Found Address </label>
        </div>

        <div class="inputBox">
          <input type="text" name="animalSpecies" id="animalSpecies" />
          <label for="animalSpecies"> Animal Species</label>
        </div>

        <div class="inputBox">
          <input type="text" name="breed" id="breed" />
          <label class="label-post" for="breed"> Breed</label>
        </div>

        <div class="inputBox">
          <input type="text" name="name" id="name" />
          <label class="label-post" for="name"> Name</label>
        </div>

        <div class="select-choice">
          <select
            style="width: 100%;"
            id="gender"
            name="gender"
            style="width:180px;margin-right: 80px;"
          >
            <option value="0">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="select-choice" style="width:100;">
          <select
            style="width: 100%;"
            id="desexed"
            name="desexed"
            style="width:180px;margin-right: 80px;"
          >
            <option value="0">Desexed</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="inputBox">
          <input type="number" name="age" id="age" min="1" max="20" />
          <label class="label-post" for="age"> Age</label>
        </div>

        <div class="inputBox">
          <input type="text" name="color" id="color" />
          <label class="label-post" for="color"> Color</label>
        </div>

        <div class="inputBox">
          <input type="text" name="collar" id="collar" />
          <label class="label-post" for="collar"> Collar</label>
        </div>

        <input type="file" @change=${e => readURL(e)} />
        <img
          id="petImg"
          src="http://placehold.it/180"
          alt="your
        image"
          style="width: 180; height: 180px;"
        />
        <input type="submit" name="posts" value="Generate Post" />
        <a href="/home" name="back" value="back">
          back
        </a>
      </form>
    </di>
    <div></div>
  `;
};

export default posts;
