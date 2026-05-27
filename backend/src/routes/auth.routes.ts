import { Router } from 'express';
import { saloonRegisterController, sendOTPController, verifyOTPController } from '../controllers/auth.controller.js';
import { RegisterSaloonRequest, validateSendOtpRequest, validateVerifyOtpRequest } from '../middlewares/auth.middleware.js';
import { otpRateLimiter } from '../utils/ratelimiter.js';

const router = Router();

// POST /auth/send-otp
router.post('/login',  validateSendOtpRequest, otpRateLimiter, sendOTPController);
router.post('/register',  RegisterSaloonRequest, saloonRegisterController);

// POST /auth/verify-otp
router.post('/verify-otp', validateVerifyOtpRequest, otpRateLimiter, verifyOTPController);

export default router;

