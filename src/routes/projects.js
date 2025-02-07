import express from 'express';
import {createProject,joinProject,getProjects,acceptRequest,refuseRequest,invite} from '../services/projects.js'
import { protectRoute } from '../middlewares/auth.js';



const router=express.Router();

router.post('/projects',protectRoute, createProject);

router.post('/projects/:id/join',protectRoute,joinProject)

router.get('/projects',protectRoute, getProjects);

router.post('/projects/:id/accept',protectRoute,acceptRequest)

router.post('/projects/:id/refuse',protectRoute,refuseRequest)

router.post('/projects/:id/invite',protectRoute,invite)



export default router;
