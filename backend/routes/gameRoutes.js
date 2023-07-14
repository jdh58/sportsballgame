const express = require('express');

const route = express.Router();

const controller = require('../controllers/gameController');

route.post('/whoami/start', controller.startWhoAmIGame);

module.exports = route;
