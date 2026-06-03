import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { apiResponse } from "./utils/apiResponse.js";
import cookieParser from "cookie-parser";
import salonRoutes from "./routes/salon.routes.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import queueRoutes from "./routes/queue.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import aiRouter from "./routes/ai.routes.js";
import serviceRoutes from "./routes/service.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
// Basic health check route
app.get("/", (req, res) => {
  return apiResponse(res, 200, "working", true, null);
});

// Auth routes
app.use("/auth", authRoutes);
app.use("/salon", salonRoutes);
app.use("/queue", queueRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/ai", aiRouter);
app.use("/service", serviceRoutes);

app.use(globalErrorHandler);

export default app;
