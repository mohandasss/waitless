import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { apiResponse } from "./apiResponse.js";

export const otpRateLimiter = rateLimit({
  windowMs: 1000 * 60, // 1 minute
  limit : 3, // limit each IP to 3 requests per windowMs
  keyGenerator: (req) => {
    return req.body.phone || ipKeyGenerator(req.ip || ""); // Use phone number if available, otherwise fallback to IP
  },
  handler :(req,res ) =>{
    return apiResponse(res , 429 , "Too many OTP requests. Please try again later." , false , null);
  }
});
