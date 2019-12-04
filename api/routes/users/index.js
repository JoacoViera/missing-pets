const config = require('./config');

module.exports = [
  { method: 'GET', path: '/users', config: config.find },
  { method: 'GET', path: '/users/{id}', config: config.findOne },
  { method: 'POST', path: '/users', config: config.create },
  { method: 'PUT', path: '/users/{id}', config: config.update },
  { method: 'DELETE', path: '/users/{id}', config: config.remove },
  { method: 'GET', path: '/users/current', config: config.current },
  {
    method: 'GET',
    path: '/users/findbyemail/{email}',
    config: config.findByEmail,
  },
];
