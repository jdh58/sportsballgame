const express = require('express');

const route = express.Router();

const controller = require('../controllers/userController');

// GET user
route.get('/:userId', controller.getUser);

// Log in user
route.post('/login', controller.logIn);

// Sign up new user
route.post('/signup', controller.signUp);

// DELETE user
route.delete('/delete/:userId', controller.deleteUser);

module.exports = route;
