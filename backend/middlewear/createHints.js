const { format, formatDistanceStrict } = require('date-fns');

module.exports = function createHints(sport, Player) {
  console.log(Player);
  console.log(createDraftHint(Player, 4));
  console.log(createDraftHint(Player, 1));
  console.log(createDebutHint(Player, 4));
  console.log(createDebutHint(Player, 1));
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
      'MMMM dd, yyyy'
    )} at the age of ${formatDistanceStrict(Player.debut, new Date(), {
      unit: 'years days',
    })}`;
  }
}

function createStatHint() {}

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
