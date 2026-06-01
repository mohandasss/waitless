import { prisma } from "../utils/prisma.js";

export const BookSalonTokenRepository = async (
  salonId: number,
  serviceId: number,
  Userid: number,
) => {
  const response  = await prisma.queue.create({
    data: {
      userId: Userid,
      salonId: salonId,
      serviceId: serviceId,
      tokenNumber: 10,
      status: "Booked",
    },
  });
console.log("response" , response);

  return response
};
