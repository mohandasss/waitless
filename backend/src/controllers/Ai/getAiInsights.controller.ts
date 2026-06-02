import type { NextFunction, Request, Response } from "express";
import { getAiInsightsService } from "../../services/AiInsights.service.js";
import { apiResponse } from "../../utils/apiResponse.js";

export const getAiInsights = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const salonId = Number(req.params.salonId);

  try {
    const response = await getAiInsightsService(salonId, next);
    return apiResponse(
      res,
      200,
      "AI insights retrieved successfully",
      true,
      response,
    );
  } catch (error) {
    next(error);
  }
};
