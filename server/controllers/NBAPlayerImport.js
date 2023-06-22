const fs = require('fs/promises');
const Player = require('../models/Player');

// USE INSTRUCTIONS: Update file contents and year stats are saving to
async function importNBARegularSeasonData(req, res, next) {
  const fileContents = await fs.readFile(
    './assets/2022-23_NBA_REG.csv',
    'utf-8'
  );

  // Use regex to get all variants of newline to split
  const fileLines = fileContents.split(/\r?\n/);

  // For each line, split it by commas then put it into the DB based off the stats
  for (let i = 0; i < fileLines.length - 1; i++) {
    const line = fileLines[i];
    console.log(line);

    // const newPlayer = new Player({
    //   league: 'NBA',
    //   name: { type: String, required: true, minLength: 1, maxLength: 100 },
    //   picture: { type: String, required: true, maxLength: 100 },
    //   stats: { type: Object, required: true },
    //   funFacts: { type: Array, required: true },
    //   nicknames: { type: Array, required: true },
    //   championships: { type: Number, required: true },
    //   college: { type: String, required: true },
    //   pick: { type: Number, required: true },
    //   place_of_birth: { type: String, required: true, maxLength: 50 },
    //   birth_date: { type: Date, required: true },
    //   first_year: { type: Number, required: true },
    //   last_year: { type: Number, required: true },
    // });

    // await newPlayer.save();
  }

  res.send('dasdasdas');
}

module.exports = importNBARegulatSeasonData;
