import { GetAllSalonRepository, GetSalonDetailsRepository } from "../repository/salon.repository.js";
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
export const GetSalonDetailsService = async (id: number) => {
  console.log("GetSalonDetailsService called with id:", id);
  
  const response = await GetSalonDetailsRepository(id);
  if (!response) {
    throw new ApiError(404, "Salon not found");
  }
  return response;
}
