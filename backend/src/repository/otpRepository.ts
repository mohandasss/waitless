import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";

export const saveOtp = async (phone: string, otp: string) => {
  console.log("Saving OTP for phone:", phone);
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




export const verifyOtpRepository = async (phone: string, otp: string) => {
  console.log("Verifying OTP for phone:", phone, "otp:", otp);
  try {
    const otpRecord = await prisma.otpVerification.findUnique({
      where: { phone },
    });

    console.log("OTP record found:", otpRecord);

    if (!otpRecord) {
      throw new Error("no otp record for this phone");
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

    let user;

    if (pendingSalon) {
      const salon = await prisma.salon.upsert({
        where: {
          phone: pendingSalon.phone,
        },
        update: {},
        create: {
          ownerName: pendingSalon.name,
          salonName: pendingSalon.saloon_name,
          address: pendingSalon.address,
          phone: pendingSalon.phone,
          imageUrl: pendingSalon.imageUrl,
        },
      });

      console.log("Salon created/updated:", salon);

      user = await prisma.user.upsert({
        where: { phone: phone },
        update: {
          salonId: salon.id,
          role: pendingSalon.role ?? "admin",
          name: pendingSalon.name,
        },
        create: {
          name: pendingSalon.name,
          email: null,
          phone: phone,
          password: "",
          role: pendingSalon.role ?? "admin",
          salonId: salon.id,
        },
      });

      // Clean up the pending salon after successful registration
      await prisma.pendingSalon.delete({ where: { phone } }).catch(() => { });
    } else {
      user = await prisma.user.upsert({
        where: { phone: phone },
        update: {},
        create: {
          name: "User",
          email: null,
          phone: phone,
          password: "",
          role: "user",
        },
      });
    }

    // Return the payload expected by signTokens: `{ id, phone }`
    return { id: user.id, phone, role: user.role };
  } catch (error) {
    console.error("verifyOtpRepository error:", error);
    if (error instanceof Error) throw error;
    throw new Error("server Error");
  }
};
