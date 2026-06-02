import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { apiResponse } from "../../utils/apiResponse.js";
import { BookSalonTokenService, GetTotalSalonBookingService } from "../../services/queue.service.js";

export const BookSalonTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { salonId } = req.params;
  const { serviceId } = req.body;
  const userId = (req.user as { id?: number | string })?.id;

  if (!userId) {
    return apiResponse(res, 401, "Unauthorized", false, null);
  }
  try {
    const response = await BookSalonTokenService(
      Number(salonId),
      Number(serviceId),
      Number(userId),
    );
    return apiResponse(res, 200, "Token booked successfully", true, response);
  } catch (error) {
    next(error);
  }
};




export const BookSalonTokenListController = async (req: Request, res: Response, next: NextFunction) => {

  const { salonId } = req.params;
  const {pageNumber = 1 ,pageSize = 5 } = req.query
  const userId = (req.user as { id?: number | string })?.id;
  const {serviceId} = req.body
  if (!userId) {
    return apiResponse(res, 401, "Unauthorized", false, null);
  }
  try {
    const response = await GetTotalSalonBookingService(
      Number(salonId),
      Number(serviceId),
      Number(userId),
      Number(pageNumber),
      Number(pageSize)
    );
    return apiResponse(res, 200, "All queue items fetched successfully", true, response);
  } catch (error) {
    next(error);
  }



}
