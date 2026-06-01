import { BookSalonTokenRepository } from "../repository/queue.Repository.js";

export const BookSalonTokenService = async (
  salonId: number,
  serviceId: number,
  Userid : number
) => {
  const response = await BookSalonTokenRepository(salonId, serviceId , Userid);
  return response;
};
