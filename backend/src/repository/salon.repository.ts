import { getPagination } from "../utils/getPagination.js";
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

export const GetSalonDetailsRepository = async (id: number) => {
  const record = await prisma.salon.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    
    },
  });

  return record;
};
