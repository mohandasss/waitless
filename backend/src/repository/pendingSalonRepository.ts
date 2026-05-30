import { prisma } from "../utils/prisma.js";

export const savePendingSalonRepository = async (
  name: string,
  salon_name: string,
  address: string,
  phone: string,
  imageUrl?: string,
) => {
  try {
    return await prisma.pendingSalon.upsert({
      where: {
        phone,
      },
      update: {
        name,
        saloon_name: salon_name,
        address,
        ...(imageUrl ? { imageUrl } : {}),
      },
      create: {
        name,
        saloon_name: salon_name,
        address,
        phone,
        imageUrl: imageUrl ?? null,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to save pending salon. Please try again later."
    );
  }
};