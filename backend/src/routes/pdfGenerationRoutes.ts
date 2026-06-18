import { Router } from 'express'
import { generatePdfController } from '../controllers/pdf/generatePdf.Controller.js'

const router = Router()

router.get("/generate", generatePdfController)




export default router  