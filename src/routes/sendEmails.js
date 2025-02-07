import express from 'express'
import {protectRoute} from "../middlewares/auth.js"
import { invite , accept,update} from '../services/sendEmail.js'


const router= express.Router();

router.post("/invite",invite);

router.post("/accept",protectRoute,accept);

router.post("/update",protectRoute,update);

export default router;