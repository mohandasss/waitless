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

export const formatPeakHourLabel = (hour: number) => {
  const startHour = hour % 12 === 0 ? 12 : hour % 12;
  const endHour24 = (hour + 1) % 24;
  const endHour = endHour24 % 12 === 0 ? 12 : endHour24 % 12;
  const startPeriod = hour < 12 ? "AM" : "PM";
  const endPeriod = endHour24 < 12 ? "AM" : "PM";

  return `${startHour} ${startPeriod} - ${endHour} ${endPeriod}`;
};

export const formatDate = (
  date: Date
) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};