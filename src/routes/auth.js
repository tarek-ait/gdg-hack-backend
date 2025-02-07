import express from 'express';
import {signup,login,logout,checkAuth,updateProfile,getUserProfile, addFieldOfInterest,getUsers} from '../services/auth.js'
import { protectRoute } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

router.put("/update", protectRoute, updateProfile);

router.get("/getProfile",protectRoute,getUserProfile);

router.post("/fields",protectRoute,addFieldOfInterest);

router.get("/users",protectRoute,getUsers);

export default router;