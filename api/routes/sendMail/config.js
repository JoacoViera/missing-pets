const handlers = require('./handlers');

module.exports = {
  create: {
    handler: handlers.create,
    description: 'Send a new email',
    auth: 'jwt',
  },
};
