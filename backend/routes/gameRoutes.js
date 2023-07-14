const express = require('express');

const route = express.Router();

const controller = require('../controllers/gameController');

route.post('/start', controller.startGame);

module.exports = route;
