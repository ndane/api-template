'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BaseSchema = require('./BaseSchema');

const saltWorkFactor = 10;

const UserSchema = new BaseSchema({
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
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

// Transformations
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function transform(doc, ret) {
    const model = ret;

    // Transform data
    // eslint-disable-next-line no-underscore-dangle
    delete model._id;
    delete model.password;

    return model;
  },
});

// Password hashing middleware for mongoose
/* eslint-disable consistent-return */
UserSchema.pre('save', function encryptPassword(next) {
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

UserSchema.pre('findOneAndUpdate', function updatedAt(next) {
  this.update({}, {
    $set: {
      updated_at: Date.now(),
    },
  });

  next();
});

// Password matching
UserSchema.methods.comparePassword = function compare(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};
/* eslint-enable consistent-return */

module.exports = mongoose.model('Users', UserSchema);
