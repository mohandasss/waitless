import { Router } from 'express';
import { sendOTPController, verifyOTPController } from '../controllers/auth.controller.js';
import { validateSendOtpRequest, validateVerifyOtpRequest } from '../middlewares/auth.middleware.js';

const router = Router();

// POST /auth/send-otp
router.post('/send-otp', validateSendOtpRequest, sendOTPController);

// POST /auth/verify-otp
router.post('/verify-otp', validateVerifyOtpRequest, verifyOTPController);

export default router;

