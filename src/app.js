import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import emailroutes from './routes/sendEmails.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));

app.use('/api/auth', authRoutes);
app.use('/api/mail',emailroutes);

export {app}
