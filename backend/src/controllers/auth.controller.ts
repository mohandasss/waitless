import type { Request, Response } from 'express';
import { sendOTP, verifyOTP } from '../services/auth.service.js';
import { apiResponse } from '../utils/apiResponse.js';

export const sendOTPController = async (req: Request, res: Response) => {
  try {
    const { phone, method } = req.body;

    const result = await sendOTP(phone, method);

    const response = apiResponse(200, 'OTP sent successfully', true, result);
    return res.status(response.statusCode).json(response.body);
  } catch (error: any) {
    console.error('[AuthController] Error in sendOTP:', error);
    const response = apiResponse(500, 'Internal server error', false);
    return res.status(response.statusCode).json(response.body);
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { phone, method, otp } = req.body;

    const result = await verifyOTP(phone, method, otp);

    if (!result.verified) {
      const response = apiResponse(400, 'Invalid or expired OTP', false, result);
      return res.status(response.statusCode).json(response.body);
    }

    const response = apiResponse(200, 'OTP verified successfully', true, result);
    return res.status(response.statusCode).json(response.body);
  } catch (error: any) {
    console.error('[AuthController] Error in verifyOTP:', error);
    const response = apiResponse(500, 'Internal server error', false);
    return res.status(response.statusCode).json(response.body);
  }
};

