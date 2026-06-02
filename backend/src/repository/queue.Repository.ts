import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/getPagination.js";
import { buildPaginationResponse } from "../utils/pagination.js";
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
  if (!response) {
    throw new ApiError(500, "Database error while booking token");
  }
  console.log("response", response);

  return response;
};

export const GetTotalSalonBookingRepository = async (
  salonId: number,
  serviceId: number,
  userId: number,
  pageNumber: number,
  pageSize: number,
) => {
  const { skip, take } = getPagination(pageNumber, pageSize);
  const response = await prisma.queue.findMany({
    skip,
    take,
    where: {
      salonId,
    },
    include: {
      user: true,
      service: true,
    },
  });

  const totalRecords = await prisma.queue.count();

  return buildPaginationResponse(response, pageNumber, pageSize, totalRecords);
};
