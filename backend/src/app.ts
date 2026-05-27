import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { apiResponse } from './utils/apiResponse.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  return apiResponse(res , 200 , "working" , true , null )
});

// Auth routes
app.use('/auth', authRoutes);

export default app;

