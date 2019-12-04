import { post, put, get } from '../utils/api.js';
import { logOut } from './auth.js';

// const baseUrl =
//   window.location.hostname === '169.254.175.166'
//     ? 'http://localhost:3000'
//     : 'https://limitless-everglades-76624.herokuapp.com';
const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://limitless-everglades-76624.herokuapp.com';

export const createUser = async (
  email,
  password,
  firstName,
  lastName,
  city,
) => {
  const { data: user, error } = await post(`${baseUrl}/users`, {
    email,
    password,
    firstName,
    lastName,
    city,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error('Email already exists.');
    }
    throw error;
    // throw new Error('Oops! Something went wrong...');
  }

  return user;
};

export const updateUser = async (_id, firstName, lastName, city) => {
  const { data: user, error } = await put(`${baseUrl}/users/${_id}`, {
    firstName,
    lastName,
    city,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error('Email already exists.');
    }
    throw error;
    // throw new Error('Oops! Something went wrong...');
  }
};

export const getLoggedInUser = async () => {
  const { data: user } = await get(`${baseUrl}/users/current`);
  if (!user) {
    logOut();

    return null;
  }

  return user;
};

export const getUserByEmail = async email => {
  const { data: user } = await get(`${baseUrl}/users/findbyemail/${email}`);
  return user[0];
};
