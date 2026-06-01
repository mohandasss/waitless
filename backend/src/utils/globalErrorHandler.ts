import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return apiResponse(
      res,
      err.statusCode,
      err.message,
      false,
    );
  }

  return apiResponse(
    res,
    500,
    "Internal Server Error",
    false,
  );
};