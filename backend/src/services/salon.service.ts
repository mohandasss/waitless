import { GetSalonRepository } from "../repository/salon.repository.js";

interface  GetSalonServiceParams {
    pageNumber: number;
    pageSize: number;
}

export const GetSalonService = async ({ pageNumber, pageSize }: GetSalonServiceParams) => {

    const response = await GetSalonRepository(pageNumber, pageSize);
    return response;

}