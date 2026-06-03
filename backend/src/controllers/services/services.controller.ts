import type { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/apiResponse.js";
import {
  AddServiceService,
  getAllServicesService,
  updateServiceService,
} from "../../services/services.service.js";

export const getAllServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { pageNumber = 1, pageSize = 10 } = req.query;
  const salonId = req.params.salonId;
  try {
    const services = await getAllServicesService(
      Number(salonId),
      Number(pageNumber),
      Number(pageSize),
    );

    return apiResponse(
      res,
      200,
      "Services fetched successfully",
      true,
      services,
    );
  } catch (error) {
    next(error);
  }
};

export const AddServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const salonId = req.params.salonId;
  const { name, duration, price } = req.body;
  try {
    const newService = await AddServiceService(
      Number(salonId),
      name,
      duration,
      price,
    );
    return apiResponse(
      res,
      201,
      "Service added successfully",
      true,
      newService,
    );
  } catch (error) {
    next(error);
  }
};

export const updateServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const salonId = req.params.salonId;
  const serviceId = req.params.serviceId;
  const { name, duration, price } = req.body;
  try {
    const updatedService = await updateServiceService(
        Number(salonId),
      Number(serviceId),
      name,
      duration,
      price,
    );
    return apiResponse(
      res,
      200,
      "Service updated successfully",
      true,
      updatedService,
    );
  } catch (error) {
    next(error);
  }
};
