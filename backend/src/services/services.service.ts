import type { Request, Response } from "express";
import { AddServiceRepository, getAllServicesRepository, updateServiceRepository } from "../repository/services.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllServicesService = async (
  salonId: string,
  pageNumber: number,
  pageSize: number,
) => {
  const services = await getAllServicesRepository(
    salonId,
    pageNumber,
    pageSize,
  );
  if (!services) {
    throw new ApiError(404, "No services found for the given salon");
  }
  return services;
};


export const AddServiceService = async (salonId: string, name: string, duration: number, price: number) => {


    const newService =  await AddServiceRepository(salonId, name, duration, price)
    if(!newService){
        throw new ApiError(400, "Failed to add service")
    }
    return newService;

}

export const updateServiceService = async (salonId: string, serviceId: string, name: string, duration: number, price: number) => {
    const updatedService = await updateServiceRepository(salonId, serviceId, name, duration, price);
    if(!updatedService){
        throw new ApiError(400, "Failed to update service")
    }
    return updatedService;



}