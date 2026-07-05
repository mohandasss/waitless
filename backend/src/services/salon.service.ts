import {
  GetAllSalonRepository,
  GetSalonDetailsRepository,
  getCustomersServedRepository,
  getPeakHourRepository,
  getRevenueRepository,
  getTopServiceRepository,
} from "../repository/salon.repository.js";
import { ApiError } from "../utils/ApiError.js";

interface GetSalonServiceParams {
  pageNumber: number;
  pageSize: number;
  search: string;
}

export const GetAllSalonService = async ({
  pageNumber,
  pageSize,
  search,
}: GetSalonServiceParams) => {
  console.log("GetSalonService called with params:", {
    pageNumber,
    pageSize,
    search,
  });
  const response = await GetAllSalonRepository(pageNumber, pageSize, search);

  return response;
};

// DETAILS
export const GetSalonDetailsService = async (id: string) => {
  



  const response = await GetSalonDetailsRepository(id);
  if (!response) {
    throw new ApiError(404, "Salon not found");
  }
  return response;
};



export const getTodayAnalyticsService = async (salonId: string) => {
  const [customersServed, revenue, topService, peakHour] = await Promise.all([
    getCustomersServedRepository(salonId),
    getRevenueRepository(salonId),
    getTopServiceRepository(salonId),
    getPeakHourRepository(salonId),
  ]);

  return {
    customersServed,
    revenue,
    topService: topService?.name ?? null,
    peakHour: peakHour?.label ?? null,
  };
};
