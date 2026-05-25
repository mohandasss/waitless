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
  const response = apiResponse(200, 'Waitless Saloon Backend is running', true, { status: 'healthy' });
  res.status(response.statusCode).json(response.body);
});

// Auth routes
app.use('/auth', authRoutes);

export default app;

