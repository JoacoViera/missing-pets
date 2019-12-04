import { html, render } from '../node_modules/lit-html/lit-html.js';
import {
  Route,
  PrivateRoute,
  DefaultRoute,
} from '../node_modules/lit-route/index.js';

import Login from './templates/login.js';
import SignUp from './templates/signup.js';
import Home from './templates/home.js';
import Posts from './templates/postsForm.js';
import Account from './templates/account.js';
import PetPost from './templates/petPost.js';
import MyPosts from './templates/myPosts.js';
import EditPost from './templates/editPost.js';

// const homeRoute = isAuthenticated =>
//   PrivateRoute('/home', isAuthenticated, () => home(), () => home());
const appRoot = document.getElementById('root');
const generatePosts = isAuthenticated =>
  PrivateRoute(
    '/posts',
    isAuthenticated,
    async () => render(await Posts(), appRoot),
    async () => render(await Login(), appRoot),
  );

const loginRoute = isAuthenticated =>
  PrivateRoute(
    '/login',
    isAuthenticated,
    async () => render(await Home(), appRoot),
    async () => render(await Login(), appRoot),
  );

const homeRoute = new Route('/home', async () => render(await Home(), appRoot));
const account = new Route('/account', async () =>
  render(await Account(), appRoot),
);
const signupRoute = new Route('/signup', async () =>
  render(await SignUp(), appRoot),
);
const petPostRoute = new Route('/petPost/:id', async match =>
  render(await PetPost(match), appRoot),
);
// const defaultRoute = new DefaultRoute(async () =>
//  render(await Home(), appRoot),
// );
const myPosts = isAuthenticated =>
  PrivateRoute(
    '/myPosts',
    isAuthenticated,
    async () => render(await MyPosts(), appRoot),
    async () => render(await Login(), appRoot),
  );
const editPost = isAuthenticated =>
  PrivateRoute(
    '/editPost',
    isAuthenticated,
    async () => render(await EditPost(), appRoot),
    async () => render(await Login(), appRoot),
  );

const AppRouter = isAuthenticated => html`
  ${homeRoute.mount()} ${loginRoute(isAuthenticated)} ${signupRoute.mount()}
  ${generatePosts(isAuthenticated)} ${petPostRoute.mount()}
  ${myPosts(isAuthenticated)} ${editPost(isAuthenticated)} ${account.mount()}
`;

export default AppRouter;
