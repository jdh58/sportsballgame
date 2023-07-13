const express = require('express');
const mongoose = require('mongoose');

// Configure .env variables
require('dotenv').config();

const mongoDB = process.env.MONGOURI;
mongoose.connect(mongoDB).catch((err) => {
  console.error('Could not connect to the database' + err);
});

const app = express();

app.listen(3000, () => {
  console.log('server now running on port 3000');
});
