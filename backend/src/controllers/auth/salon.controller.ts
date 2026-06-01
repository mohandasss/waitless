import type { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/apiResponse.js";
import {
  GetAllSalonService,
  GetSalonDetailsService,
} from "../../services/salon.service.js";




// Controller for fetching all salons with pagination and search
export const GetSalonController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { pageNumber = 1, pageSize = 5, search = "" } = req.query;

  console.log("GetSalonController called with query params:", {
    pageNumber,
    pageSize,
    search,
  });
  console.log("GetSalonController called", req.user);
  if (!req.user) {
    return apiResponse(res, 401, "Unauthorized", false);
  }

  try {
    const response = await GetAllSalonService({
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      search: String(search),
    });
    return apiResponse(
      res,
      200,
      "Salon details fetched successfully",
      true,
      response,
    );
  } catch (error) {
    return next(error);
  }
};










// Controller for fetching details of a specific salon by ID
export const GetSalonDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    console.log("GetSalonDetailsController called with id:", id);

    const response = await GetSalonDetailsService(Number(id));
    return apiResponse(
      res,
      200,
      "Salon details fetched successfully",
      true,
      response,
    );
  } catch (error) {
    next(error);
  }
};
