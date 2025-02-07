import express from 'express';
import { protectRoute } from '../middlewares/auth.js';
import { projects,teammates } from '../services/recommend.js';

const router = express.Router();

router.post('/recommendations/projects', protectRoute,projects);

router.post('/recommendations/teammates', protectRoute, teammates);

export default router;
