import { post } from '../utils/api.js';
import { removeSession, setSession } from '../utils/session.js';
import redirect from '../app.js';
import { getLoggedInUser } from './users.js';

// const baseUrl =
//   window.location.hostname === '169.254.175.166'
//     ? 'http://localhost:3000'
//     : 'https://limitless-everglades-76624.herokuapp.com';
const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://limitless-everglades-76624.herokuapp.com';

export const logIn = async (email, password) => {
  const { data: session, error } = await post(`${baseUrl}/sessions`, {
    email,
    password,
  });
  if (error) {
    if (error.status === 401) {
      throw new Error('Pet is in the records');
    }
    throw new Error('Oops! Something went wrong...');
  }

  setSession(session);

  redirect('/home');
};

export const logOut = () => {
  redirect('/login');
  removeSession();
};

export const customEmail = async (
  petName,
  postCreator,
  emailCreator,
  sender,
  subject,
  message,
) => {
  await post(`${baseUrl}/sendMail`, {
    petName,
    postCreator,
    emailCreator,
    sender,
    subject,
    message,
  });
};
