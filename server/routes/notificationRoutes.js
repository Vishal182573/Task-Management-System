import { Router } from 'express';
const router = Router();

import {
  getAllNotifications,
  getNotificationById,
  getNotificationsByInstitute,
} from '../controllers/notificationControllers.js';

router.get('/', getAllNotifications);

router.get('/getNotificationById', getNotificationById);

router.get('/getNotificationsByInstitute', getNotificationsByInstitute);

export default router;
