import { ApiError } from "../utils/ApiError.js";
import { generateId } from "../utils/miscHelpers.js";
import { getPagination } from "../utils/getPagination.js";
import { buildPaginationResponse } from "../utils/pagination.js";
import { prisma } from "../utils/prisma.js";

export const BookSalonTokenRepository = async (
  salonId: string,
  serviceId: string,
  userId: string,
) => {
  // Generate next token number per salon+service
  const agg = await prisma.queue.aggregate({
    _max: { tokenNumber: true },
    where: { salonId: String(salonId) },
  });

  const nextToken = (agg._max.tokenNumber ?? 0) + 1;

  let response
  let booked

  const result = await prisma.$transaction(async (tx) => {

    response = await tx.queue.create({
      data: {
        id: String(generateId()),
        userId: String(userId),
        salonId: String(salonId),
        serviceId: String(serviceId),
        tokenNumber: nextToken,
        status: "Booked",
      },
    });


    booked = await tx.booking.create({
      data: {
        id: String(generateId()),
        userId: String(userId),
        salonId: String(salonId),
        serviceId: String(serviceId),
        bookingTime: new Date(),
        status: "PENDING",

      }
    })
  })

  console.log("response", response)
  console.log("booked", booked)







  if (!response) {
    throw new ApiError(500, "Database error while booking token");

  }
  console.log("response", response);

  return response;
};



export const GetTotalSalonBookingRepository = async (
  salonId: string,
  serviceId: string,
  userId: string,
  pageNumber: number,
  pageSize: number,
) => {
  const { skip, take } = getPagination(pageNumber, pageSize);
  // Build filtered `where` clause so listing can be scoped to salon/service/user
  const where: any = { salonId };
  if (typeof serviceId === "string" && serviceId) {
    where.serviceId = serviceId;
  }
  if (typeof userId === "string" && userId) {
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









export const NextQueueMemberRepository = async (
  salonId: string,
  tokenNumber: number
) => {
  // Find the current queue item
  const currentQueueItem = await prisma.queue.findFirst({
    where: {
      salonId: String(salonId),
      tokenNumber: Number(tokenNumber),
    },
  });

  if (!currentQueueItem) {
    throw new ApiError(404, "Queue item not found for the given token number.");
  }




  // Update current token to DONE
  await prisma.queue.update({
    where: { id: currentQueueItem.id },
    data: { status: "DONE" },
  });

  // Update the Salon's current token
  await prisma.salon.update({
    where: { id: String(salonId) },
    data: { currentToken: Number(tokenNumber) },
  });

  // Fetch the next queue member
  const nextQueueItem = await prisma.queue.findFirst({
    where: {
      salonId: String(salonId),
      tokenNumber: { gt: Number(tokenNumber) },
      status: "Booked",
    },
    orderBy: {
      tokenNumber: "asc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        }
      },
      service: true,
    },
  });


  return {
    markedDone: currentQueueItem,
    nextQueueMember: nextQueueItem,
  };
};



