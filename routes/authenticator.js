import jwt from 'jsonwebtoken';
import Secrets from '../config/secrets';

function respondWithError(res) {
  return res.status(403).json({ message: 'Forbidden' });
}

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.bearer;

  if (!token) {
    return respondWithError(res);
  }

  // Check token
  jwt.verify(token, Secrets.jwtKey, (err, decoded) => {
    if (err) {
      return respondWithError(res);
    }

    req.decoded = decoded;
    return next();
  });

  return null;
};
