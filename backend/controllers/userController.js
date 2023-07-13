import User from '../models/User';

exports.getUser = function (req, res) {
  res.send('get user');
};

exports.signUp = function (req, res) {};

exports.deleteUser = function (req, res) {
  res.send('delete user');
};
