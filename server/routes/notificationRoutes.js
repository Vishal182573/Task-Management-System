import { Router } from "express";
const router = Router();

import {
  getAllNotifications,
  getNotificationById,
  getNotificationsByUser,
  updateNotificationReadStatus,
} from "../controllers/notificationControllers.js";

router.get("/", getAllNotifications);

router.get("/getNotificationById", getNotificationById);

router.get("/getNotificationsByUser", getNotificationsByUser);

router.patch("/updateNotificationReadStatus", updateNotificationReadStatus);
export default router;
