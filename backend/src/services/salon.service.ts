import { GetSalonRepository } from "../repository/salon.repository.js";

export const GetSalonService = async ( phone : string ) => {

    const response = await GetSalonRepository(phone);
    return response;

}