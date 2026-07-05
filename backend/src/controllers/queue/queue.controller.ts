import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { apiResponse } from "../../utils/apiResponse.js";
import {
  BookSalonTokenService,
  GetTotalSalonBookingService,
  NextQueueMemberService,
} from "../../services/queue.service.js";

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

  if (!serviceId) {
    return apiResponse(res, 400, "serviceId is required", false, null);
  }
  try {
    const response = await BookSalonTokenService(
      salonId,
      serviceId,
      userId as string,
    );

    return apiResponse(res, 200, "Token booked successfully", true, response);
  } catch (error) {
    next(error);
  }
};

export const BookSalonTokenListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { salonId } = req.params;
  const { pageNumber = 1, pageSize = 5, serviceId } = req.query;
  const userId = (req.user as { id?: number | string })?.id;
  if (!userId) {
    return apiResponse(res, 401, "Unauthorized", false, null);
  }
  try {
    const response = await GetTotalSalonBookingService(
      salonId,
      serviceId as string,
      userId as string,
      Number(pageNumber),
      Number(pageSize),
    );
    return apiResponse(
      res,
      200,
      "All queue items fetched successfully",
      true,
      response,
    );
  } catch (error) {
    next(error);
  }
};

// export const getQueueUpdate = (req : Request , res : Response , next : NextFunction)=>{
//   const {salonId , serviceId} = req.params
//   const userId = req.user?.id
//   if (!userId) {
//     return apiResponse(res, 401, "Unauthorized", false, null);
//   }
//   try {
//     const response = await GetTotalSalonBookingService(
//       salonId,
//       serviceId,
//       userId ,
//     );
//     return apiResponse(
//       res,
//       200,
//       "All queue items fetched successfully",
//       true,
//       response,
//     );
//   } catch (error) {
//     next(error);
//   }

// }





export const NextQueueMemberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { salonId } = req.params;
  const { tokenNumber } = req.body;
  const userId = req.user?.id




  if (tokenNumber === undefined) {
    return apiResponse(res, 400, "tokenNumber is required", false, null);
  }





  try {
    const response = await NextQueueMemberService(
      salonId,
      Number(tokenNumber)
    );
    return apiResponse(
      res,
      200,
      "Queue moved to the next member successfully",
      true,
      response
    );
  } catch (error) {
    next(error);
  }
};
