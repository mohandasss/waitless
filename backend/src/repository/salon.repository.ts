import { getPagination } from "../utils/getPagination.js";
import { buildPaginationResponse } from "../utils/pagination.js";
import { prisma } from "../utils/prisma.js";

export const GetSalonRepository = async (
  pageNumber: number,
  pageSize: number,
  search: string,
) => {
  console.log("Gsdsadsads:", { pageNumber, pageSize , search });
  const { skip, take } = getPagination(pageNumber, pageSize);
  const response = await prisma.salon.findMany({
    skip,
    take,
    where: {
      salonName: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  const totalRecords = await prisma.salon.count();

  console.log("GetSalonRepository response:", response);
  return buildPaginationResponse(response, pageNumber, pageSize, totalRecords);
};
