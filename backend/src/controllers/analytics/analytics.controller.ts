import type { NextFunction, Request, Response } from "express";
import { getTodayAnalyticsService } from "../../services/salon.service.js";
import { apiResponse } from "../../utils/apiResponse.js";

export const getTodayAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const salonId = Number(req.params.salonId);
    const response = await getTodayAnalyticsService(salonId);

    return apiResponse(
      res,
      200,
      "Today's analytics retrieved successfully",
      true,
      response,
    );
  } catch (error) {
    next(error);
  }
};
