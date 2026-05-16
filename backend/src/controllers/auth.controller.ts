import type { Request, Response } from 'express';
import { sendOTP } from '../services/auth.service.js';

export const sendOTPController = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  try {
    const { phone, method } = req.body;

    // Basic validation
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
        data: {}
      });
    }

    if (!method || (method !== 'sms' && method !== 'whatsapp')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing method. Must be "sms" or "whatsapp"',
        data: {}
      });
    }

    // Call service
    const result = await sendOTP(phone, method);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: result
    });
  } catch (error: any) {
    console.error('[AuthController] Error in sendOTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: {}
    });
  }
};

