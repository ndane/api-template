import express from 'express';
import jwt from 'jsonwebtoken';
import Secrets from '../config/secrets';

/* Controllers */
import UserController from '../controllers/UserController';

/* Base Router */
const router = express.Router();

/* JWT Authentication */
function respondWithError(res) {
  return res.status(403).json({ message: 'Forbidden' });
}

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.bearer;

  if (!token) {
    return respondWithError(res);
  }

  // Check token
  jwt.verify(token, Secrets.key, (err, decoded) => {
    if (err) {
      return respondWithError(res);
    }

    req.decoded = decoded;
    return next();
  });

  return null;
});

/* User Routes */
router.route('/users')
  .get(UserController.users);

router.route('/users/:id')
  .get(UserController.user)
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
