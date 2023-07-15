const { format, differenceInDays, differenceInYears } = require('date-fns');

module.exports = function createHints(sport, Player) {
  console.log(Player.name);
  console.log(createDraftHint(Player, 4));
  console.log(createDraftHint(Player, 1));
  console.log(createDebutHint(Player, 4));
  console.log(createDebutHint(Player, 1));
  console.log(createStatHint(Player, 1));
};

const hintFunctions = [
  createDraftHint,
  createDebutHint,
  createStatHint,
  createScoringHint,
  createHometownHint,
  createChampionshipsHint,
  createFunFactHint,
  createTeamHint,
  createJerseyNumberHint,
  createPositionHint,
  createMissingSeasonHint,
  createMultipleTeamHint,
  createContractHint,
  createNicknameHint,
  createYearsPlayedHint,
  createStartedHint,
  createAccoladeHint,
  createMeasurablesHint,
  createAgeHint,
  createShootingHandHint,
];

function createDraftHint(Player, difficulty) {
  // If they were drafted, use difficulty to choose between the info given
  if (Player.draftPick < 0) {
    return -1;
  }

  if (difficulty > 2) {
    return `I was drafted with pick number ${Player.draftPick}.`;
  } else {
    return `I was drafted with pick number ${Player.draftPick} in the ${Player.draftYear} draft.`;
  }
}

function createDebutHint(Player, difficulty) {
  // Give up more info if the difficulty is lower
  if (difficulty > 2) {
    return `I made my debut on ${format(Player.debut, 'MMMM d, yyyy')}.`;
  } else {
    return `I made my debut on ${format(
      Player.debut,
      'MMMM d, yyyy'
    )} at the age of ${differenceInYears(
      Player.debut,
      Player.birthdate
    )} years and ${
      differenceInDays(Player.debut, Player.birthdate) % 365
    } days.`;
  }
}

function createStatHint(Player, difficulty) {
  const randomSelector1 = Math.floor(Math.random() * 2);
  const randomSelector2 = Math.floor(Math.random() * 5);

  let stats;

  // Randomly pick a stat to show as hint
  switch (randomSelector2) {
    case 0:
      stats = ['ppg', 'points'];
      break;
    case 1:
      stats = ['ast', 'assists'];
      break;
    case 2:
      stats = ['tpg', 'rebounds'];
      break;
    case 3:
      // Only use steals if they get a lot of them
      if (Player.stats['2022-23'].stl > 1) {
        stats = ['stl', 'steals'];
      } else {
        stats = ['ppg', 'points'];
      }
      break;
    case 4:
      // Only use blocks if they get a lot of them
      if (Player.stats['2022-23'].bpg > 1) {
        stats = ['bpg', 'blocks'];
      } else {
        stats = ['ast', 'assists'];
      }
      break;
  }

  // Randomly pick if it does the career stat or most recent season
  if (randomSelector1 === 0) {
    return `I averaged ${Player.stats['2022-23'][stats[0]]} ${
      stats[1]
    } per game in the 2022-23 season.`;
  } else {
    return `I have averaged ${Player.stats.career[stats[0]]} ${
      stats[1]
    } per game in my career.`;
  }
}

function createScoringHint() {}

function createHometownHint() {}

function createChampionshipsHint() {}

function createFunFactHint() {}

function createTeamHint() {}

function createJerseyNumberHint() {}

function createPositionHint() {}

function createMissingSeasonHint() {}

function createMultipleTeamHint() {}

function createContractHint() {}

function createNicknameHint() {}

function createYearsPlayedHint() {}

function createStartedHint() {}

function createAccoladeHint() {}

function createMeasurablesHint() {}

function createAgeHint() {}

function createShootingHandHint() {}
