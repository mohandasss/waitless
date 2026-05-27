import twilio from "twilio";
import { prisma } from "../utils/prisma.js";
import { signTokens, verifyToken } from "../utils/jwt.js";
import { generateOtp, normalizePhone } from "../utils/miscHelpers.js";
import { saveOtp, verifyOtp } from "../repository/otpRepository.js";
import bcrypt from "bcrypt";
import { createAndSendOtp } from "./otp.service.js";
import { SavePendingSalon } from "../repository/pendingSalonRepository.js";
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

export const sendOTP = async (phone: string, method: AuthMethod) => {
  const normalizedPhone = normalizePhone(phone);

  if (isTwilioOtpEnabled && !client) {
    throw new Error(
      "Twilio credentials are not set. OTP delivery is disabled.",
    );
  }
  await createAndSendOtp(normalizedPhone, method);

  return {
    phone: normalizedPhone,
    method,
  };
};

export const saloonRegisterService = async (
  name: string,
  saloon_name: string,
  address: string,
  phone: string,
) => {
  const normalizedPhone = normalizePhone(phone);

  try {
    await createAndSendOtp(normalizedPhone, "sms");
  } catch {
    throw new Error("Failed to send OTP. Please try again later.");
  }

  try {
    await SavePendingSalon(name, saloon_name, address, normalizedPhone);
  } catch {
    throw new Error("Failed to register salon. Please try again later.");
  }

  return { phone: normalizedPhone, method: "sms" as const };
};

export const verifyOTP = async (
  phone: string,
  method: AuthMethod,
  otp: string,
) => {
  try {
    const normalizedPhone = normalizePhone(phone);
    console.log("Verifying OTP for phone:", normalizedPhone, "method:", method);
    const record = await verifyOtp(phone, otp);
    console.log("5645645456", record);
    if (!record) {
      throw new Error("invalid otp");
    }

    if (record.otp !== otp) {
      throw new Error("Wrong OTP");
    }

    const { accessToken, refreshToken } = signTokens(record);
    

    return record;
  } catch {
    throw new Error("Internal server Error");
  }
};
