import { prisma } from "../utils/prisma.js";

export const saveOtp = async (phone: string, otp: string) => {
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
  console.log("Verifying OTP for phone:", phone, "otp:", otp);
  try {
    const otpRecord = await prisma.otpVerification.findUnique({
      where: { phone },
    });

    console.log("OTP record found:", otpRecord);

    if (!otpRecord) {
      throw new Error("no otp record for this phone");
    }

    if (otpRecord.verified) {
      throw new Error("otp already verified");
    }

    if (otpRecord.otp !== otp) {
      throw new Error("invalid otp");
    }

    if (otpRecord.expiresAt <= new Date()) {
      throw new Error("otp expired");
    }

    const updated = await prisma.otpVerification.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    console.log("OTP verified successfully for phone:", phone);
    const pendingSalon = await prisma.pendingSalon.findUnique({
      where: { phone },
    });
    console.log("Pending salon record for phone:", phone, pendingSalon);

    if (pendingSalon) {
      await prisma.salon.create({
        data: {
          ownerName: pendingSalon?.name,
          salonName: pendingSalon?.saloon_name,
          address: pendingSalon?.address,
          phone: pendingSalon?.phone,
        },
      });
    }

    return updated;
  } catch (error) {
    console.error("verifyOtp error:", error);
    if (error instanceof Error) throw error;
    throw new Error("server Error");
  }
};
