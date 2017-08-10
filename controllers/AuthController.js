import jwt from 'jsonwebtoken';
import User from '../models/User';
import Secrets from '../config/secrets';

export default {
  authenticate(req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        res.send(err);
        return;
      }

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      user.comparePassword(req.body.password, (passwordError, isMatch) => {
        if (passwordError || !isMatch) {
          res.status(400).json({ message: 'Not authenticated' });
          return;
        }

        const token = jwt.sign(user, Secrets.key, {
          expiresIn: 1440,
        });

        res.json({
          message: 'Authenticated',
          user,
          token,
        });
      });
    }).select('+password');
  },
};
