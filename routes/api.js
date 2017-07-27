const express = require('express');

/* Base Router */
const router = express.Router();

/* Controllers */
const UserController = require('../controllers/UserController');

/* User Routes */
router.route('/users')
  .get(UserController.users)
  .post(UserController.create);

router.route('/users/:id')
  .get(UserController.user)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
