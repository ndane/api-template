import express from 'express';

/* Controllers */
import AuthController from '../controllers/AuthController';

/* Base Router */
const router = express.Router();

/* Auth Routes */
router.route('/authenticate')
  .post(AuthController.authenticate);

export default router;
