import twilio from "twilio";
import { signTokens } from "../utils/jwt.js";
import { normalizePhone } from "../utils/miscHelpers.js";
import { verifyOtpRepository } from "../repository/otpRepository.js";
import {
  saveRefreshTokenRepository,
  findRefreshTokenRepository,
  revokeRefreshTokenRepository,
} from "../repository/refreshTokenRepository.js";
import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";

import { generateAndSendOtpService } from "./otp.service.js";
import { savePendingSalonRepository } from "../repository/pendingSalonRepository.js";

export type AuthMethod = "sms" | "whatsapp";

const isTwilioOtpEnabled = process.env.ENABLE_TWILIO_OTP === "true";

const hasTwilioCredentials =
  Boolean(process.env.TWILIO_ACCOUNT_SID) &&
  Boolean(process.env.TWILIO_AUTH_TOKEN) &&
  Boolean(process.env.TWILIO_PHONE_NUMBER);

const client =
  isTwilioOtpEnabled && hasTwilioCredentials
    ? twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
    : null;

// const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const sendOtpService = async (phone: string, method: AuthMethod) => {
  const normalizedPhone = normalizePhone(phone);
 
  if (isTwilioOtpEnabled && !client) {
    throw new Error(
      "Twilio credentials are not set. OTP delivery is disabled.",
    );
  }
  await generateAndSendOtpService(normalizedPhone, method);

  return {
    phone: normalizedPhone,
    method,
  };
};



export const verifyOtpService = async (
  phone: string,
  method: AuthMethod,
  otp: string,
 
) => {
  try {
    const normalizedPhone = normalizePhone(phone);
    console.log("Verifying OTP for phone:", normalizedPhone, "method:", method);
    // verifyOtpRepository now performs OTP validation and returns the user payload { id, phone }
    const userPayload = await verifyOtpRepository(normalizedPhone, otp);
    console.log("OTP verification result (user payload):", userPayload);
    if (!userPayload || !userPayload.id) {
      throw new ApiError(401, "Invalid OTP");
    }

    const { accessToken, refreshToken } = signTokens(userPayload as any);
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshTokenRepository(normalizedPhone, refreshToken, refreshExpiresAt);

    return {
      verified: true,
      id: userPayload.id,
      phone: userPayload.phone,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError(500, "Internal server Error");
  }
};



export const registerSalonService = async (
  name: string,
  salon_name: string,
  address: string,
  phone: string,
  imageUrl?: string,
) => {
  const normalizedPhone = normalizePhone(phone);
  console.log("OTP sent successfully to", normalizedPhone);
  console.log("Registering salon with details:", imageUrl)
  try {
    await generateAndSendOtpService(normalizedPhone, "sms");
  } catch {
    throw new Error("Failed to send OTP. Please try again later.");
  }

  try {
    await savePendingSalonRepository(
      name,
      salon_name,
      address,
      normalizedPhone,
      imageUrl,
    );
  } catch {
    throw new Error("Failed to register salon. Please try again later.");
  }

  return { phone: normalizedPhone, method: "sms" as const , name, salon_name, address, imageUrl };
};  

export const rotateRefreshTokenService = async (refreshToken: string) => {
  
    // verify token signature first
    const decoded = verifyToken(refreshToken, "refresh") as any;
    console.log("Decoded refresh token payload:", decoded);
    const phone = decoded?.phone;
    const existing = await findRefreshTokenRepository(refreshToken, phone);
      console.log("Existing refresh token record from DB:", existing);
    if (!existing) {
      console.error("Refresh token not found in DB", { phone, token: refreshToken });
      throw new ApiError(401, "Invalid or revoked refresh token");
    }

    // revoke existing
    await revokeRefreshTokenRepository(existing.id);

    // issue new tokens
    const { accessToken, refreshToken: newRefreshToken } = signTokens(decoded);
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshTokenRepository(existing.phone, newRefreshToken, refreshExpiresAt);

    return { accessToken, refreshToken: newRefreshToken, payload: decoded };

  
};