import { html } from '../../node_modules/lit-html/lit-html.js';
import { updatePetPost } from '../services/pets.js';
import { getPostId, removePostId } from '../utils/session.js';
import redirect from '../app.js';
import { getOnePost } from '../services/pets.js';

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

const showCitySelected = async petInfo => {
  const htmlCities = html`
    ${petInfo.city === 'Montevideo'
      ? html`
          <option value="Montevideo" selected>Montevideo</option>
        `
      : html`
          <option value="Montevideo">Montevideo</option>
        `}
    ${petInfo.city === 'Canelones'
      ? html`
          <option value="Canelones" selected>Canelones</option>
        `
      : html`
          <option value="Canelones">Canelones</option>
        `}
    ${petInfo.city === 'Maldonado'
      ? html`
          <option value="Maldonado" selected>Maldonado</option>
        `
      : html`
          <option value="Maldonado">Maldonado</option>
        `}
    ${petInfo.city === 'Rocha'
      ? html`
          <option value="Rocha" selected>Rocha</option>
        `
      : html`
          <option value="Rocha">Rocha</option>
        `}
    ${petInfo.city === 'Lavalleja'
      ? html`
          <option value="Lavalleja" selected>Lavalleja</option>
        `
      : html`
          <option value="Lavalleja">Lavalleja</option>
        `}
    ${petInfo.city === 'Florida'
      ? html`
          <option value="Florida" selected>Florida</option>
        `
      : html`
          <option value="Florida">Florida</option>
        `}
    ${petInfo.city === 'San José'
      ? html`
          <option value="San José" selected>San José</option>
        `
      : html`
          <option value="San José">San José</option>
        `}
    ${petInfo.city === 'Colonia'
      ? html`
          <option value="Colonia" selected>Colonia</option>
        `
      : html`
          <option value="Colonia">Colonia</option>
        `}
    ${petInfo.city === 'Soriano'
      ? html`
          <option value="Soriano" selected>Soriano</option>
        `
      : html`
          <option value="Soriano">Soriano</option>
        `}
    ${petInfo.city === 'Treinta y Tres'
      ? html`
          <option value="Treinta y Tres" selected>Treinta y Tres</option>
        `
      : html`
          <option value="Treinta y Tres">Treinta y Tres</option>
        `}
    ${petInfo.city === 'Durazno'
      ? html`
          <option value="Durazno" selected>Durazno</option>
        `
      : html`
          <option value="Durazno">Durazno</option>
        `}
    ${petInfo.city === 'Durazno'
      ? html`
          <option value="Río Negro" selected>Río Negro</option>
        `
      : html`
          <option value="Río Negro">Río Negro</option>
        `}
    ${petInfo.city === 'Cerro Largo'
      ? html`
          <option value="Cerro Largo" selected>Cerro Largo</option>
        `
      : html`
          <option value="Cerro Largo">Cerro Largo</option>
        `}
    ${petInfo.city === 'Tacuarembó'
      ? html`
          <option value="Tacuarembó" selected>Tacuarembó</option>
        `
      : html`
          <option value="Tacuarembó">Tacuarembó</option>
        `}
    ${petInfo.city === 'Paysandú'
      ? html`
          <option value="Paysandú" selected>Paysandú</option>
        `
      : html`
          <option value="Paysandú">Paysandú</option>
        `}
    ${petInfo.city === 'Salto'
      ? html`
          <option value="Salto" selected>Salto</option>
        `
      : html`
          <option value="Salto">Salto</option>
        `}
    ${petInfo.city === 'Rivera'
      ? html`
          <option value="Rivera" selected>Rivera</option>
        `
      : html`
          <option value="Rivera">Rivera</option>
        `}
    ${petInfo.city === 'Artigas'
      ? html`
          <option value="Artigas" selected>Artigas</option>
        `
      : html`
          <option value="Artigas">Artigas</option>
        `}
  `;

  return htmlCities;
};

