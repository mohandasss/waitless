import type { NextFunction, Request, Response } from 'express';
import { apiResponse } from '../utils/apiResponse.js';

type AuthMethod = 'sms' | 'whatsapp';

const isAuthMethod = (value: unknown): value is AuthMethod =>
  value === 'sms' || value === 'whatsapp';

const isOtp = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9]{6}$/.test(value);

const normalizePhone = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

export const validateSendOtpRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const phone = normalizePhone(req.body.phone);
  const method = req.body.method;

  if (phone.length !== 10) {
    const response = apiResponse(400, 'Phone number must be a valid 10-digit string', false);
    return res.status(response.statusCode).json(response.body);
  }

  if (!isAuthMethod(method)) {
    const response = apiResponse(400, 'Invalid or missing method. Must be "sms" or "whatsapp"', false);
    return res.status(response.statusCode).json(response.body);
  }

  req.body.phone = phone;
  req.body.method = method;
  next();
};

export const validateVerifyOtpRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const phone = normalizePhone(req.body.phone);
  const method = req.body.method;
  const otp = req.body.otp;

  if (phone.length !== 10) {
    const response = apiResponse(400, 'Phone number must be a valid 10-digit string', false);
    return res.status(response.statusCode).json(response.body);
  }

  if (!isAuthMethod(method)) {
    const response = apiResponse(400, 'Invalid or missing method. Must be "sms" or "whatsapp"', false);
    return res.status(response.statusCode).json(response.body);
  }

  if (!isOtp(otp)) {
    const response = apiResponse(400, 'OTP must be a 6-digit number', false);
    return res.status(response.statusCode).json(response.body);
  }

  req.body.phone = phone;
  req.body.method = method;
  req.body.otp = otp;
  next();
};