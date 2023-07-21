const Score = require('../models/Score');

exports.grabTop50 = async function (req, res, next) {
  const sport = req.body.sport.toLowerCase();
  const game = req.body.game;

  // Extract the number from the mode submitted to align with round from game
  const mode = parseInt(req.body.mode.charAt(0));

  const difficulty = req.body.difficulty.toLowerCase();

  console.log({ sport, game, mode, difficulty });
  const top50Results = await Score.find({
    'gameMode.sport': sport,
    'gameMode.game': game,
    'gameMode.rounds': mode,
    'gameMode.difficulty': difficulty,
  })
    .limit(50)
    .exec();

  res.status(200).json({ results: top50Results });
};
