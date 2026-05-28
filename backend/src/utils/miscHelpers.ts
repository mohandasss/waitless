import type { AuthMethod } from "../middlewares/auth.middleware.js";
 import crypto from "crypto";
export const normalizePhone = (value: unknown) => typeof value === 'string' ? value.trim() : '';
export const isAuthMethod = (value: unknown): value is AuthMethod =>
  value === 'sms' || value === 'whatsapp';

export const isOtp = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9]{6}$/.test(value);

 export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");