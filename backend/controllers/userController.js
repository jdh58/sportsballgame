const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.getUser = function (req, res) {
  res.send('get user');
};

exports.logIn = function (req, res) {
  res.send('log in');
};

exports.signUp = [
  ////////// VALIDATION /////////

  // Check the email exists and matches the regex
  body('email')
    .trim()
    .exists({ values: falsy })
    .withMessage('Please enter an email')
    .not.matches(emailRegex)
    .withMessage('Invalid email address')
    .escape(),

  // We only want alphanumeric usernames
  body('username')
    .trim()
    .exists({ values: falsy })
    .withMessage('Please enter a username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Usernames must be between 3 and 20 characters')
    .not.matches(usernameRegex)
    .withMessage(
      'Usernames may only contain characters a-Z, 0-9, periods, and underscores'
    )
    .escape(),

  // Ensure it's above 6 characters
  body('password').trim().isLength({ min: 6 }).withMessage('Invalid password'),

  async function (req, res) {
    try {
      // Make sure the user doesn't already exist
      const existingEmail = await User.findOne({
        email: req.body.email,
      }).exec();
      const existingUsername = await User.findOne({
        username: req.body.username,
      }).exec();

      if (existingEmail) {
        res.status(400).json({ error: 'Email already exists' });
      } else if (existingUsername) {
        res.status(400).json({ error: 'Username already exists' });
      }

      // Go ahead and store the new user in the database.
      // First, set up the new User object
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
      });

      // Then, hash and salt the password and update the newUser object
      bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
        if (err) {
          throw new Error(err);
        }
        newUser.password = hashedPassword;
      });

      // If we got here, save the new user to the database and respond OK
      await newUser.save();
      res.status(200).json({ newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error signing up' });
    }
  },
];

exports.deleteUser = function (req, res) {
  res.send('delete user');
};

// lol.
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const usernameRegex = /^[a-zA-Z0-9._]+$/;
