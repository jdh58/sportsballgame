const WhoAmI = require('../models/WhoAmI');
const NBAPlayer = require('../models/NBAPlayer');

const getRandomPlayer = require('../middlewear/getRandomPlayer');
const requireAuth = require('../middlewear/requireAuth');

exports.startWhoAmIGame = async function (req, res, next) {
  const userID = requireAuth(req, res, next);
  console.log(userID);

  console.log(req.body);
  const { sport, difficulty, rounds } = req.body;

  const newGame = new WhoAmI({
    userID,
    gameMode: { sport, difficulty, rounds },
    currentRound: 1,
    currentHint: 4,
    score: 0,
  });

  // Now randomly pick a player from the database

  // First, get the number of players stored
  const randomPlayer = await getRandomPlayer(sport, difficulty);

  newGame.correctPlayer = randomPlayer;

  // Next up, create hints
  createHints(sport, randomPlayer);

  console.log(randomPlayer);
  res.send('banan');

  if (difficulty === 'easy') {
  }
};
