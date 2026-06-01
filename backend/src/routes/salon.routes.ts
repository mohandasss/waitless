import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { GetSalonController, GetSalonDetailsController } from "../controllers/auth/salon.controller.js";


const router = Router();

router.get("/salons" , validateToken, GetSalonController );
router.get("/salon/:id" , validateToken, GetSalonDetailsController );




export default router;