import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';

const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({});
  return res.json(notifications);
});

const getNotificationById = asyncHandler(async (req, res) => {
  const notificationId = req.query.id;

  if (!notificationId) {
    return res.status(400).json({ message: 'Notification ID is required' });
  }
  const notification = await Notification.findOne({
    notificationId,
  });
  if (notification) {
    return res.json(notification);
  } else {
    return res.status(404).json({ message: 'Notification not found' });
  }
});

const createNotification = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const notificationId = `N-${Math.floor(1000 + Math.random() * 9000)}`;

  const notification = new Notification({
    notificationId,
    title,
    description,
    status,
  });

  await notification.save();
  return res.json(notification);
});

export { getAllNotifications, getNotificationById, createNotification };