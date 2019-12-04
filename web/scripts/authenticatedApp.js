import home from './templates/home.js';
import account from './templates/account';
import { redirect } from './utils/router.js';

const routes = {
  '/': home,
  '/account': account,
};
const notMatch = () => redirect('/');

const authenticatedApp = () => {
  const template = routes[window.location.pathname] || notMatch;
  return template();
};

export default authenticatedApp;
