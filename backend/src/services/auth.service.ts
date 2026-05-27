import twilio from "twilio";
import { prisma } from "../utils/prisma.js";
import { signTokens, parseExpiryToMs } from "../utils/jwt.js";
import { generateOtp, normalizePhone } from "../utils/miscHelpers.js";
import { saveOtp, verifyOtp } from "../repository/otpRepository.js";
import bcrypt from "bcrypt";
import { createAndSendOtp } from "./otp.service.js";
export type AuthMethod = "sms" | "whatsapp";

type OtpRecord = {
  otp: string;
  expiresAt: number;
  method: AuthMethod;
};

const hasTwilioCredentials =
  Boolean(process.env.TWILIO_ACCOUNT_SID) &&
  Boolean(process.env.TWILIO_AUTH_TOKEN) &&
  Boolean(process.env.TWILIO_PHONE_NUMBER);

const client = hasTwilioCredentials
  ? twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
  : null;

// const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const sendOTP = async (phone: string, method: AuthMethod) => {
  const normalizedPhone = normalizePhone(phone);

  if (!client) {
    throw new Error(
      "Twilio credentials are not set. OTP generation is mocked, but SMS sending is disabled.",
    );
  }
  await createAndSendOtp(normalizedPhone, method);

  return {
    phone: normalizedPhone,
    method,
  };
};

export const verifyOTP = async (
  phone: string,
  method: AuthMethod,
  otp: string,
) => {
  try {
    const normalizedPhone = normalizePhone(phone);

    const record = await verifyOtp(phone, otp);
    if (!record) {
      throw new Error("invalid otp");
    }

    if (record.otp !== otp) {
      throw new Error("Wrong OTP");
    }

    // Issue JWTs and prepare refresh token persistence via utils
    const tokens = await signTokens(normalizedPhone, method);

    await prisma.refreshToken.create({
      data: {
        phone: normalizedPhone,
        tokenHash: tokens.refreshTokenHash,
        expiresAt: tokens.refreshExpiresAt,
      },
    });

    return {
      provider: client ? "twilio" : "mock",
      method,
      phone: normalizedPhone,
      verified: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresIn: tokens.accessTokenExpiresIn,
      refreshTokenExpiresIn: tokens.refreshTokenExpiresIn,
    } as const;
  } catch (error) {
    throw new Error("Internal server Error");
  }
};

export const saloonRegisterService = async (
  name: string,
  saloon_name: string,
  address: string,
  phone: string,
) => {
  try {
    const normalizedPhone = normalizePhone(phone);
    const response = await createAndSendOtp(normalizedPhone, "sms");
    if (!response) {
      throw new Error("Failed to send OTP");
    }
    console.log("response", response);
  } catch (error) {
    throw new Error("Failed to register saloon");
  }
};
