const Pet = require('../../models/Pet');

const find = async () => Pet.find({ activePost: true });

const findOne = async ({ params }) => Pet.findById(params.id);
const create = async (request, h) => {
  const {
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
  } = request.payload;
  try {
    const createMissingPet = await Pet.create({
      createBy,
      lostDate,
      generalDescription,
      lostAddress,
      isMissing,
      city,
      petCharacteristics: {
        animalSpecies,
        breed,
        name,
        gender,
        desexed,
        age,
        color,
        collar,
        photoUrl,
      },
    });
    return h.response(createMissingPet).code(201);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw Pet.conflic('Pet already exists');
    }
    throw err;
  }
};

const update = request => {
  const {
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
  } = request.payload;

  const updateMissingPet = Pet.updateOne(
    { _id: request.params.id },
    {
      lostDate,
      generalDescription,
      lostAddress,
      isMissing,
      city,
      petCharacteristics: {
        animalSpecies,
        breed,
        name,
        gender,
        desexed,
        age,
        color,
        collar,
        photoUrl,
      },
    },
  );
  return updateMissingPet;
};
const remove = async request => {
  const removeMissingPet = await Pet.updateOne(
    { _id: request.params.id },
    {
      activePost: false,
    },
  );
  return removeMissingPet;
};
const findByUser = async ({ params }, h) => {
  try {
    const posts = await Pet.find({ createBy: params.email, activePost: true });
    return h.response(posts).code(201);
  } catch (error) {
    return h.response('User doesn`t have posts').code(500);
  }
};

const findByCity = async ({ params }, h) => {
  try {
    const posts = await Pet.find({ city: params.city, activePost: true });
    return h.response(posts).code(201);
  } catch (error) {
    return h.response('No pets lost in this area.').code(500);
  }
};

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
  findByUser,
  findByCity,
};
