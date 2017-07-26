'use strict';

var express = require('express');

module.exports = {
  users: function users(req, res, next) {
    res.json({ status: 'Not Found: ' + req });
  },

  user: function user(req, res, next) {
    console.log(req);
  }
};