const handler = require('./handlers');

module.exports = {
  create: {
    handler: handler.create,
    description:
      'Given a valid pair of email and password, this creates an authorization token.',
  },
};
