import { Router } from "express";
import { createOrderController, verifyPaymentController } from "../controllers/payment/createOrder.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-order", validateToken , createOrderController);
router.post("/verify-payment", verifyPaymentController);

export default router;
