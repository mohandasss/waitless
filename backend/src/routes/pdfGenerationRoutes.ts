import { Router } from 'express'
import { generatePdfController } from '../controllers/pdf/generatePdf.Controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get("/generate", validateToken, generatePdfController)




export default router  