const express = require('express');

const route = express.Router();

const controller = require('../controllers/scoreController');

// Get top 50 scores
route.post('/top50', controller.grabTop50);

module.exports = route;
