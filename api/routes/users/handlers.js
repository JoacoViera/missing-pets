const User = require('../../models/User');

const find = async (request, h) => {
  try {
    const user = await User.find();
    return h.response(user).code(201);
  } catch (error) {
    return h.response('Not Users yet').code(500);
  }
};
const findOne = async ({ params }, h) => {
  try {
    const user = await User.findById(params.id);
    return h.response(user).code(201);
  } catch (error) {
    return h.response('Users doesn`t exist').code(500);
  }
};

const create = async (request, h) => {
  const { email, password, firstName, lastName, city } = request.payload;

  try {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      city,
    });
    return h.response(user).code(201);
  } catch (error) {
    throw error;
    //return h.response('Error on create user').code(500);
  }
};
const update = async (request, h) => {
  const { password, firstName, lastName, city } = request.payload;
  try {
    const user = await User.findById(request.params.id);
    if (password) {
      user.password = password;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (city) {
      user.city = city;
    }
    return user.save();
  } catch (error) {
    return h.response('Error on update user').code(500);
  }
};
const remove = async (request, h) => {
  const { password } = request.payload;
  try {
    const user = await User.findById(request.params.id).select('+password');
    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) {
      return h.response('Password does not match').code(401);
    }
    const desactiveUser = await User.updateOne(
      { _id: request.params.id },
      { active: false },
    );
    return h.response(desactiveUser).code(201);
  } catch (error) {
    return h.response('Error on remove user').code(500);
  }
};
const current = async request => {
  return request.auth.credentials;
};
const findByEmail = async ({ params }, h) => {
  try {
    const user = await User.find({ email: params.email, active: true });
    return h.response(user).code(201);
  } catch (error) {
    return h.response('User doesn`t exist').code(500);
  }
};

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
  current,
  findByEmail,
};
