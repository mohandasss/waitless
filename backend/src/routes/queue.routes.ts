import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { BookSalonTokenController, BookSalonTokenListController, NextQueueMemberController } from "../controllers/queue/queue.controller.js";
  const router   =    Router()


router.post("/salon/:salonId/book-slot" , validateToken, BookSalonTokenController );
router.get("/salon/:salonId/book-list" , validateToken, BookSalonTokenListController );
router.patch("/salon/:salonId/next-token", validateToken, NextQueueMemberController);




export default router