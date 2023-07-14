const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WhoAmISchema = new Schema(
  {
    userID: { type: mongoose.SchemaTypes.ObjectId, required: true },
    gameMode: { type: Object, required: true },
    hints: { type: Object, required: true },
    currentRound: { type: Number, required: true },
    currentHint: { type: Number, required: true },
    score: { type: Number, required: true },
    correctPlayer: { type: mongoose.SchemaTypes.ObjectId, required: true },
  },
  { timestamps: true }
);
