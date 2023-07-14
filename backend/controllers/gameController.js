const requireAuth = require('./requireAuth');

exports.startWhoAmIGame = function (req, res, next) {
  const userID = requireAuth(req, res, next);

  const newGame = new Game();
};
