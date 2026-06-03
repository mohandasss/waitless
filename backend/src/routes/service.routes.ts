import { Router } from "express";
import {
  AddServiceController,
  getAllServiceController,
  updateServiceController,
} from "../controllers/services/services.controller.js";
const router = Router();

router.get("/salon/:salonId/services", getAllServiceController);
router.post("/salon/:salonId/services", AddServiceController);
router.patch("/salon/:salonId/services/:serviceId", updateServiceController);
// router.delete("/salon/:salonId/services", getAllServiceController   )

export default router;
