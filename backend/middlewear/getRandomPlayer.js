const NBAPlayer = require('../models/NBAPlayer');

module.exports = async function getRandomPlayer(sport, difficulty) {
  if (sport === 'nba') {
    let minutesLimit = 0;

    /* Depending on the difficulty, there will be different
    parameters to find players */
    switch (difficulty) {
      case 'easy':
        minutesLimit = 30;
        break;
      case 'medium':
        minutesLimit = 15;
        break;
      default:
        break;
    }

    // Get the number of players that fit our criteria
    // On Hard mode, we do a ? : thing to lower the minimum games
    const playerCount = await NBAPlayer.count({
      'stats.2022-23.mpg': { $gt: minutesLimit },
      'stats.2022-23.games': { $gt: minutesLimit > 15 ? 20 : 10 },
    }).exec();

    // Now, create a random number from 1-documentCount
    const random = Math.floor(Math.random() * playerCount);

    // Now find the player in there
    const randomPlayer = await NBAPlayer.findOne({
      'stats.2022-23.mpg': { $gt: minutesLimit },
      'stats.2022-23.games': { $gt: minutesLimit > 15 ? 20 : 10 },
    })
      .skip(random)
      .exec();

    return randomPlayer;
  }
};
