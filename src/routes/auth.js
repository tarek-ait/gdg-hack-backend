import express from 'express';
import {signup,login,logout,checkAuth} from '../services/auth.js'
import { protectRoute } from '../middlewares/auth.js';

const router = express.Router();

router.get('/signup', signup);

router.post('/login', login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;