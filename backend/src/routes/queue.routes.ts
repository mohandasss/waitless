import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { BookSalonTokenController, BookSalonTokenListController } from "../controllers/queue/queue.controller.js";
  const router   =    Router()


router.get("/salon/:salonId/book-slot" , validateToken, BookSalonTokenController );
  router.get("/salon/:salonId/book-list" , validateToken, BookSalonTokenListController );




export default router