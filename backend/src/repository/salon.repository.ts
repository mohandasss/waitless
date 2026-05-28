import { prisma } from "../utils/prisma.js";

export const GetSalonRepository = async (phone: string) => {
    console.log("GetSalonRepository called with phone:", phone);
  const response = await prisma.salon.findMany({
    where: {
      phone,
    },
  });


  console.log("GetSalonRepository response:", response);
  return response;
};
