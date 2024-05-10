const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: 'User ID is required',
  },
  name: {
    type: String,
    required: 'Name is required',
  },
  email: {
    type: String,
    required: 'Email is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  role: {
    type: String,
    required: 'Role is required',
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
