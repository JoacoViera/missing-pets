const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const create = async (request, h) => {
  const { email, password } = request.payload;

  const foundUser = await User.findOne({ email }).select('+password');

  const passwordMatches = await foundUser.comparePassword(password);
  if (!passwordMatches || !foundUser) {
    throw new Error('User not found/not valid password');
  }

  const token = jwt.sign({ sub: foundUser.id }, process.env.JWT_SECRET);

  const session = { token };

  return h.response(session).code(201);
};

module.exports = {
  create,
};
