import type { Response } from "express";

export const apiResponse = (
  res: Response,
  statusCode: number,
  message: string,
  success: boolean,
  data?: any
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};