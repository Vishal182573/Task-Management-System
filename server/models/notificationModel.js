import { Schema, model } from 'mongoose';
const notificationSchema = new Schema({
  notificationId: {
    type: String,
    unique: true,
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