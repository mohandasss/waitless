import { pdfGenerator } from "../highCPUTASK/generatePDF.js";
import { pdfGenerationRepository } from "../repository/pdfGeneration.repository.js";
import { upload, uploadPdf } from "../utils/imageUploadUtil.js";

export const generatePdfService = async () => {



    const response = await pdfGenerationRepository()

    try {
        const pdfGenerated = await pdfGenerator(response)
        console.log("pdfGenerated", pdfGenerated)
        const uploadPDFResult = await uploadPdf(pdfGenerated)
        console.log(uploadPDFResult)
        return pdfGenerated
    } catch (error) {

        return error
    }





}