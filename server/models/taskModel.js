const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
  },
  startingDate: {
    type: Date,
  },
  endingDate: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
