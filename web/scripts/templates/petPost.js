import { html } from '../../node_modules/lit-html/lit-html.js';

import { customEmail } from '../services/auth.js';
import { getLoggedInUser, getUserByEmail } from '../services/users.js';
import { getOnePost } from '../services/pets.js';

import { getSession, setPostId } from '../utils/session.js';
import redirect from '../app.js';
import { post } from '../utils/api.js';
import editPost from './editPost.js';

const isPostCreator = async userMail => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  return user ? user.email === userMail : false;
};

const hideForm = async () => {
  const hiddenForm = document.getElementById('hiddenForm');
  hiddenForm.style.display = 'none';
};

const sendCustomEmail = async pet => {
  const creator = await getUserByEmail(pet.createBy);
  const postCreator = creator.firstName;

  const emailCreator = pet.createBy;

  const petName = pet.petCharacteristics.name;
  const petNameCapitalized = petName[0].toUpperCase() + petName.slice(1);

  const subject = document.getElementById('subject').value;
  const message = document.getElementById('msg').value;

  const user = await getLoggedInUser();

  customEmail(
    petNameCapitalized,
    postCreator,
    emailCreator,
    user.email,
    subject,
    message,
  );

  hideForm();
};

const contactForm = async pet => {
  return html`
    <div class="contactBox">
      <div class="detailsBox">
        <label class="contactDetails" for="creatorEmail">Email:</label>
        <input id="creatorEmail" value=${pet.createBy} readonly></input>
      </div>
      <div class="detailsBox">
        <label class="contactDetails" for="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          onkeyup="this.setAttribute('value', this.value);"
          value=""
        />
      </div>
      <div class="detailsBox">
        <label class="contactDetails" for="msg">Message:</label>
        <textarea id="msg"></textarea>
      </div>

      <div class="mailBtnBox">
        <button class="sendMailBtn" type="submit" @click=${e =>
          sendCustomEmail(pet)}>
          Send your message
        </button>
      </div>
    </div>
  `;
};

const showForm = async () => {
  const session = getSession();
  if (session) {
    const hiddenForm = document.getElementById('hiddenForm');
    hiddenForm.style.display = 'flex';
  } else {
    await redirect('/login');
  }
};

const editPosts = async id => {
  await setPostId(id);
  await redirect('/editPost');
};

const isActivePost = async pet => {
  return html`
    <div class="contactTxt">
      ${pet.activePost
        ? html`
            ${(await isPostCreator(pet.createBy))
              ? html`
                  <div>
                    <button
                      type="submit"
                      class="editBtn"
                      id="editPostBtn"
                      @click=${e => editPosts(pet._id)}
                    >
                      Edit this Post
                    </button>
                  </div>
                `
              : html`
                  <div class="missingTxt">
                    ${pet.isMissing
                      ? html`
                          Have you found this pet?
                        `
                      : html`
                          Are you the owner of this pet?
                        `}
                  </div>
                  <button
                    type="button"
                    class="contactBtn"
                    @click=${await showForm}
                  >
                    Get in Contact!
                  </button>
                `}
          `
        : html`
            <div class="missingTxt">
              ${pet.isMissing
                ? html`
                    This pet has already been found!
                  `
                : html`
                    This pet has already been reunited with its owners!
                  `}
            </div>
          `}
    </div>
  `;
};

const showPetInfo = async pet => {
  return html`
    <div class="singlePost">
      <h2 class="postName" id="postName">
        ${pet.petCharacteristics.name}
      </h2>
      <h3 class="lostDate">
        ${pet.isMissing
          ? html`
              Missing since ${pet.lostDate.split('T')[0]}<br />
              Last seen on ${pet.lostAddress}, ${pet.city}
            `
          : html`
              Found on ${pet.lostDate.split('T')[0]}<br />
              Found over ${pet.lostAddress}, ${pet.city}
            `}
      </h3>
      <div class="petInfo">
        <div class="infoContainer">
          <img src=${pet.petCharacteristics.photoUrl} class="postPhoto" />
        </div>
        <div class="infoContainer">
          <table class="petTableInfo">
            <tr class="tableRow">
              <th class="firstColumn">Animal species</th>
              <th class="secondColumn">
                ${pet.petCharacteristics.animalSpecies}
              </th>
            </tr>
            <tr class="tableRow">
              <th class="firstColumn">Breed</th>
              <th class="secondColumn">${pet.petCharacteristics.breed}</th>
            </tr>
            <tr class="tableRow">
              <th class="firstColumn">Gender</th>
              <th class="secondColumn">${pet.petCharacteristics.gender}</th>
            </tr>
            <tr class="tableRow">
              <th class="firstColumn">Age</th>
              <th class="secondColumn">${pet.petCharacteristics.age}</th>
            </tr>
            <tr class="tableRow">
              <th class="firstColumn">Coloring</th>
              <th class="secondColumn">${pet.petCharacteristics.color}</th>
            </tr>
            <tr class="tableRow">
              <th class="firstColumn">Collar</th>
              <th class="secondColumn">${pet.petCharacteristics.collar}</th>
            </tr>
            <tr class="tableRow">
              <th class="firstColumn">Neutered</th>
              <th class="secondColumn">
                ${pet.petCharacteristics.desexed
                  ? html`
                      Yes
                    `
                  : html`
                      No
                    `}
              </th>
            </tr>
          </table>
        </div>
      </div>
      ${await isActivePost(pet)}
    </div>
    <div id="hiddenForm">
      ${await contactForm(pet)}
    </div>
  `;
};

const showPost = async id => {
  const pet = await getOnePost(id);

  return html`
    ${await showPetInfo(pet)}
  `;
};

const petPost = async match => {
  return html`
    <div>
      <div>${await showPost(match.params.id)}</div>
    </div>
  `;
};

export default petPost;
