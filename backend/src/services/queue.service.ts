import { BookSalonTokenRepository, GetTotalSalonBookingRepository } from "../repository/queue.Repository.js";
import { ApiError } from "../utils/ApiError.js";

export const BookSalonTokenService = async (
  salonId: number,
  serviceId: number,
  Userid: number,
) => {
  const response = await BookSalonTokenRepository(salonId, serviceId, Userid);
  return response;
};



export const GetTotalSalonBookingService = async (
  salonId: number,
  serviceId: number,
  Userid: number,
  pageNumber : number,
  pageSize : number
) => {
  const response = await GetTotalSalonBookingRepository(salonId, serviceId, Userid , pageNumber , pageSize);
  if(!response){
    throw new ApiError(404 , "No Data Found")
  }
  return response;
};
