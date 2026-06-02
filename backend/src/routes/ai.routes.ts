import { Router } from "express";
import { getAiInsights } from "../controllers/Ai/getAiInsights.controller.js";
const aiRouter = Router();
aiRouter.get("/insights/:salonId", getAiInsights)

export default aiRouter