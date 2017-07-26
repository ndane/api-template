let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: "There is nothing here." });
});

/* User Routes */
let UserController = require('../controllers/UserController');
router.get('/users', UserController.users);

module.exports = router;
