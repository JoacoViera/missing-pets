const Joi = require('joi');

module.exports = {
  create: {
    payload: {
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string()
        .min(8)
        .max(20),
      firstName: Joi.string()
        .min(2)
        .max(20),
      lastName: Joi.string()
        .min(3)
        .max(20),
      city: Joi.string()
        .min(3)
        .max(20),
    },
  },
  update: {
    payload: {
      password: Joi.string()
        .min(8)
        .max(20),
      firstName: Joi.string()
        .min(2)
        .max(20),
      lastName: Joi.string()
        .min(3)
        .max(20),
      city: Joi.string()
        .min(3)
        .max(20),
    },
  },
  remove: {
    payload: {
      password: Joi.string()
        .min(8)
        .max(20),
    },
  },
};
