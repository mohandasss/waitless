import type { Request, Response } from 'express';
import { sendOTP, verifyOTP } from '../services/auth.service.js';
import { apiResponse } from '../utils/apiResponse.js';
import { setRefreshTokenCookie } from '../utils/cookies.js';
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

    // Set refresh token as secure httpOnly cookie and return access token in body
    try {
      const refreshToken = (result as any).refreshToken as string | undefined;
      const refreshTokenExpiresIn = (result as any).refreshTokenExpiresIn as string | undefined;

      const cookieMaxAge = parseExpiryToMs(refreshTokenExpiresIn || process.env.JWT_REFRESH_EXPIRES || '7d');

      if (refreshToken) {
        setRefreshTokenCookie(res, refreshToken, cookieMaxAge);
      }
    } catch (cookieErr) {
      console.warn('Failed to set refresh token cookie', cookieErr);
    }

    // Return access token and verification info
    const payload = {
      accessToken: (result as any).accessToken,
      accessTokenExpiresIn: (result as any).accessTokenExpiresIn,
      provider: (result as any).provider,
      method: (result as any).method,
      phone: (result as any).phone,
      verified: true,
    };

    const response = apiResponse(200, 'OTP verified successfully', true, payload);
    return res.status(response.statusCode).json(response.body);
  } catch (error: any) {
    console.error('[AuthController] Error in verifyOTP:', error);
    const response = apiResponse(500, 'Internal server error', false);
    return res.status(response.statusCode).json(response.body);
  }
};

const parseExpiryToMs = (expiry: string) => {
  const m = expiry.match(/^(\d+)(s|m|h|d)?$/);
  if (!m) return 7 * 24 * 60 * 60 * 1000;
  const value = Number(m[1]);
  const unit = m[2] || 's';
  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return value * 1000;
  }
};

