const User = require('../models/User');

const validate = async decoded => {
  const { sub: id } = decoded;
  const user = await User.findById(id);
  if (!user) {
    return { isValid: false };
  }

  return { isValid: true, credentials: user };
};

module.exports = async server => {
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET, // Never Share your secret key
    validate, // validate function defined above
  });
};
