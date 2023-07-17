const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes');

// Configure .env variables
require('dotenv').config();

const mongoDB = process.env.MONGOURI;
mongoose.connect(mongoDB).catch((err) => {
  console.error('Could not connect to the database' + err);
});

const app = express();

// Allow access from localhost
app.use(cors());

// Parse incoming requests as JSON
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);

const NBAUpdate = require('./middlewear/NBAUpdate');
(async () => {
  NBAUpdate();
})();

app.listen(parseInt(process.env.PORT), () => {
  console.log(`server now running on port ${process.env.PORT}`);
});
