import bcrypt from "bcrypt";
import { sendOtpMessage } from "../provider/OtpProvider.js";
import { saveOtp } from "../repository/otpRepository.js";
import { generateOtp } from "../utils/miscHelpers.js";
import type { AuthMethod } from "./auth.service.js";

export const createAndSendOtp = async (phone: string, method: AuthMethod) => {
  try {
    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp, 10);

    await sendOtpMessage(phone, otp, method);

    await saveOtp(phone, hashedOtp);

    return true;
  } catch (error) {

    throw new Error("Failed to send OTP. Please try again later.");
  }
};
