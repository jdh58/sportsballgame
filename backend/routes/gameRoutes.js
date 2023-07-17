const express = require('express');

const route = express.Router();

const controller = require('../controllers/gameController');

// Start the game
route.post('/whoami/start', controller.startWhoAmIGame);

// Get a new hint
route.post('/whoami/getHint', controller.getWhoAmIHint);

// Return a list of players from a search
route.get('/playerSearch', controller.playerSearch);

module.exports = route;
