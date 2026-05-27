import { prisma } from "../utils/prisma.js";

export const SavePendingSalon = async (
  name: string,
  saloon_name: string,
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
        saloon_name,
        address,
      },
      create: {
        name,
        saloon_name,
        address,
        phone,
      }
    });
  } catch {
    throw new Error("Failed to save pending salon. Please try again later.");
  }
};
