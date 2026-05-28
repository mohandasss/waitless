// middleware/globalErrorHandler.ts

import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "./apiResponse.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err) {
    return apiResponse(
      res,
      err.statusCode || 500,
      err.message,
      false
    );
  }

  return apiResponse(
    res,
    500,
    "Internal Server Error",
    false
  );
};