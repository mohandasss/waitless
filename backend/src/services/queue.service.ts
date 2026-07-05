import { BookSalonTokenRepository, GetTotalSalonBookingRepository, NextQueueMemberRepository } from "../repository/queue.Repository.js";
import { ApiError } from "../utils/ApiError.js";

export const BookSalonTokenService = async (
  salonId: string,
  serviceId: string,
  Userid: string,
) => {
  const response = await BookSalonTokenRepository(salonId, serviceId, Userid);
  return response;
};









export const GetTotalSalonBookingService = async (
  salonId: string,
  serviceId: string,
  Userid: string,
  pageNumber : number,
  pageSize : number
) => {
  const response = await GetTotalSalonBookingRepository(salonId, serviceId, Userid , pageNumber , pageSize);
  if(!response){
    throw new ApiError(404 , "No Data Found")
  }
  return response;
};










export const NextQueueMemberService = async (
  salonId: string,
  tokenNumber: number
) => {
  const response = await NextQueueMemberRepository(salonId, tokenNumber);

  return response;
};








