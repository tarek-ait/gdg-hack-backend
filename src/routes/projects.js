import express from 'express';
import {createProject,joinProject} from '../services/projects.js'
import { protectRoute } from '../middlewares/auth.js';



const router=express.Router();

router.post('/projects',protectRoute, createProject);

router.post('/projects/:id/join',protectRoute,joinProject)

export default router;
