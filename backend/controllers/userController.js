const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const usernameRegex = /^[a-zA-Z0-9._]+$/;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' });
};

const profilePicURLS = [
  'https://i.imgur.com/teNX2f9.jpg',
  'https://i.imgur.com/XNPRyNQ.jpg',
  'https://i.imgur.com/Q81BEoA.jpg',
  'https://i.imgur.com/u3zSQIS.jpg',
  'https://i.imgur.com/9aA0MYy.jpg',
  'https://i.imgur.com/1mux5U3.jpg',
  'https://i.imgur.com/COEo6jV.jpg',
];

exports.getUser = async function (req, res) {
  try {
    // Anybody can get this info so don't bother to check token
    const grabbedUser = await User.findOne({ username: req.params.username });

    res.status(200).json(grabbedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to grab user profile');
  }
};

exports.logIn = [
  // Validate and trim login details
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Please enter an email')
    .trim()
    .escape(),
  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Please enter a password')
    .trim(),

  async function (req, res) {
    try {
      // First, get the user account associated with the email
      const currentUser = await User.findOne({ email: req.body.email }).exec();

      // If they don't exist, let the user know.
      if (!currentUser) {
        res.status(400).json({
          error:
            'No user found with that email. Please sign up or use another account.',
        });
        return;
      }

      // Otherwise, compare the passwords
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        currentUser.password
      );

      // If they don't match, send the error
      if (!isPasswordCorrect) {
        res.status(400).json({ error: 'Incorrect password' });
        return;
      }

      // If they do match, return OK with a JWT
      const token = createToken(currentUser._id);
      res.status(200).json({
        email: currentUser.email,
        profilePicURL: currentUser.profilePicURL,
        username: currentUser.username,
        _id: currentUser._id,
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to sign in' });
    }
  },
];

exports.signUp = [
  // Check the email exists and matches the regex
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Please enter an email')
    .matches(emailRegex)
    .withMessage('Invalid email address')
    .escape(),

  // We only want certain usernames
  body('username')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Please enter a username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Usernames must be between 3 and 20 characters')
    .matches(usernameRegex)
    .withMessage(
      'Usernames may only contain characters a-Z, 0-9, periods, and underscores'
    )
    .escape(),

  // Ensure it's above 6 characters
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  async function (req, res) {
    try {
      // If there's validation errors, send them back
      if (!validationResult(req).isEmpty()) {
        res.status(400).json({ error: validationResult(req).errors[0].msg });
        return;
      }

      // Make sure the user doesn't already exist
      const existingEmail = await User.findOne({
        email: req.body.email,
      }).exec();
      const existingUsername = await User.findOne({
        username: req.body.username,
      }).exec();

      if (existingEmail) {
        res.status(400).json({ error: 'Email already exists' });
        return;
      } else if (existingUsername) {
        res.status(400).json({ error: 'Username already exists' });
        return;
      }

      const randomNum1to7 = Math.floor(Math.random() * 7);

      // Go ahead and store the new user in the database.
      // First, set up the new User object
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        profilePicURL: profilePicURLS[randomNum1to7],
        scores: {},
        badges: {},
      });

      // Then, hash and salt the password and update the newUser object
      newUser.password = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
          if (err) {
            throw new Error(err);
          }
          resolve(hashedPassword);
        });
      });

      // If we got here, save the new user to the database and respond OK and give JWT
      await newUser.save();
      const token = createToken(newUser._id);
      res.status(200).json({
        email: newUser.email,
        username: newUser.username,
        profilePicURL: newUser.profilePicURL,
        _id: newUser._id,
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error signing up' });
    }
  },
];

exports.deleteUser = function (req, res) {
  res.send('delete user');
};

// How to use userReducer() with action type,

// Ampersand to do conditional rendering

// Hooks you can access all their state the entire time not just return

// Store in local storage
