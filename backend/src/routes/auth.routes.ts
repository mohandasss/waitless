import { Router } from 'express';
import { sendOTPController } from '../controllers/auth.controller.js';

const router = Router();

// POST /auth/send-otp
router.post('/send-otp', sendOTPController);

export default router;

