const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes');
const scoreRouter = require('./routes/scoreRoutes');
const formRouter = require('./routes/formRoutes');

// Configure .env variables
require('dotenv').config();

const mongoDB = process.env.MONGOURI;
mongoose.connect(mongoDB).catch((err) => {
  console.error('Could not connect to the database' + err);
});

const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.set('trust proxy', 1); // This is needed for it to work
app.use(limiter);
// Compress responses
app.use(compression());
// Use helmet for protection
app.use(helmet());

// Allow access from localhost
app.use(cors());

// Parse incoming requests as JSON
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);
app.use('/api/score', scoreRouter);
app.use('/api/form', formRouter);

app.listen(parseInt(process.env.PORT), () => {
  console.log(`server now running on port ${process.env.PORT}`);
});
