import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/getPagination.js";
import { buildPaginationResponse } from "../utils/pagination.js";
import { prisma } from "../utils/prisma.js";

export const getAllServicesRepository = async (
  salonId: number,
  pageNumber: number,
  pageSize: number,
) => {
  const { skip, take } = getPagination(pageNumber, pageSize);

  const services = await prisma.service.findMany({
    skip,
    take,
    where: { salonId: salonId },
  });

  const totalRecords = await prisma.service.count({
    where: { salonId: salonId },
  });

  return buildPaginationResponse(services, pageNumber, pageSize, totalRecords);
};

export const AddServiceRepository = async (
  salonId: number,
  name: string,
  duration: number,
  price: number,
) => {
  const normalizedName = name.trim().toLowerCase();
  try {
    return await prisma.service.create({
      data: {
        name: normalizedName,
        duration,
        price,
        salonId,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new ApiError(
        400,
        "Service with the same name already exists in this salon",
      );
    }
  }
};

export const updateServiceRepository = async (
  salonId: number,
  serviceId: number,
  name: string,
  duration: number,
  price: number,
) => {
  const normalizedName = name.trim().toLowerCase();

  try {
    return await prisma.service.update({
      where: { id: serviceId, salonId: salonId },
      data: {
        name: normalizedName,
        duration,
        price,
      },
    });
  } catch (error: any) {
    throw new ApiError(400, "Database Failed to update service");
  }
};
