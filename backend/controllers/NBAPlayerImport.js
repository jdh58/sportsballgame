const fs = require('fs/promises');
const NBAPlayer = require('../models/Player');
const scraper = require('nba-stat-scraper');

// USE INSTRUCTIONS: Update file contents and year stats are saving to
async function importNBARegularSeasonData(req, res) {
  const fileContents = await fs.readFile(
    './assets/2022-23_NBA_REG.csv',
    'utf-8'
  );

  // Use regex to get all variants of newline to split
  const fileLines = fileContents.split(/\r?\n/);

  // For each line, split it by commas then put it into the DB based off the stats
  for (let i = 0; i < fileLines.length - 1; i++) {
    const playerName = fileLines[i].split(',')[1].replace(/[".]/g, '').trim();
    console.log(playerName);
    // First, check if this player's data is already saved in the database
    // If they are, don't store a duplicate
    const existingPlayer = await NBAPlayer.find({ name: playerName }).exec();
    if (existingPlayer.length > 0) {
      continue;
    }

    // Save this player in the database
    const player = await scraper.getPlayer(playerName);
    const playerObject = JSON.parse(player);
    const newPlayer = new NBAPlayer(playerObject);
    await newPlayer.save();

    // Delay to avoid the timeout of Basketball Reference
    const delay = (time) => new Promise((res) => setTimeout(res, time));
    await delay(6100);
  }

  res.send('dasdasdas');
}

module.exports = importNBARegularSeasonData;
