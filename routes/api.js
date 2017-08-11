import express from 'express';

/* Controllers */
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

/* Base Router */
const router = express.Router();

/* Auth Routes */
router.route('/authenticate')
  .post(AuthController.authenticate);

/* User Routes */
router.route('/users')
  .post(UserController.create);

export default router;
