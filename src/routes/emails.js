import express from 'express';
import { protectRoute } from '../middlewares/auth.js';
import { invitation, refused,request, accepted } from '../services/email.js';


const router = express.Router();

router.post('/email/accepted', protectRoute, accepted);


router.post('/email/refused', protectRoute, refused);


router.post('/email/invitation', protectRoute, invitation);


router.post('/email/request', protectRoute, request);

export default router;
