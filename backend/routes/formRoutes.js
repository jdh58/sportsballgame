const express = require('express');

const route = express.Router();

const controller = require('../controllers/formController');

// Submit the message form
route.post('/message/submit', controller.submitMessage);

module.exports = route;
