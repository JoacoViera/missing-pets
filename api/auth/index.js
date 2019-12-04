const jwt = require('./jwt.js');

const register = async server => {
  await jwt(server);
};

module.exports = {
  name: 'auth',
  register,
};
