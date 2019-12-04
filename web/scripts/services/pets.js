import { post, get, put, deleteApi } from '../utils/api.js';
import { removePostId } from '../utils/session.js';

// const baseUrl =
//   window.location.hostname === '169.254.175.166'
//     ? 'http://localhost:3000'
//     : 'https://limitless-everglades-76624.herokuapp.com';
const baseUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://limitless-everglades-76624.herokuapp.com';

export const createPetPost = async (
  createBy,
  lostDate,
  generalDescription,
  lostAddress,
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
) => {
  const { data: pet, error } = await post(`${baseUrl}/pets`, {
    createBy,
    lostDate,
    generalDescription,
    lostAddress,
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
  });
  if (error) {
    if (error.status === 409) {
      throw new Error('Email already exists.');
    }
    throw error;
    //throw new Error('Oops! Something went wrong...');
  }

  return pet;
};

export const getAllPosts = async () => {
  const { data: pets } = await get(`${baseUrl}/pets`);
  return pets;
};

export const getOnePost = async petId => {
  const { data: pet } = await get(`${baseUrl}/pets/${petId}`);
  return pet;
};

export const getUserPosts = async email => {
  const { data: pets } = await get(`${baseUrl}/pets/myPosts/${email}`);
  return pets;
};

export const updatePetPost = async (
  lostDate,
  generalDescription,
  lostAddress,
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
) => {
  const { data: pet, error } = await put(`${baseUrl}/pets/${postId}`, {
    lostDate,
    generalDescription,
    lostAddress,
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
  });
  if (error) {
    if (error.status === 409) {
      throw new Error('Email already exists.');
    }
    throw error;
    // throw new Error('Oops! Something went wrong...');
  }
  removePostId();
  return pet;
};
export const getPostsByCity = async city => {
  const { data: pets } = await get(`${baseUrl}/pets/byCity/${city}`);
  return pets;
};

export const deletePost = async petId => {
  const { data: pets } = await deleteApi(`${baseUrl}/pets/${petId}`);
  return pets;
};
