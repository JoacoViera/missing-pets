const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', function hashPassword() {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  }
});

userSchema.method('comparePassword', function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
