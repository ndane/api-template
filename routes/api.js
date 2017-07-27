const express = require('express');
const router = express.Router();

/* User Routes */
const UserController = require('../controllers/UserController');
router.route('/users')
      .get(UserController.users)
      .post(UserController.create);

router.route('/users/:id')
      .get(UserController.user)
      .put(UserController.update)
      .delete(UserController.delete);

module.exports = router;
