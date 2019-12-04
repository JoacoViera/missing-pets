const handlers = require('./handlers');
const validations = require('./validations');

module.exports = {
  find: {
    handler: handlers.find,
    validate: validations.find,
    description: 'Get a list of all pets posts',
  },
  findOne: {
    handler: handlers.findOne,
    validate: validations.findOne,
    description: 'Get the pet post with ID <petId>',
  },
  create: {
    handler: handlers.create,
    validate: validations.create,
    description: 'Create a new post for a missing pet',
    auth: 'jwt',
  },
  update: {
    handler: handlers.update,
    validate: validations.update,
    auth: 'jwt',
    description: 'Update the post with ID <petId>',
  },
  remove: {
    handler: handlers.remove,
    description: 'Mark the post with ID <petId> as not active',
    auth: 'jwt',
  },
  findByUser: {
    handler: handlers.findByUser,
    description: 'Get a list of pets posts created by user',
    auth: 'jwt',
  },
  findByCity: {
    handler: handlers.findByCity,
    description: 'Get a list of pets from one specific area',
  },
};
