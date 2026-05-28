import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { GetSalonController } from "../controllers/salon.controller.js";

const router = Router();

router.get("/test" , validateToken, GetSalonController );




export default router;