const mongoose = require('mongoose');

const WhoAmI = require('../models/WhoAmI');
const Score = require('../models/Score');

const getRandomPlayer = require('../middlewear/getRandomPlayer');
const createHints = require('../middlewear/createHints');
const requireAuth = require('../middlewear/requireAuth');
const NBAPlayer = require('../models/NBAPlayer');

exports.startWhoAmIGame = async function (req, res, next) {
  let userID = requireAuth(req, res, next);
  const { sport, difficulty, rounds } = req.body;

  if (userID.error) {
    userID = null;
  }

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
  newGame.correctPlayer = randomPlayer.name;

  // Next up, create hints
  newGame.hints = createHints(sport, randomPlayer);

  // Return the player's headshot picture and first hint
  const firstReturn = {
    playerPicture: randomPlayer.picture,
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

    res.status(200).json({ top5Answers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch search results.' });
  }
};

// Wrap all in try/catch block later

exports.submitWhoAmIGuess = async function (req, res, next) {
  try {
    const { guess, gameID } = req.body;

    const searchResults = await NBAPlayer.aggregate([
      {
        $search: {
          index: 'nbaplayersearch',
          text: {
            query: guess,
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
      .limit(1)
      .exec();

    const guessedPlayer = searchResults[0].name;

    // If their query didn't return a player, return an error and don't submit the guess
    if (!guessedPlayer) {
      res.status(400).json({ error: 'Player not found.' });
      return;
    }

    // Otherwise, compare if it's the correct guess

    // Grab the game first then compare
    const game = await WhoAmI.findById(gameID).exec();
    const correctPlayer = game.correctPlayer;
    const isGuessCorrect = guessedPlayer === correctPlayer;

    // If it's correct, add the currentHint to the score
    if (isGuessCorrect) {
      game.score += game.currentHint;
    }

    // Check if the game should end
    if (game.currentRound === game.gameMode.rounds) {
      // If so, return the final stats, if the game has a user upload & delete it,
      // if not just delete.
      res.status(200).json({
        correct: isGuessCorrect,
        score: game.score,
        currentRound: game.currentRound,
        gameEnd: true,
        correctPlayer,
      });

      if (game.userID !== null) {
        console.log('banna');
        console.log(game.userID);
        const newScore = new Score({
          userID: game.userID,
          score: game.score,
          gameMode: game.gameMode,
        });

        await newScore.save();
      }

      await WhoAmI.findByIdAndDelete(gameID).exec();
      return;
    }

    // If not, prepare the next round and give updated info
    const newPlayer = await prepareWhoAmIRound(true);

    res.status(200).json({
      correct: isGuessCorrect,
      score: game.score,
      currentRound: game.currentRound,
      gameEnd: false,
      correctPlayer,
      newPlayer,
    });

    async function prepareWhoAmIRound() {
      // Iterate the current round and set currenthint back to default
      game.currentRound += 1;
      game.currentHint = 4;

      // Randomly pick a new player from the database
      const randomPlayer = await getRandomPlayer(
        game.gameMode.sport,
        game.gameMode.difficulty
      );
      game.correctPlayer = randomPlayer.name;

      // Next up, create hints for the new player
      game.hints = createHints(game.gameMode.sport, randomPlayer);

      // Return the player's headshot picture and first hint
      const firstReturn = {
        playerPicture: randomPlayer.picture,
        hints: game.hints[0],
        _id: game._id,
      };

      // Take off the first hint and save to the database to access later
      game.hints.shift();
      game.markModified('hints');

      await game.save();

      return firstReturn;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit guess' });
  }
};
