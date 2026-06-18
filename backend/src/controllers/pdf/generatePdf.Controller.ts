import type { Request, Response } from "express";
import { generatePdfService } from "../../services/generatePdf.service.js";
// import { apiResponse } from "../../utils/apiResponse.js";
import type { NextFunction } from "express";

export const generatePdfController = async  (req: Request, res: Response,  next: NextFunction) => {


    try {
        const servicePdf = await generatePdfService()
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=prescription.pdf");
        return res.status(200).send(servicePdf);
    } catch (error) {
        next(error)
    }



}