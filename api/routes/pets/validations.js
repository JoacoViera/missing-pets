const Joi = require('joi');

module.exports = {
  find: {
    query: {
      limit: Joi.equal("Function that gets all ms' posts"),
    },
  },
  create: {
    payload: {
      createBy: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      lostDate: Joi.date(),
      generalDescription: Joi.string()
        .min(2)
        .max(100),
      lostAddress: Joi.string()
        .min(2)
        .max(40),
      isMissing: Joi.bool(),
      city: Joi.string()
        .min(3)
        .max(20),
      animalSpecies: Joi.string()
        .min(2)
        .max(20),
      breed: Joi.string()
        .min(2)
        .max(20),
      name: Joi.string()
        .min(2)
        .max(20),
      gender: Joi.string()
        .min(4)
        .max(6),
      desexed: Joi.bool(),
      age: Joi.number()
        .min(0)
        .max(30),
      color: Joi.string()
        .min(2)
        .max(20),
      collar: Joi.string()
        .min(2)
        .max(30),
      photoUrl: Joi.string(),
    },
  },
  update: {
    payload: {
      lostDate: Joi.date(),
      generalDescription: Joi.string()
        .min(2)
        .max(100),
      lostAddress: Joi.string()
        .min(2)
        .max(40),
      isMissing: Joi.bool(),
      city: Joi.string()
        .min(3)
        .max(20),
      animalSpecies: Joi.string()
        .min(2)
        .max(20),
      breed: Joi.string()
        .min(2)
        .max(20),
      name: Joi.string()
        .min(2)
        .max(20),
      gender: Joi.string()
        .min(4)
        .max(6),
      desexed: Joi.bool(),
      age: Joi.number()
        .min(0)
        .max(30),
      color: Joi.string()
        .min(2)
        .max(20),
      collar: Joi.string()
        .min(2)
        .max(30),
      photoUrl: Joi.string(),
      postId: Joi.string(),
    },
  },
  remove: {
    query: {},
  },
};
