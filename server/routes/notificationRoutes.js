import { Router } from 'express';
const router = Router();

import { getAllNotifications, getNotificationById, createNotification } from '../controllers/notificationControllers.js';

router.get('/', getAllNotifications);

router.get('/getNotificationById', getNotificationById);

router.post('/', createNotification);

export default router;