const editPosts = async () => {
  const postId = await getPostId();
  const petInfo = await getOnePost(postId);
  url = petInfo.petCharacteristics.photoUrl;
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
    } else if (gender === '0') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'You must select a gender';
      error = true;
    } else if (desexed === '0') {
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
    } else if (city === '0') {
      errorDiv.style.display = 'inline-block';
      errorDiv.innerHTML = 'Please select a City';
      error = true;
    }
    console.log(city);

    if (!error) {
      try {
        let isMissing;
        if (missing) {
          isMissing = true;
        } else {
          isMissing = false;
        }
        await updatePetPost(
          dateFM,
          generalDesc,
          address,
          isMissing,
          animalSpecies,
          breed,
          name,
          gender,
          desexed,
          age,
          color,
          collar,
          photoUrl,
          city,
          postId,
        );
        removePostId();
        redirect('/home');
      } catch (err) {
        console.log('error en la creacion');
        console.log(err);
      }
    }
  };

  return html`
    <div class="box-create-post">
      <h2>Edit Post</h2>

      <div id="errorDiv" class="signup-error">
        There was a problem with your post
      </div>

      <form id="generatePost" @submit=${handleSubmit}>
        <div class="choice">
          ${petInfo.isMissing
            ? html`
                <label class="label-post" for="missing"> Missing Pet</label>
                <input
                  type="radio"
                  class="radio"
                  name="x"
                  value="missing"
                  id="missing"
                  checked
                />
                <label class="label-post" for="found"> Found Pet</label>
                <input
                  type="radio"
                  class="radio"
                  name="x"
                  value="found"
                  id="found"
                />
              `
            : html`
                <label for="missing"> Missing Pet</label>
                <input
                  type="radio"
                  class="radio"
                  name="x"
                  value="missing"
                  id="missing"
                />
                <label for="found"> Found Pet</label>
                <input
                  type="radio"
                  class="radio"
                  name="x"
                  value="found"
                  id="found"
                  checked
                />
              `}
        </div>
        <div class="post-class">
          <label for="foundMissing">
            Found/Missing Date
          </label>
          <input
            type="date"
            name="foundMissing"
            id="foundMissing"
            value=${petInfo.lostDate.slice(0, 10)}
          />
        </div>
        <div class="post-class">
          <label for="description">
            General Description
          </label>
          <textarea id="description">${petInfo.generalDescription}</textarea>
        </div>
        <div class="post-class select-choice">
          <label for="customSelect">
            Found/Missing City
          </label>
          <select id="customSelect" name="city">
            <option value="0"> Select City:</option>
            ${await showCitySelected(petInfo)}
          </select>
        </div>
        <div class="post-class">
          <label  for="address"> Lost/Found Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value="${petInfo.lostAddress}"
          />
        </div>
        <div class="post-class">
          <label for="animalSpecies"> Animal Species</label>
          <input
            type="text"
            name="animalSpecies"
            value="${petInfo.petCharacteristics.animalSpecies}"
            id="animalSpecies"
          />
        </div>
        <div class="post-class">
          <label for="breed"> Breed</label>
          <input
            type="text"
            name="breed"
            value="${petInfo.petCharacteristics.breed}"
            id="breed"
          />
        </div>
        <div class="post-class">
          <label for="name"> Name</label>
          <input
            type="text"
            name="name"
            value="${petInfo.petCharacteristics.name}"
            id="name"
          />
        </div>
        <div class="select-choice post-class">
          <label for="name">Gender</label>
          <select
            style="width: 100%;"
            id="gender"
            name="gender"
            style="width:180px;margin-right: 80px;"
          >
            <option value="0">Gender</option>
            ${petInfo.petCharacteristics.gender === 'male'
              ? html`
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                `
              : html`
                  <option value="male">Male</option>
                  <option value="female" selected>Female</option>
                `}
          </select>
        </div>
        <div class="post-class select-choice">
          <label>Desexed</label>
          <select
            style="width: 100%;"
            id="desexed"
            name="desexed"
            style="width:180px;margin-right: 80px;"
          >
            <option value="0">Desexed</option>
            ${petInfo.petCharacteristics.desexed === 'true'
              ? html`
                  <option value="true" selected>Yes</option>
                  <option value="false">No</option>
                `
              : html`
                  <option value="true">Yes</option>
                  <option value="false" selected>No</option>
                `}
          </select>
        </div>
        <div class="post-class">
          <label for="age"> Age</label>
          <input
            type="number"
            name="age"
            value="${petInfo.petCharacteristics.age}"
            id="age"
            min="1"
            max="20"
          />
        </div>
        <div class="post-class">
          <label for="color"> Color</label>
          <input
            type="text"
            name="color"
            value="${petInfo.petCharacteristics.color}"
            id="color"
          />
        </div>
        <div class="post-class">
          <label for="collar"></label>
          <input
            type="text"
            name="collar"
            value="${petInfo.petCharacteristics.collar}"
            id="collar"
          />
        </div>
        <input type="file" @change=${e => readURL(e)} />
        <img
          id="petImg"
          src=${petInfo.petCharacteristics.photoUrl}
          alt="your image"
          style="width: 180; height: 180px;"
        />
        <div>
          <a href="/home" name="back" value="back">
            Back
          </a>
          <input type="submit" name="posts" value="Save" />
        </div>
      </form>
    </div>
    <div></div>
  `;
};

export default editPosts;
