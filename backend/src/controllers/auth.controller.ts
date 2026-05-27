import type { Request, Response } from "express";
import { saloonRegisterService, sendOTP, verifyOTP } from "../services/auth.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { setAccessTokenCookie as setRefreshTokenCookie } from "../utils/cookies.js";
import { parseExpiryToMs } from "../utils/jwt.js";

export const sendOTPController = async (req: Request, res: Response) => {
  try {
    const { phone, method } = req.body;

    const result = await sendOTP(phone, method);

    return apiResponse(res, 200, "OTP sent successfully", true, result);
  } catch (error: unknown) {
    console.error("[AuthController] Error in sendOTP:", error);
    return apiResponse(res, 500, "Internal server error", false);
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { phone, method, otp } = req.body;

    const result = await verifyOTP(phone, method, otp);

    if (!result.verified) {
      return apiResponse(res, 401, "Invalid OTP", false);
    }

    // Set refresh token as secure httpOnly cookie and return access token in body
    try {
      const refreshToken = result.refreshToken as string | undefined;
      const refreshTokenExpiresIn = result.refreshTokenExpiresIn as
        | string
        | undefined;

      const cookieMaxAge = parseExpiryToMs(
        refreshTokenExpiresIn || process.env.JWT_REFRESH_EXPIRES || "7d",
      );

      if (refreshToken) {
        setRefreshTokenCookie(res, refreshToken, cookieMaxAge);
      }
    } catch (cookieErr) {
      console.warn("Failed to set refresh token cookie", cookieErr);
    }

    // Return access token and verification info
    const payload = {
      accessToken: result.accessToken,
      accessTokenExpiresIn: result.accessTokenExpiresIn,
      provider: result.provider,
      method: result.method,
      phone: result.phone,
      verified: true,
    };

    return apiResponse(res, 200, "OTP verified successfully", true, payload);
  } catch (error: any) {
    console.error("[AuthController] Error in verifyOTP:", error);
    return apiResponse(res, 500, "Internal server error", false);
  }
};

export const saloonRegisterController = async (req: Request, res: Response) => {
  console.log("reqsdasdasdasq", req.body);
  const { name, saloon_name, address, phone } = req.body;
  try {
      await saloonRegisterService(name, saloon_name, address, phone);
      return apiResponse(res, 200, "Saloon registered successfully", true, null);


  } catch (error) {



  }
}
  
