let express = require('express')

module.exports = {
  users: function(req, res, next) {
    res.json({ message: 'List of users'});
  },

  create: function(req, res, next) {
    res.json({ message: 'Creating a user' });
  },

  user: function(req, res, next) {
    res.json({ message: 'Single user with id ' + req.params.id });
  },

  update: function(req, res, next) {
    res.json({ message: 'Update user with id ' + req.params.id });
  },

  delete: function(req, res, next) {
    res.json({ message: 'Delete user with id ' + req.params.id });
  }
};
