import { Router } from "express";
import {
  AddServiceController,
  getAllServiceController,
  updateServiceController,
} from "../controllers/services/services.controller.js";
import { IsAdmin, validateToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/salon/:salonId/services", validateToken , IsAdmin , getAllServiceController);
router.post("/salon/:salonId/services", validateToken , IsAdmin , AddServiceController);
router.patch("/salon/:salonId/services/:serviceId", validateToken , IsAdmin , updateServiceController);
// router.delete("/salon/:salonId/services", getAllServiceController   )

export default router;
