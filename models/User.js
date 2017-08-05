'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltWorkFactor = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please enter a username',
    index: { unique: true },
  },
  email: {
    type: String,
    required: 'Please enter an email address',
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware for mongoose
/* eslint-disable consistent-return */
UserSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(saltWorkFactor, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

// Password matching
UserSchema.methods.comparePassword = (password, cb) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};
/* eslint-enable consistent-return */

module.exports = mongoose.model('Users', UserSchema);
