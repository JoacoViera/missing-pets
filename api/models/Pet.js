const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  createBy: {
    type: String,
    required: true,
  },
  lostDate: {
    type: Date,
    required: true,
  },
  generalDescription: {
    type: String,
    required: true,
  },
  lostAddress: {
    type: String,
    required: true,
  },
  isMissing: {
    type: Boolean,
    required: true,
  },
  activePost: {
    type: Boolean,
    default: true,
  },
  city: {
    type: String,
    required: true,
  },
  petCharacteristics: {
    animalSpecies: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    desexed: {
      type: Boolean,
    },
    age: {
      type: Number,
    },
    color: {
      type: String,
      required: true,
    },
    collar: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
  },
});

const Pet = mongoose.model('Pet', petSchema, 'pets');

module.exports = Pet;
