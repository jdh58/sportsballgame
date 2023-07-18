const { format, differenceInDays, differenceInYears } = require('date-fns');

module.exports = function createHints(sport, Player) {
  const alreadyUsedHints = [];
  const hints = [];
  let hintsLeft = 4;

  let hint;
  let randomSelector;

  // Get hints until we get 3
  // HintsLeft will be used as our difficulty
  while (hintsLeft > 1) {
    // Get a random number and new hintuntil it's not already used and the hint is valid
    do {
      randomSelector = Math.floor(Math.random() * hintFunctions.length);
      hint = hintFunctions[randomSelector](Player, hintsLeft);
    } while (alreadyUsedHints.includes(randomSelector) || hint === -1);

    // Update the hints and make sure we don't use the same one
    alreadyUsedHints.push(randomSelector);
    hints.push(hint);
    hintsLeft -= 1;
  }

  // Last hint will always be an easy one
  do {
    randomSelector = Math.floor(Math.random() * easyHintFunctions.length);
    hint = easyHintFunctions[randomSelector](Player, hintsLeft);
  } while (hint === -1);

  hintsLeft -= 1;
  hints.push(hint);

  return hints;
};

const easyHintFunctions = [createTeamHint, createAccoladeHint];

const hintFunctions = [
  createDraftHint,
  createDebutHint,
  createStatHint,
  createScoringHint,
  createHometownHint,
  createChampionshipsHint,
  createFunFactHint,
  createJerseyNumberHint,
  createPositionHint,
  createMissingSeasonHint,
  createContractHint,
  createNicknameHint,
  createStartedHint,
  createAccoladeHint,
  createShootingHandHint,
  createNameHint,
  createHyphenHint,
  createCollegeHint,
];

function createDraftHint(Player, difficulty) {
  // If they were drafted, use difficulty to choose between the info given
  if (Player.draftPick < 0) {
    return 'I went undrafted.';
  }

  if (difficulty > 2) {
    return `I was drafted with pick number ${Player.draftPick}.`;
  } else {
    return `I was drafted with pick number ${Player.draftPick} in the ${Player.draftYear} draft.`;
  }
}

function createDebutHint(Player, difficulty) {
  const randomSelector = Math.floor(Math.random() * 3);

  // Select either debut age or current age
  if (randomSelector === 0) {
    // // Give up more info if the difficulty is lower
    // if (difficulty > 2) {
    //   return `I made my debut on ${format(Player.debut, 'MMMM d, yyyy')}.`;
    // } else {
    return `I made my debut on ${format(
      Player.debut,
      'MMMM d, yyyy'
    )} at the age of ${differenceInYears(
      Player.debut,
      Player.birthdate
    )} years and ${
      differenceInDays(Player.debut, Player.birthdate) % 365
    } days.`;
  } else if (randomSelector === 1) {
    // Give current age
    return `I am ${differenceInYears(new Date(), Player.birthdate)} years and ${
      differenceInDays(new Date(), Player.birthdate) % 365
    } days old.`;
  } else {
    const statsList = Player.stats;

    let seasonCount = 0;

    for (let season in statsList) {
      if (season !== 'career') {
        seasonCount++;
      }
    }

    return `I have played for ${seasonCount} seasons.`;
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
    } per game last season.`;
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
    } attemps per game last season.`;
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
  )} last season.`;
}

function createJerseyNumberHint(Player, difficulty) {
  // Not really a good first hint or very easy one
  if (difficulty === 4 || difficulty === 1) {
    return -1;
  }

  if (Player.jerseyNumbers.length === 1) {
    return `I have only worn the jersey number ${Player.jerseyNumbers[0]}.`;
  } else {
    return `I have worn the jersey numbers ${Player.jerseyNumbers
      .join(', ')
      .trim()}.`;
  }
}

function createPositionHint(Player, difficulty) {
  if (difficulty === 4) {
    return -1;
  }

  const randomSelector = Math.floor(Math.random() * 2);

  // Randomly select between measurables or positions
  if (randomSelector === 0) {
    if (Player.positions.length === 1) {
      return `The position I play is ${Player.positions[0]}.`;
    } else {
      return `The positions I play are ${Player.positions.join(' and ')}.`;
    }
  } else {
    return `I am ${Player.height} and ${Player.weight} pounds.`;
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
      return -1;
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
    return `I have made $${Player.careerEarnings.toLocaleString(
      'en-US'
    )} in my career.`;
  } else {
    return `I was paid $${Player.recentSalary.toLocaleString(
      'en-US'
    )} last season.`;
  }
}

function createNicknameHint(Player, difficulty) {
  if (Player.nicknames.length === 0) {
    return -1;
  }

  const randomSelector = Math.floor(Math.random() * Player.nicknames.length);

  return `I have the nickname ${Player.nicknames[randomSelector]}.`;
}

function createStartedHint(Player, difficulty) {
  const randomSelector = Math.floor(Math.random() * 2);

  if (randomSelector === 0) {
    return `I started in ${Player.stats['2022-23'].games_started} of my ${Player.stats['2022-23'].games} games last season.`;
  } else {
    const percentStarted = (
      (Player.stats.career.games_started / Player.stats.career.games) *
      100
    ).toFixed(1);

    return `I have started in ${percentStarted}% of my career games.`;
  }
}

function createAccoladeHint(Player, difficulty) {
  const accolades = Player.accolades;

  if (difficulty === 1 && accolades.length >= 3) {
    return `My accolades are ${accolades.join(', ').trim()}.`;
  } else if (difficulty === 1) {
    return -1;
  }

  if (Player.mvps === 0 && Player.allStars === 0) {
    return -1;
  }

  const randomSelector = Math.floor(Math.random() * 2);

  if (randomSelector === 0 && Player.mvps > 0) {
    return `I am a ${Player.mvps} time MVP.`;
  } else if (Player.allStars > 0) {
    return `I am a ${Player.allStars} time all-star.`;
  }
}

function createShootingHandHint(Player, difficulty) {
  // If they're right handed or first hint it's lame

  // if (difficulty === 4) {
  //   return -1;
  // }

  if (Player.shootingHand === 'Right') {
    return -1;
  } else {
    return `I am ${Player.shootingHand.toLowerCase()} handed.`;
  }
}

function createNameHint(Player, difficulty) {
  const randomSelector = Math.floor(Math.random() * 2);

  if (randomSelector === 0) {
    return `My first name starts with ${Player.name.charAt(0)}.`;
  } else {
    return `My last name starts with ${Player.name.split(' ')[1].charAt(0)}.`;
  }
}

function createHyphenHint(Player, difficulty) {
  if (/-/.test(Player.name)) {
    return `My last name is hyphenated.`;
  } else {
    return -1;
  }
}

function createCollegeHint(Player, difficulty) {
  if (Player.college.length <= 0) {
    return `I did not go to college.`;
  }

  // If they went to multiple colleges, split them
  if (/,/.test(Player.college)) {
    const colleges = Player.college.split(', ');

    return `I went to ${colleges.join(' and ')} for college.`;
  }
  return `I went to ${Player.college} for college.`;
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
