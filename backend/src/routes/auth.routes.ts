import { Router } from 'express';
import { registerSalonController, sendOtpController, verifyOtpController, refreshTokenController } from '../controllers/auth.controller.js';
import { RegisterSaloonRequest, validateSendOtpRequest, validateVerifyOtpRequest } from '../middlewares/auth.middleware.js';
import { otpRateLimiter } from '../utils/ratelimiter.js';
    import { upload , uploadToCloudinary } from '../utils/imageUploadUtil.js';
    const router = Router();

    // POST /auth/send-otp
    router.post('/login',  validateSendOtpRequest, otpRateLimiter, sendOtpController);
    router.post(
  "/register",
  upload.single("imageUrl" ),
  RegisterSaloonRequest,
  uploadToCloudinary,
  registerSalonController
);

// POST /auth/verify-otp
router.post('/verify-otp', validateVerifyOtpRequest, verifyOtpController);
router.post('/refresh', refreshTokenController);

export default router;

