let express = require('express')

module.exports = {
  users: function(req, res, next) {
    res.json({ status: 'Not Found: ' + req });
  },

  user: function(req, res, next) {
    console.log(req);
  }
};
