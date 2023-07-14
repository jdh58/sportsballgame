const requireAuth = require('./requireAuth');

exports.startGame = function (req, res, next) {
  const userID = requireAuth(req, res, next);
};
