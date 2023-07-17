const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NBAPlayerSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  jerseyNumbers: { type: Array, required: true },
  picture: { type: String, required: true, maxLength: 100 },
  positions: { type: Array, required: true },
  height: { type: String, required: true, minLength: 1, maxLength: 5 },
  weight: { type: Number, required: true },
  nicknames: { type: Array, required: true },
  championships: { type: Number, required: true },
  mvps: { type: Number, required: true },
  allStars: { type: Number, required: true },
  accolades: { type: Array, required: true },
  stats: { type: Object, required: true },
  funFacts: { type: Array, required: true },
  shootingHand: { type: String, required: true },
  college: { type: String, required: false },
  birthplace: { type: String, required: true, maxLength: 50 },
  birthdate: { type: Date, required: true },
  draftPick: { type: Number, required: true },
  draftYear: { type: Number, required: true },
  draftTeam: { type: String, required: false, maxLength: 50 },
  debut: { type: Date, required: false },
  recentSalary: { type: Number, required: false },
  careerEarnings: { type: Number, required: false },
  careerLength: { type: Number, required: true },
});

NBAPlayerSchema.virtual('yearsPlayed').get(function () {
  return Object.keys(this.stats).length - 1;
});

module.exports = mongoose.model('NBAPlayer', NBAPlayerSchema);
