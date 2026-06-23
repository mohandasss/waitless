import type { Response } from "express";

export const apiResponse = (
  res: Response,
  statusCode: number,
  message: any,
  success: boolean,
  data?: any
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};