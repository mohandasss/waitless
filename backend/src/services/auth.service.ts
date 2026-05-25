
import twilio from "twilio";
import {prisma} from "../utils/prisma.js";
import { signTokens, parseExpiryToMs } from "../utils/jwt.js";

export type AuthMethod = "sms" | "whatsapp";

type OtpRecord = {
  otp: string;
  expiresAt: number;
  method: AuthMethod;
};

const OTP_TTL_MS = 5 * 60 * 1000;
const otpStore = new Map<string, OtpRecord>();

const hasTwilioCredentials =
  Boolean(process.env.TWILIO_ACCOUNT_SID) &&
  Boolean(process.env.TWILIO_AUTH_TOKEN) &&
  Boolean(process.env.TWILIO_PHONE_NUMBER);

const client = hasTwilioCredentials
  ? twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
  : null;

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

const otpKey = (phone: string, method: AuthMethod) =>
  `${method}:${normalizePhone(phone)}`;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const storeOtp = (phone: string, method: AuthMethod, otp: string) => {
  otpStore.set(otpKey(phone, method), {
    otp,
    method,
    expiresAt: Date.now() + OTP_TTL_MS,
  });
};

const readOtp = (phone: string, method: AuthMethod) => {
  const key = otpKey(phone, method);
  const record = otpStore.get(key);

  if (!record) {
    return null;
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return null;
  }

  return record;
};

const deleteOtp = (phone: string, method: AuthMethod) => {
  otpStore.delete(otpKey(phone, method));
};

export const sendOTP = async (phone: string, method: AuthMethod) => {
  const normalizedPhone = normalizePhone(phone);
  const otp = generateOtp();

  if (!client) {
    storeOtp(normalizedPhone, method, otp);

    return {
      provider: "mock" as const,
      method,
      phone: normalizedPhone,
      otp,
      expiresInSeconds: OTP_TTL_MS / 1000,
    };
  }

  const messageData =
    method === "whatsapp"
      ? {
          from: "whatsapp:+14155238886",
          contentSid: "HX229f5a04fd0510ce1b071852155d3e75",
          contentVariables: JSON.stringify({ "1": otp }),
          to: `whatsapp:+91${normalizedPhone}`,
        }
      : {
          from: process.env.TWILIO_PHONE_NUMBER!,
          body: `Your WaitLess OTP is: ${otp}`,
          to: `+91${normalizedPhone}`,
        };

  const response = await client.messages.create(messageData);

  storeOtp(normalizedPhone, method, otp);

  return {
    provider: "twilio" as const,
    method,
    phone: normalizedPhone,
    messageSid: response.sid,
    status: response.status,
    expiresInSeconds: OTP_TTL_MS / 1000,
  };
};

export const verifyOTP = async (
  phone: string,
  method: AuthMethod,
  otp: string
) => {
  const normalizedPhone = normalizePhone(phone);
  const record = readOtp(normalizedPhone, method);

  if (!record) {
    return {
      provider: client ? "twilio" : "mock",
      method,
      phone: normalizedPhone,
      verified: false,
      reason: "otp_expired_or_missing",
    };
  }

  if (record.otp !== otp) {
    return {
      provider: client ? "twilio" : "mock",
      method,
      phone: normalizedPhone,
      verified: false,
      reason: "invalid_otp",
    };
  }

  deleteOtp(normalizedPhone, method);

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
};






