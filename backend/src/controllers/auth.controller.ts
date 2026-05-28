import type { Request, Response } from "express";
import {
  registerSalonService,
  sendOtpService,
  verifyOtpService,
  rotateRefreshTokenService,
} from "../services/auth.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../utils/cookies.js";

export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { phone, method } = req.body;

    const result = await sendOtpService(phone, method);

    return apiResponse(res, 200, "OTP sent successfully", true, result);
  } catch {
    return apiResponse(res, 500, "Internal server error", false);
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { phone, method, otp } = req.body;
    
    const result = await verifyOtpService(phone, method, otp);
    console.log("OTP verification result:", result);
    if (!result.verified) {
      return apiResponse(res, 401, "Invalid OTP", false);
    }
    setRefreshTokenCookie(res, result.refreshToken, 1000 * 60 * 60 * 24 * 7); // 7 days
    setAccessTokenCookie(res, result.accessToken, 1000 * 60 * 15); // 15 minutes
    return apiResponse(res, 200, "OTP verified successfully", true, result);
  } catch {
    return apiResponse(res, 500, "Internal server error", false);
  }
};

export const registerSalonController = async (req: Request, res: Response) => {
  const { name, saloon_name, address, phone } = req.body;
  console.log("saloon name", saloon_name);
  console.log("Received salon registration request:", {
    name,
    saloon_name,
    address,
    phone,
  });
  try {
    const result = await registerSalonService(
      name,
      saloon_name,
      address,
      phone,
    );
    // console.log("Saloon registration result:", result);
    return apiResponse(res, 200, "Salon registered successfully", true, result);
  } catch {
    return apiResponse(
      res,
      500,
      "Failed controller to register salon",
      false,
      null,
    );
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
 
  try {
    const refreshToken = req.cookies?.refreshToken
    console.log("Received refresh token request with token:", refreshToken);
    if (!refreshToken) {
      return apiResponse(res, 401, "No refresh token", false);
    }

    const result = await rotateRefreshTokenService(refreshToken);

    setRefreshTokenCookie(res, result.refreshToken, 1000 * 60 * 60 * 24 * 7);
    setAccessTokenCookie(res, result.accessToken, 1000 * 60 * 15);

    return apiResponse(res, 200, "Token refreshed", true, { accessToken: result.accessToken });
  } catch (err) {
    console.error("Refresh token error", err);
    return apiResponse(res, 401, "Invalid refresh token", false);
  }
};
