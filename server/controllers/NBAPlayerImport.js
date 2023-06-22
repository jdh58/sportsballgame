const fs = require('fs/promises');
const Player = require('../models/Player');
const scraper = require('nba-stat-scraper');

// USE INSTRUCTIONS: Update file contents and year stats are saving to
async function importNBARegularSeasonData(req, res, next) {
  const fileContents = await fs.readFile(
    './assets/2022-23_NBA_REG.csv',
    'utf-8'
  );

  // Use regex to get all variants of newline to split
  const fileLines = fileContents.split(/\r?\n/);

  // For each line, split it by commas then put it into the DB based off the stats
  for (let i = 0; i < 3; i++) {
    const playerName = fileLines[i].split(',')[1];

    const player = await scraper.getPlayer(playerName);

    const playerObject = JSON.parse(player);

    const newPlayer = new Player(playerObject);

    await newPlayer.save();
  }

  res.send('dasdasdas');
}

module.exports = importNBARegularSeasonData;
