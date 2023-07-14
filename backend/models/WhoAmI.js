const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WhoAmISchema = new Schema({
  userID: { type: Object },
});
