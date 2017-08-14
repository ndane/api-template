import jwt from 'jsonwebtoken';
import Secrets from '../config/secrets';

function respondWithError(res) {
  return res.status(403).json({ message: 'Forbidden' });
}

export default (req, res, next) => {
  let authorization = req.headers.authorization;

  if (!authorization) {
    return respondWithError(res);
  }

  authorization = authorization.split(' ');

  if (authorization[0] !== 'Bearer') {
    return respondWithError(res);
  }

  const token = authorization[1];
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
