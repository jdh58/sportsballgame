const NBAPlayer = require('../models/NBAPlayer');
const scraper = require('nba-stat-scraper');
const fs = require('fs/promises');

// COLLLEGE HINT!!!!!!!@!@

// USE INSTRUCTIONS: Update file contents and year stats are saving to
async function NBAUpdate(req, res) {
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

    const rawScrape = await scraper.getPlayer(playerName);
    const scrapeData = await JSON.parse(rawScrape);

    const player = await NBAPlayer.findOne({ name: scrapeData.name }).exec();

    // Update the player's jersey numbers, recent salary, and career earnings
    player.jerseyNumbers = scrapeData.jerseyNumbers;
    player.recentSalary = scrapeData.recentSalary;
    player.careerEarnings = scrapeData.careerEarnings;

    // Save the changes
    await player.save();

    // Delay to avoid the timeout of Basketball Reference
    const delay = (time) => new Promise((res) => setTimeout(res, time));
    await delay(6100);
  }

  res.send('dasdasdas');
}

module.exports = NBAUpdate;
