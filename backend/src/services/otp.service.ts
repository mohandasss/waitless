import bcrypt from "bcrypt";
import { sendOtpMessage } from "../provider/OtpProvider.js";
import { saveOtp } from "../repository/otpRepository.js";
import { generateOtp } from "../utils/miscHelpers.js";
import type { AuthMethod } from "./auth.service.js";

const isTwilioOtpEnabled = process.env.ENABLE_TWILIO_OTP === "true";

export const createAndSendOtp = async (phone: string, method: AuthMethod) => {
  try {
    const otp = isTwilioOtpEnabled ? generateOtp() : "1234";

    const otpToStore = isTwilioOtpEnabled ? await bcrypt.hash(otp, 10) : otp;

    if (isTwilioOtpEnabled) {
      await sendOtpMessage(phone, otp, method);
    }

    await saveOtp(phone, otpToStore);

    return true;
  } catch {
    throw new Error("Failed to send OTP. Please try again later.");
  }
};
