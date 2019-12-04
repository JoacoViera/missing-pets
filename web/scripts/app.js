/* eslint-disable no-undef */
import { render } from '../node_modules/lit-html/lit-html.js';
import { Router, Redirect } from '../node_modules/lit-route/index.js';

import AppRouter from './router.js';

// import home from './templates/home.js';
// import login from './templates/login.js';

// import authenticatedApp from './authenticatedApp.js';
// import unauthenticatedApp from './unauthenticatedApp.js';
import { logOut } from './services/auth.js';
import { getLoggedInUser } from './services/users.js';
import { getSession } from './utils/session.js';
//import posts from './templates/postsForm.js';

// const app = () => html`
//   ${new Route('/login', () => login()).mount()}
//   ${new Route('/home', () => home()).mount()}
// `;

const rootEl = document.getElementById('root');

const isAuthenticated = async () => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  return !!user;
};

const app = async () => {
  const authenticated = await isAuthenticated();
  const router = new Router(
    () => render(AppRouter(authenticated), rootEl),
    rootEl,
  );
  return router.init();
};

const loggedIn = () => {
  document.getElementById('logoutBtn').style.display = 'block';
  document.getElementById('generatePostBtn').style.display = 'block';
  document.getElementById('accountBtn').style.display = 'block';
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('registerBtn').style.display = 'none';
  document.getElementById('myPostsBtn').style.display = 'block';
};

const loggedOut = () => {
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('generatePostBtn').style.display = 'none';
  document.getElementById('accountBtn').style.display = 'none';
  document.getElementById('loginBtn').style.display = 'block';
  document.getElementById('registerBtn').style.display = 'block';
  document.getElementById('myPostsBtn').style.display = 'none';
};

const showNav = async () => {
  const auth = await isAuthenticated();
  if (auth) {
    loggedIn();
  } else {
    loggedOut();
  }
};

window.onload = showNav();

const redirect = async path => {
  Redirect(path, await render(app(), rootEl));
  window.onload = await showNav();
};

document
  .getElementById('homeBtn')
  .addEventListener('click', () => redirect('/home'));
document.getElementById('accountBtn');
document
  .getElementById('loginBtn')
  .addEventListener('click', () => redirect('/login'));
document
  .getElementById('registerBtn')
  .addEventListener('click', () => redirect('/signup'));
document
  .getElementById('accountBtn')
  .addEventListener('click', () => redirect('/account'));
document.getElementById('logoutBtn').addEventListener('click', () => logOut());
document
  .getElementById('generatePostBtn')
  .addEventListener('click', () => redirect('/posts'));
document
  .getElementById('myPostsBtn')
  .addEventListener('click', () => redirect('/myPosts'));

export default redirect;
app();

// export default app;
