import express from 'express';
import authenticator from './authenticator';

/* Controllers */
import UserController from '../controllers/UserController';

/* Base Router */
const router = express.Router();

/* JWT Authentication */
router.use(authenticator);

/* User Routes */
router.route('/users')
  .get(UserController.users);

router.route('/users/:id')
  .get(UserController.user)
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
