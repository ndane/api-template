import express from 'express';

/* Controllers */
import UserController from '../controllers/UserController';

/* Base Router */
const router = express.Router();

/* User Routes */
router.route('/users')
  .get(UserController.users)
  .post(UserController.create);

router.route('/users/:id')
  .get(UserController.user)
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
