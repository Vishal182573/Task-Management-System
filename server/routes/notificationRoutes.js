import { Router } from "express";
const router = Router();

import {
  getAllNotifications,
  getNotificationById,
  getNotificationsByInstitute,
  updateNotificationReadStatus,
} from "../controllers/notificationControllers.js";

router.get("/", getAllNotifications);

router.get("/getNotificationById", getNotificationById);

router.get("/getNotificationsByInstitute", getNotificationsByInstitute);

router.patch("/updateNotificationReadStatus", updateNotificationReadStatus);
export default router;
