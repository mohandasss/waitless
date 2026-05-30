import type { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { GetSalonService } from "../services/salon.service.js";
export const GetSalonController = async (req: Request, res: Response) => {
  const { pageNumber = 1, pageSize = 5 } = req.query;
  console.log("GetSalonController called", req.user);
  if (!req.user) {
    return apiResponse(res, 401, "Unauthorized", false);
  }

  try {
    const response = await GetSalonService(
        { pageNumber: Number(pageNumber), pageSize: Number(pageSize) }
    );
    return apiResponse(
      res,
      200,
      "Salon details fetched successfully",
      true,
      response,
    );
  } catch (error) {
    return apiResponse(res, 500, "Internal server error", false);
  }
};
