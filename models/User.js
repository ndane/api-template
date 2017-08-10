import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import BaseSchema from './BaseSchema';

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
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
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

// Password matching
UserSchema.methods.comparePassword = function compare(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};
/* eslint-enable consistent-return */

export default mongoose.model('Users', UserSchema);
