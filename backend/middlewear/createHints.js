const { format, differenceInDays, differenceInYears } = require('date-fns');

module.exports = function createHints(sport, Player) {
  console.log(Player.name);
  console.log(createDraftHint(Player, 4));
  console.log(createDraftHint(Player, 1));
  console.log(createDebutHint(Player, 4));
  console.log(createDebutHint(Player, 1));
  console.log(createStatHint(Player, 1));
  console.log(createScoringHint(Player, 1));
  console.log(createHometownHint(Player, 1));
  console.log(createChampionshipsHint(Player, 1));
  console.log(createFunFactHint(Player, 1));
  console.log(createTeamHint(Player, 1));
  console.log(createJerseyNumberHint(Player, 1));
  console.log(createPositionHint(Player, 1));
  console.log(createMissingSeasonHint(Player, 1));
  console.log(createContractHint(Player, 1));
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
  createContractHint,
  createNicknameHint,
  createYearsPlayedHint,
  createStartedHint,
  createAccoladeHint,
  createMeasurablesHint,
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
  const randomSelector = Math.floor(Math.random() * 2);

  // Select either debut age or current age
  if (randomSelector === 0) {
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
  } else {
    // Give current age
    return `I am ${differenceInYears(new Date(), Player.birthdate)} years and ${
      differenceInDays(new Date(), Player.birthdate) % 365
    } days old.`;
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

function createScoringHint(Player, difficulty) {
  const randomSelector1 = Math.floor(Math.random() * 2);
  const randomSelector2 = Math.floor(Math.random() * 4);

  let shotType;

  switch (randomSelector2) {
    case 0:
      shotType = ['the free throw line', 'fta', 'ft_pct'];
      break;
    case 1:
      shotType = ['the field', 'fga', 'fg_pct'];
      break;
    case 2:
      shotType = ['two', '2pa', '2p_pct'];
      break;
    case 3:
      shotType = ['three', '3pa', '3p_pct'];
      break;
  }

  if (randomSelector1 === 0) {
    return `I shot ${(Player.stats['2022-23'][shotType[2]] * 100).toFixed(
      1
    )}% from ${shotType[0]} on ${
      Player.stats['2022-23'][shotType[1]]
    } attemps per game in the 2022-23 season.`;
  } else {
    return `I have shot ${(Player.stats.career[shotType[2]] * 100).toFixed(
      1
    )}% from ${shotType[0]} on ${
      Player.stats.career[shotType[1]]
    } attemps per game in my career.`;
  }
}

function createHometownHint(Player, difficulty) {
  // This hint isn't too helpful unless they're from outside the US, so don't
  // use it on low difficulty levels.
  let isUS = false;

  for (let i = 0; i < states.length; i++) {
    const stateRegEx = RegExp(states[i]);
    if (stateRegEx.test(Player.birthplace)) {
      isUS = true;
      break;
    }
  }

  if (difficulty <= 2 && isUS) {
    return -1;
  }

  // Otherwise, either difficulty is high enough or it is useful enough to use
  return `I was born in ${Player.birthplace}.`;
}

function createChampionshipsHint(Player, difficulty) {
  const championships = Player.championships;

  if (difficulty === 4 || championships === 0) {
    return -1;
  }

  // Anti plural
  if (championships === 1) {
    return `I have won ${championships} NBA championship.`;
  }

  return `I have won ${championships} NBA championships.`;
}

function createFunFactHint(Player, difficulty) {
  const { funFacts } = Player;

  // They have to have a fun fact to use
  if (funFacts.length === 0) {
    return -1;
  }

  const randomSelector = Math.floor(Math.random() * funFacts.length);

  return funFacts[randomSelector];
}

function createTeamHint(Player, difficulty) {
  // This isn't a good first hint, so return if it's the start
  if (difficulty === 4) {
    return -1;
  }

  return `I played for ${Player.stats['2022-23'].teams.join(
    ' and '
  )} in the 2022-23 season.`;
}

function createJerseyNumberHint(Player, difficulty) {
  // Not really a good first hint or very easy one
  if (difficulty === 4 || difficulty === 1) {
    return -1;
  }

  if (Player.jerseyNumbers.length === 1) {
    return `I have only worn the jersey number ${Player.jerseyNumbers[0]}.`;
  } else {
    return `I have worn the jersey numbers ${Player.jerseyNumbers.join(', ')}`;
  }
}

function createPositionHint(Player, difficulty) {
  if (difficulty === 4) {
    return -1;
  }

  if (Player.positions.length === 1) {
    return `The position I play is ${Player.positions[0]}`;
  } else {
    return `The positions I play are ${Player.positions.join(' and ')}`;
  }
}

function createMissingSeasonHint(Player, difficulty) {
  const statsList = Player.stats;

  let prevSeason = null;
  let missedSeasons = 0;
  let firstMissed = null;

  for (let season in statsList) {
    // We don't want career to interfere
    if (season === 'career') {
      return;
    }

    const seasonNumber = parseInt(season.split(4)) + 1;

    // If this isn't their rookie season
    if (prevSeason) {
      // And if they did not play two seasons in order
      if (seasonNumber - prevSeason !== 1) {
        missedSeasons = seasonNumber - prevSeason;
        firstMissed = prevSeason + 1;
      }
    }

    // Prepare for next loop
    prevSeason = seasonNumber;
  }

  // Now, if they didn't miss a season, return -1
  if (missedSeasons === 0) {
    return -1;
  }

  const missedList = [];

  for (let i = 0; i < missedSeasons; i++) {
    missedList.push(firstMissed + i);
  }

  // Otherwise, give the proper message based on how many missed
  if (missedSeasons === 1) {
    return `I missed the entire ${missedList[0]} season.`;
  } else {
    return `I missed then enitre ${missedList.join(' and ')} seasons.`;
  }
}

function createContractHint(Player, difficulty) {
  // Randomly select between career earnings and recent salary
  const randomSelector = Math.floor(Math.random() * 2);

  if (randomSelector === 0) {
    return `I have made ${Player.careerEarnings} money in my career.`;
  } else {
    return `I was paid ${Player.recentSalary} money in the 2022-23 season.`;
  }
}

function createNicknameHint(Player, difficulty) {
  if (Player.nicknames.length === 0) {
    return -1;
  }

  const randomSelector = Math.floor(Math.random() * Player.nicknames.length);

  return `I have the nickname ${Player.nicknames[randomSelector]}.`;
}

function createYearsPlayedHint() {}

function createStartedHint() {}

function createAccoladeHint() {}

function createMeasurablesHint() {}

function createShootingHandHint(Player, difficulty) {
  // If they're right handed it's lame
  if (Player.shootingHand === 'right') {
    return -1;
  } else {
    return `I am ${Player.shootingHand} handed`;
  }
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
