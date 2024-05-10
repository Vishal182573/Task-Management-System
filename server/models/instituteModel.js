const mongoose = require('mongoose');
const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  nodalOfficer: {
    type: String,
    required: true,
  },
  reportingOfficer: {
    type: String,
  },
  tasks: {
    type: [String],
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Institute', instituteSchema);
