const express = require('express');

const route = express.Router();

const controller = require('../controllers/scoreController');

// Get top 50 scores
route.post('/top50', controller.grabTop50);

// Get the amount above a certain score
route.post('/amountAbove/:score', controller.grabAbove);

// Get a user's score for a category
route.post('/user/:userID', controller.grabUserTopScore);

module.exports = route;
