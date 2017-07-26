'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ message: "There is nothing here." });
});

/* User Routes */
var UserController = require('../controllers/UserController');
router.get('/users', UserController.users);

module.exports = router;