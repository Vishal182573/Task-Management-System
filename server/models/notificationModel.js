import { Schema, model } from 'mongoose';
const notificationSchema = new Schema({
  taskId: {
    type: String,
    // unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  type: {
    type: String,
  },
  institute: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default model('Notification', notificationSchema);
