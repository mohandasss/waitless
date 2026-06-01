import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { BookSalonTokenController } from "../controllers/queue/queue.controller.js";
  const router   =    Router()

router.get("/salon/:salonId/book-slot" , validateToken, BookSalonTokenController );




export default router