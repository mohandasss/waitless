import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Waitless Saloon Backend is running', status: 'healthy' });
});

// Import and use routes here when ready
// import appointmentRoutes from './routes/appointments';
// app.use('/api/appointments', appointmentRoutes);

export default app;
