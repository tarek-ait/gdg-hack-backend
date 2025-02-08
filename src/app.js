import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import projectsRourtes from './routes/projects.js';
import recommendRoutes from './routes/recommend.js';
import emailRoutes from './routes/emails.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use('/api', authRoutes);
app.use('/api', projectsRourtes);
app.use('/api', recommendRoutes);
app.use('/api', emailRoutes);



import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('registerUser', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log('A user disconnected:', socket.id);
  });
});

import Notification from "./db/models/notificationSchema.js";

export const sendNotification = async (receiverId, message) => {
  const newNotification = new Notification({
    userId: receiverId,
    message,
  });
  await newNotification.save();

  // Check if user is online
  if (onlineUsers.has(receiverId)) {
    const socketId = onlineUsers.get(receiverId);
    io.to(socketId).emit('newNotification', newNotification);
  }
};

export { app };
