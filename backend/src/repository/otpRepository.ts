import { prisma } from "../utils/prisma.js";

export const  saveOtp = async (phone: string, otp: string) => {
  return await prisma.otpVerification.upsert({
    where: {
      phone,
    },
    update: {
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // OTP expires in 5 minutes
    },
    create: {
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // OTP expires in 5 minutes
    },
  });
};




export const verifyOtp = async (phone: string, otp: string) => {
  try {
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        phone,
        otp,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!otpRecord) {
      throw new Error("otp expired or invalid");
    }

    await prisma.otpVerification.update({
      where: {
        phone,
      },
      data: {
        verified: true,
      },
    });

    return otpRecord;
  } catch (error) {
    throw new Error("server Error");
  }
};
