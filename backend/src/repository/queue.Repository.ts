import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/getPagination.js";
import { buildPaginationResponse } from "../utils/pagination.js";
import { prisma } from "../utils/prisma.js";

export const BookSalonTokenRepository = async (
  salonId: number,
  serviceId: number,
  userId: number,
) => {
  // Generate next token number per salon+service
  const agg = await prisma.queue.aggregate({
    _max: { tokenNumber: true },
    where: { salonId, serviceId },
  });

  const nextToken = (agg._max.tokenNumber ?? 0) + 1;

  const response = await prisma.queue.create({
    data: {
      userId: userId,
      salonId: salonId,
      serviceId: serviceId,
      tokenNumber: nextToken,
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
  // Build filtered `where` clause so listing can be scoped to salon/service/user
  const where: any = { salonId };
  if (typeof serviceId === "number" && !Number.isNaN(serviceId)) {
    where.serviceId = serviceId;
  }
  if (typeof userId === "number" && !Number.isNaN(userId)) {
    where.userId = userId;
  }

  const response = await prisma.queue.findMany({
    skip,
    take,
    where,
    include: {
      user: true,
      service: true,
    },
  });

  const totalRecords = await prisma.queue.count({ where });

  return buildPaginationResponse(response, pageNumber, pageSize, totalRecords);
};
