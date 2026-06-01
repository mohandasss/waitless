import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { GetSalonController, GetSalonDetailsController } from "../controllers/salon.controller.js";

const router = Router();

router.get("/salons" , validateToken, GetSalonController );
router.get("/salon/:id" , validateToken, GetSalonDetailsController );
router.get("/salon/:id/book-slot" , validateToken, GetSalonDetailsController );



export default router;