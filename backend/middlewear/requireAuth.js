const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  // Grab the authentication from the header
  const authorization = req.headers.authorization;

  // No authorization in header, not authenticated. Respond with 401 not authenticated
  if (!authorization) {
    return { error: 'No auth token provided' };
  }

  // Otherwise, there is a bearer token so grab it.
  const token = authorization.split(' ')[1];

  try {
    const _id = jwt.verify(token, process.env.SECRET)._id;
    return _id;
  } catch (err) {
    return { error: 'Token invalid or expired' };
  }
};
