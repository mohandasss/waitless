import { pdfGenerator } from "../highCPUTASK/generatePDF.js";
import { pdfGenerationRepository, savePrescriptionPdfResult } from "../repository/pdfGeneration.repository.js";
import { upload, uploadPdf } from "../utils/imageUploadUtil.js";

export const generatePdfService = async (userId: number) => {

    const data = await pdfGenerationRepository()

    try {
        const pdfGenerated = await pdfGenerator(data)
        console.log("pdfGenerated", pdfGenerated)
        const uploadPDFResult = await uploadPdf(pdfGenerated)
        const savedPrescription = await savePrescriptionPdfResult(userId, uploadPDFResult)
        console.log("savedPrescription", savedPrescription)
        return savedPrescription
    } catch (error) {
        console.error(error)
        return error
    }

}