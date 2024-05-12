const mongoose = require('mongoose');
const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  logo: {
    type: String,
  },
  nodalOfficer: {
    type: String,
  },
  reportingOfficer: {
    type: String,
  },
  tasks: {
    type: [String],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Institute', instituteSchema);
