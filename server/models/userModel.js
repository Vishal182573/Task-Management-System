const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  photographUri: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('User', userSchema);
