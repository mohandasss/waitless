import { getPagination } from "../utils/getPagination.js";
import { formatPeakHourLabel } from "../utils/miscHelpers.js";
import { buildPaginationResponse } from "../utils/pagination.js";
import { prisma } from "../utils/prisma.js";

export const GetAllSalonRepository = async (
  pageNumber: number,
  pageSize: number,
  search: string,
) => {
  //reusebale whee for search and pagination
  const where = {
    salonName: {
      contains: search,
    },
  };

  console.log("Gsdsadsads:", { pageNumber, pageSize, search });
  const { skip, take } = getPagination(pageNumber, pageSize);
  const response = await prisma.salon.findMany({
    skip,
    take,
    where,
  });
  const totalRecords = await prisma.salon.count({ where });

  console.log("GetAllSalonRepository response:", response);
  return buildPaginationResponse(response, pageNumber, pageSize, totalRecords);
};

export const GetSalonDetailsRepository = async (id: string) => {
  const record = await prisma.salon.findUnique({
    where: {
      id: String(id),
    },
    include: {
      services: true,
    },
  });

  return record;
};




export const getCustomersServedRepository = async (salonId: string) => {
  return prisma.queue.count({
    where: {
      salonId:String(salonId),
      status: "Booked",
    },
  });
};

export const getRevenueRepository = async (salonId: string) => {
  const completedQueues = await prisma.queue.findMany({
    where: {
      salonId:String(salonId),
      status: "Booked",
    },
    include: {
      service: true,
    },
  });

  return completedQueues.reduce(
    (sum, queue) => sum + (queue.service.price ?? 0),
    0,
  );
};

export const getTopServiceRepository = async (salonId: string) => {
  const topService = await prisma.queue.groupBy({
    by: ["serviceId"],
    where: {
      salonId:String(salonId),
      status: "Booked",
    },
    _count: {
      serviceId: true,
    },
    orderBy: {
      _count: {
        serviceId: "desc",
      },
    },
    take: 1,
  });

  if (!topService.length) {
    return null;
  }

  const serviceId = topService[0]!.serviceId;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return service;
};






export const getPeakHourRepository = async (salonId: string) => {
  const completedQueues = await prisma.queue.findMany({
    where: {
      salonId:String(salonId),
      status: "Booked",
    },
    select: {
      joinedAt: true,
    },
  });

  const hourCounts: Record<number, number> = {};

  for (const queue of completedQueues) {
    const hour = queue.joinedAt.getHours();
    hourCounts[hour] = (hourCounts[hour] ?? 0) + 1;
  }

  let peakHourEntry: [string, number] | null = null;

  for (const entry of Object.entries(hourCounts)) {
    if (!peakHourEntry || entry[1] > peakHourEntry[1]) {
      peakHourEntry = entry;
    }
  }

  if (!peakHourEntry) {
    return null;
  }

  const peakHour = Number(peakHourEntry[0]);

  return {
    hour: peakHour,
    label: formatPeakHourLabel(peakHour),
  };
};

