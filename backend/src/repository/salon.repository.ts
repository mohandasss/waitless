import { getPagination } from "../utils/getPagination.js";
import { buildPaginationResponse } from "../utils/pagination.js";
import { prisma } from "../utils/prisma.js";

export const GetSalonRepository = async (
  pageNumber: number,
  pageSize: number,
) => {
  const { skip, take } = getPagination(pageNumber, pageSize);
  const response = await prisma.salon.findMany({
    skip,
    take,
  });
  const totalRecords = await prisma.salon.count();

  console.log("GetSalonRepository response:", response);
  return buildPaginationResponse(
    response,
    pageNumber,
    pageSize,
    totalRecords
  );
};
