const config = require('./config');

module.exports = [
  { method: 'GET', path: '/pets', config: config.find },
  { method: 'GET', path: '/pets/{id}', config: config.findOne },
  { method: 'POST', path: '/pets', config: config.create },
  { method: 'PUT', path: '/pets/{id}', config: config.update },
  { method: 'DELETE', path: '/pets/{id}', config: config.remove },
  { method: 'GET', path: '/pets/myPosts/{email}', config: config.findByUser },
  { method: 'GET', path: '/pets/byCity/{city}', config: config.findByCity },
];
