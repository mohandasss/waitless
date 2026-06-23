import type { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { isAuthMethod, isOtp, normalizePhone } from "../utils/miscHelpers.js";
import { verifyToken } from "../utils/jwt.js";

export type AuthMethod = "sms" | "whatsapp";



export type RequestUser = {
  id: number;
  phone: string;
  role: string;
}

export const validateSendOtpRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const phone = normalizePhone(req.body.phone);
  const method = req.body.method;

  if (phone.length !== 10) {
    return apiResponse(
      res,
      400,
      "Phone number must be a valid 10-digit string",
      false,
    );
  }

  if (!isAuthMethod(method)) {
    return apiResponse(
      res,
      400,
      'Invalid or missing method. Must be "sms" or "whatsapp"',
      false,
    );
  }

  req.body.phone = phone;
  req.body.method = method;
  next();
};

export const validateVerifyOtpRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const phone = normalizePhone(req.body.phone);
  const method = req.body.method;
  const otp = req.body.otp;

  if (phone.length !== 10) {
    return apiResponse(
      res,
      400,
      "Phone number must be a valid 10-digit string",
      false,
    );
  }

  if (!isAuthMethod(method)) {
    return apiResponse(
      res,
      400,
      'Invalid or missing method. Must be "sms" or "whatsapp"',
      false,
    );
  }

  // if (!isOtp(otp)) {
  //   return apiResponse(res, 400, 'OTP must be a 6-digit number', false);

  // }

  req.body.phone = phone;
  req.body.method = method;
  req.body.otp = otp;
  next();
};

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body)
    console.log(result)
    if (!result.success) {
      return apiResponse(res, 400, result.error.issues[0].message, false, null)
    }

    req.body = result.data

    next()

  }



}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    apiResponse(
      res,
      401,
      "Unauthorized: No token provided",
      false,
      null,
    );
    return;
  }

  try {
    const decoded = verifyToken(
      accessToken
    ) as RequestUser;

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export const IsAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log("running")
  try {
    const user = req.user;
    console.log("dasdasdsd", user)
    if (!user) {
      return apiResponse(
        res,
        401,
        "Unauthorized: No user found",
        false,
        null,
      );
    }
    if (user.role !== "ADMIN") {
      return apiResponse(
        res,
        403,
        "Forbidden: Only admin can perform this action",
        false,
        null,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}
