import type { NextFunction, Request, Response } from "express";
import {
  registerSalonService,
  sendOtpService,
  verifyOtpService,
  rotateRefreshTokenService,
} from "../../services/auth.service.js";
import { apiResponse } from "../../utils/apiResponse.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookies.js";

//sending otp to user
export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { phone, method } = req.body;

    const result = await sendOtpService(phone, method);

    return apiResponse(res, 200, "OTP sent successfully", true, result);
  } catch {
    return apiResponse(res, 500, "Internal server error", false);
  }
};

//verifying otp
export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { phone, method, otp } = req.body;

    const result = await verifyOtpService(phone, method, otp);

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

//registering salon
export const registerSalonController = async (req: Request, res: Response) => {
  const { name, saloon_name, address, phone } = req.body;
  console.log("Received salon registration request:", {
    name,
    saloon_name,
    address,
    phone,
  });

  const cloudinaryUrls = req.body.imageUrl;
  console.log("Received cloudinary URLs:", cloudinaryUrls);
  console.log("saloon name", cloudinaryUrls);
  console.log("Received salon registration request:", {
    name,
    saloon_name,
    address,
    phone,
    cloudinaryUrls,
  });
  try {
    const result = await registerSalonService(
      name,
      saloon_name,
      address,
      phone,
      cloudinaryUrls,
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

//refreshing token
export const refreshTokenController = async (req: Request, res: Response , next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log("Received refresh token request with token:", refreshToken);
    if (!refreshToken) {
      return apiResponse(res, 401, "No refresh token", false);
    }

    const result = await rotateRefreshTokenService(refreshToken);

    setRefreshTokenCookie(res, result.refreshToken, 1000 * 60 * 60 * 24 * 7);
    setAccessTokenCookie(res, result.accessToken, 1000 * 60 * 15);

    return apiResponse(res, 200, "Token refreshed", true, {
      accessToken: result.accessToken,
    });
  } catch (err) {
    next(err);
  }
};
