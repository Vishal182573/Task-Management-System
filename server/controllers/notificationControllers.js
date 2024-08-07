import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";
import Institute from "../models/instituteModel.js";

const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({});
  return res.json(notifications);
});

const getNotificationById = asyncHandler(async (req, res) => {
  const notificationId = req.query.id;

  if (!notificationId) {
    return res.status(400).json({ message: "Notification ID is required" });
  }
  const notification = await Notification.findOne({
    notificationId,
  });
  if (notification) {
    return res.json(notification);
  } else {
    return res.status(404).json({ message: "Notification not found" });
  }
});

const getNotificationsByInstitute = asyncHandler(async (req, res) => {
  const {institute} = req.query;

  if (!institute) {
    return res.status(400).json({ message: "userId name is required" });
  }

  const notifications = await Notification.find({
    institute
  });

  return res.json(notifications);
});

const updateNotificationReadStatus = asyncHandler(async (req, res) => {
  const notificationId = req.query.notificationId;
  if (!notificationId) {
    return res
      .status(400)
      .json({ message: "Notification Id name is required" });
  }

  const notification = await Notification.findOne({
    _id: notificationId,
  });

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  if (notification) {
    notification.isRead = true;
    notification.save();
  }

  return res.sendStatus(200);
});

export {
  getAllNotifications,
  getNotificationById,
  getNotificationsByInstitute,
  updateNotificationReadStatus,
};
