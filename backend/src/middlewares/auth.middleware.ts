import type { NextFunction, Request, Response } from 'express';
import { apiResponse } from '../utils/apiResponse.js';
import { isAuthMethod, isOtp, normalizePhone } from '../utils/miscHelpers.js';

export type AuthMethod = 'sms' | 'whatsapp';





export const validateSendOtpRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const phone = normalizePhone(req.body.phone);
  const method = req.body.method;

  if (phone.length !== 10) {
    return apiResponse(res, 400, 'Phone number must be a valid 10-digit string', false);
  }

  if (!isAuthMethod(method)) {
    return apiResponse(res, 400, 'Invalid or missing method. Must be "sms" or "whatsapp"', false);
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
    return apiResponse(res, 400, 'Phone number must be a valid 10-digit string', false);
  }

  if (!isAuthMethod(method)) {
    return apiResponse(res, 400, 'Invalid or missing method. Must be "sms" or "whatsapp"', false);
      
  }

  if (!isOtp(otp)) {
    return apiResponse(res, 400, 'OTP must be a 6-digit number', false);
   
  }

  req.body.phone = phone;
  req.body.method = method;
  req.body.otp = otp;
  next();
};

export const RegisterSaloonRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {name,saloon_name , address , phone} = req.body

  if (phone.length !== 10) {
    return apiResponse(res, 400, 'Phone number must be a valid 10-digit string', false);
  }

  

  req.body.phone = phone;
  req.body.name = name;
  req.body.address = address;
  req.body.saloon_name = saloon_name;

  next();
};