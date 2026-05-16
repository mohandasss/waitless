import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Waitless Saloon Backend is running', status: 'healthy' });
});

// Auth routes
app.use('/auth', authRoutes);

export default app;

