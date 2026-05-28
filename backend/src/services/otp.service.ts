import bcrypt from "bcrypt";
import { sendOtpMessage } from "../provider/OtpProvider.js";
import { saveOtp } from "../repository/otpRepository.js";
import { generateOtp } from "../utils/miscHelpers.js";
import type { AuthMethod } from "./auth.service.js";

const isTwilioOtpEnabled = false

export const generateAndSendOtpService = async (
  phone: string,
  method: AuthMethod
) => {
  try {
    const otp = isTwilioOtpEnabled ? generateOtp() : "1234";

    const otpToStore = isTwilioOtpEnabled
      ? await bcrypt.hash(otp, 10)
      : otp;

    // Save OTP first
    await saveOtp(phone, otpToStore);

    // Send message
    if (isTwilioOtpEnabled) {
      try {
        await sendOtpMessage(phone, otp, method);
      } catch (error) {
        console.error("Failed to send OTP message:", error);

        // optional cleanup
        // await deleteOtp(phone);

        throw new Error("Failed to send OTP message");
      }
    }

    return true;
  } catch (error) {
    console.error("OTP Service Error:", error);
    throw new Error("Failed to process OTP request");
  }
};