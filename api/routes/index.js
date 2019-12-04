const userRoutes = require('./users');
const petRoutes = require('./pets');
const sessionRoutes = require('./sessions');
const sendMailRoute = require('./sendMail');

const register = (server, options) => {
  return server.route([
    ...userRoutes,
    ...petRoutes,
    ...sessionRoutes,
    ...sendMailRoute,
  ]);
};

module.exports = {
  name: 'routes',
  register,
};
