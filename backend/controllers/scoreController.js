const Score = require('../models/Score');

exports.grabTop50 = async function (req, res, next) {
  const sport = req.body.sport.toLowerCase();
  const game = req.body.game;

  // Extract the number from the mode submitted to align with round from game
  const mode = parseInt(req.body.mode.charAt(0));

  const difficulty = req.body.difficulty.toLowerCase();

  const top50Results = await Score.find({
    'gameMode.sport': sport,
    'gameMode.game': game,
    'gameMode.rounds': mode,
    'gameMode.difficulty': difficulty,
  })
    .sort({ score: 'desc' })
    .limit(50)
    .exec();

  res.status(200).json({ results: top50Results });
};

exports.grabAbove = async function (req, res, next) {
  try {
    const sport = req.body.sport.toLowerCase();
    const game = req.body.game;
    // Extract the number from the mode submitted to align with round from game
    const mode = parseInt(req.body.mode.charAt(0));
    const difficulty = req.body.difficulty.toLowerCase();

    const score = parseInt(req.params.score);

    const amountAbove = await Score.countDocuments({
      'gameMode.sport': sport,
      'gameMode.game': game,
      'gameMode.rounds': mode,
      'gameMode.difficulty': difficulty,
      score: { $gt: score },
    });

    res.status(200).json({ amountAbove });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid request' });
  }
};

exports.grabUserTopScore = async function (req, res, next) {
  try {
    const sport = req.body.sport.toLowerCase();
    const game = req.body.game;
    // Extract the number from the mode submitted to align with round from game
    const mode = parseInt(req.body.mode.charAt(0));
    const difficulty = req.body.difficulty.toLowerCase();

    const userID = req.params.userID;

    const userTopScore = await Score.find({
      'gameMode.sport': sport,
      'gameMode.game': game,
      'gameMode.rounds': mode,
      'gameMode.difficulty': difficulty,
      userID: userID,
    })
      .sort({ score: 'desc' })
      .limit(1);

    if (userTopScore[0]) {
      res.status(200).json({ userTopScore: userTopScore[0].score });
    } else {
      res.status(400).json({ error: 'User has no score for this mode' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid request' });
  }
};
