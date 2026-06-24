import type { Request, Response } from "express";
import { generatePdfService } from "../../services/generatePdf.service.js";
import type { NextFunction } from "express";
import { apiResponse } from "../../utils/apiResponse.js";

export const generatePdfController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        console.log("userId", userId)
        if (!userId) {
            return apiResponse(res, 400, "userId is required", false, null)
        }

        const servicePdf = await generatePdfService(Number(userId));

        return apiResponse(res,200, "Pdf Generated Successfully", true, servicePdf)
    } catch (error) {
        next(error);
    }
}