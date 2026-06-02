import { Router } from "express";
import {validateToken} from "../middlewares/auth.middleware.js";
import { getTodayAnalytics } from "../controllers/analytics/analytics.controller.js";
const router = Router()


router.get("/today/:salonId" , validateToken, getTodayAnalytics);

export default router;