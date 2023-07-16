const WhoAmI = require('../models/WhoAmI');
const NBAPlayer = require('../models/NBAPlayer');

const getRandomPlayer = require('../middlewear/getRandomPlayer');
const createHints = require('../middlewear/createHints');
const requireAuth = require('../middlewear/requireAuth');

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
  };

  // Take off the first hint
  newGame.hints.shift();

  res.status(200).json(firstReturn);
};
