const mongoose = require('mongoose');

const WhoAmI = require('../models/WhoAmI');

const getRandomPlayer = require('../middlewear/getRandomPlayer');
const createHints = require('../middlewear/createHints');
const requireAuth = require('../middlewear/requireAuth');
const NBAPlayer = require('../models/NBAPlayer');

exports.startWhoAmIGame = async function (req, res, next) {
  const userID = requireAuth(req, res, next);
  const { sport, difficulty, rounds } = req.body;

  if (sport !== 'nba') {
    res.status(400).json({ error: 'No support for this sport' });
    return;
  }

  const newGame = new WhoAmI({
    userID,
    gameMode: { sport, difficulty, rounds },
    currentRound: 1,
    currentHint: 4,
    score: 0,
  });

  // Now randomly pick a player from the database
  const randomPlayer = await getRandomPlayer(sport, difficulty);
  newGame.correctPlayer = randomPlayer;

  // Next up, create hints
  newGame.hints = createHints(sport, randomPlayer);

  // Return the player's headshot picture and first hint
  const firstReturn = {
    playerPicture: newGame.correctPlayer.picture,
    hints: newGame.hints[0],
    _id: newGame._id,
  };

  // Take off the first hint and save to the database to access later
  newGame.hints.shift();

  await newGame.save();

  res.status(200).json(firstReturn);
};

exports.getWhoAmIHint = async function (req, res, next) {
  // First, find the game that's being played
  const gameID = req.body.gameID;
  const game = await WhoAmI.findById(gameID).exec();

  // Then check if all the hints have been used. If so, return and send 400.
  if (game.hints.length <= 0) {
    res.status(400).json({ error: 'All hints have been given.' });
    return;
  }

  // Then, save the next hint
  const hint = game.hints[0];

  // Now update the current hint and lower the currentHint on the game
  game.hints.shift();
  game.currentHint = game.currentHint - 1;

  // Have to mark hints as modified because it wasn't clear enough I guess...
  game.markModified('hints');

  // Save these updates to the database
  await game.save();

  // Finally, send back the new hint
  res.json({ hint, hintLevel: game.currentHint });
};

exports.playerSearch = async function (req, res, next) {
  try {
    const query = req.query.search;

    console.log(query);
    await NBAPlayer.ensureIndexes({ name: 'text' });

    const top5Answers = await NBAPlayer.aggregate([
      {
        $search: {
          index: 'nbaplayersearch',
          text: {
            query: query,
            path: {
              wildcard: '*',
            },
            fuzzy: {
              maxEdits: 2,
              prefixLength: 1,
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          _id: 0,
        },
      },
    ])
      .limit(5)
      .exec();

    res.status(200).json({ answers: top5Answers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch search results.' });
  }
};

// Wrap all in try/catch block later
