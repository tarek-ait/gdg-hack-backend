import express from 'express';
import {createProject,joinProject,getProjects,acceptRequest} from '../services/projects.js'
import { protectRoute } from '../middlewares/auth.js';



const router=express.Router();

router.post('/projects',protectRoute, createProject);

router.post('/projects/:id/join',protectRoute,joinProject)

router.get('/projects',protectRoute, getProjects);

router.post('/projects/:id/accept',protectRoute,acceptRequest)



export default router;
