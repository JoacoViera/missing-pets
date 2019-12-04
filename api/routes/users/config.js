const handler = require('./handlers');
const validations = require('./validations');

module.exports = {
  find: {
    handler: handler.find,
    validate: validations.find,
    description: 'Get a list of all users',
  },
  findOne: {
    handler: handler.findOne,
    validate: validations.findOne,
    description: 'Get the user with ID <userId>',
  },
  create: {
    handler: handler.create,
    validate: validations.create,
    description: 'Create a new user',
  },
  update: {
    handler: handler.update,
    validate: validations.update,
    description: 'Update the user with ID <userId>',
    auth: 'jwt',
  },
  remove: {
    handler: handler.remove,
    validate: validations.remove,
    description:
      'Delete the user with ID <userId> (marks this user as not active)',
    auth: 'jwt',
  },
  current: {
    handler: handler.current,
    description: 'Gets current user',
    auth: 'jwt',
  },
  findByEmail: {
    handler: handler.findByEmail,
    validate: validations.findByEmail,
    description: 'Get the user with email <email>',
    auth: 'jwt',
  },
};
