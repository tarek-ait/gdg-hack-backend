import express from 'express';
import { protectRoute } from '../middlewares/auth.js';
import {getAllNotifications, getUnreadNotifications, readNotification, readAllNotifications} from '../services/notifications.js';

const router = express.Router();

router.get('/notifications/:id', protectRoute, getAllNotifications);

router.get('/notifications/:userId/unread', protectRoute, getUnreadNotifications);

router.put('/notifications/:notificationId/read',protectRoute, readNotification);

router.put('/notifications/:userId/read-all',protectRoute, readAllNotifications);

export default router;
