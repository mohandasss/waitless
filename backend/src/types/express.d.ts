import type { RequestUser } from "../middlewares/auth.middleware.js";

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}

export {};