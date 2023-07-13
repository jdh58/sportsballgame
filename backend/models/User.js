const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    scores: { type: Object, required: false },
    badges: { type: Object, required: false },
  },
  { timestamp: true }
);

// Implement this later
// UserSchema.virtual('sign up date')

export default mongoose.model('User', UserSchema);
