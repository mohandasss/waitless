import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";

export const BookSalonTokenRepository = async (
  salonId: number,
  serviceId: number,
  userId: number,
) => {
  const response = await prisma.queue.create({
    data: {
      userId: userId,
      salonId: salonId,
      serviceId: serviceId,
      tokenNumber: 10,
      status: "Booked",
    },
  });
  if(!response){
    throw new ApiError(500, "Database error while booking token");
  }
  console.log("response", response);

  return response;
};
