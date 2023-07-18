const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WhoAmISchema = new Schema(
  {
    userID: { type: mongoose.SchemaTypes.ObjectId | null, required: true },
    gameMode: { type: Object, required: true },
    hints: { type: Object, required: true },
    currentRound: { type: Number, required: true },
    currentHint: { type: Number, required: true },
    score: { type: Number, required: true },
    correctPlayer: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhoAmI', WhoAmISchema);
