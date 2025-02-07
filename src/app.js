import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import projectsRourtes from './routes/projects.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));

app.use('/api', authRoutes);
app.use('/api', projectsRourtes);

export {app}
