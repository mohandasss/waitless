import type { Request, Response } from "express";
import { saloonRegisterService, sendOTP, verifyOTP } from "../services/auth.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { setAccessTokenCookie as setRefreshTokenCookie } from "../utils/cookies.js";

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { phone, method } = req.body;

    const result = await sendOTP(phone, method);

    return apiResponse(res, 200, "OTP sent successfully", true, result);
  } catch {
    return apiResponse(res, 500, "Internal server error", false);
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { phone, method, otp } = req.body;
     console.log("Received OTP verification request:", { phone, method, otp }); 
    const result = await verifyOTP(phone, method, otp);
    console.log("OTP verification result:", result);
    if (!result.verified) {
      return apiResponse(res, 401, "Invalid OTP", false);
    }

  

    return apiResponse(res, 200, "OTP verified successfully", true);
  } catch {
    return apiResponse(res, 500, "Internal server error", false);
  }
};

export const saloonRegisterController = async (req: Request, res: Response) => {
  const { name, saloon_name, address, phone } = req.body;
  try {
    const result = await saloonRegisterService(name, saloon_name, address, phone);
      return apiResponse(res, 200, "Saloon registered successfully", true, result);


  } catch {
    return apiResponse(res, 500, "Failed to register saloon", false , null);
  }
}
  
