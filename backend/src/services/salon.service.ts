import { GetSalonRepository } from "../repository/salon.repository.js";

interface  GetSalonServiceParams {
    pageNumber: number;
    pageSize: number;
    search : string;
}

export const GetSalonService = async ({ pageNumber, pageSize , search }: GetSalonServiceParams) => {
    console.log("GetSalonService called with params:", { pageNumber, pageSize , search });
    const response = await GetSalonRepository(pageNumber, pageSize , search);
    return response;

}