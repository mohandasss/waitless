import { prisma } from "../utils/prisma.js";

export const savePendingSalonRepository = async (
  name: string,
  salon_name: string,
  address: string,
  phone: string,
) => {
  try {
    await prisma.pendingSalon.upsert({
      where :{
        phone,
      },
      update: {
        name,
        saloon_name: salon_name,
        address,
      },
      create: {
        name,
        saloon_name: salon_name,
        address,
        phone,
      }
    });
  } catch {
    throw new Error("Failed to save pending salon. Please try again later.");
  }
};
