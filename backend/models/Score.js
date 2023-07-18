const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  userID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  score: { type: Number, required: true },
  gameMode: { type: Object, reqiuired: true },
});

module.exports = mongoose.model('Score', ScoreSchema);
