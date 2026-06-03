

export type AuthMethod = "sms" | "whatsapp";

export type SendOtpData = {
  provider: "mock" | "twilio";
  method: AuthMethod;
  phone: string;
  expiresInSeconds: number;
  otp?: string;
  messageSid?: string;
  status?: string;
};

export type VerifyOtpData = {
  provider: "mock" | "twilio";
  method: AuthMethod;
  phone: string;
  verified: boolean;
  accessToken?: string;
  accessTokenExpiresIn?: string;
  reason?: string;
};

export type SendOtpRequest = {
  phone: string;
  method: AuthMethod;
};

export type VerifyOtpRequest = {
  phone: string;
  method: AuthMethod;
  otp: string;
};



export type AiInsightsData = {
  summary: string;
  recommendation: string;
  growthOpportunity: string;
};

export type TodayAnalyticsData = {
  customersServed: number;
  revenue: number;
  topService: string;
  peakHour: string;
  status?: string;
};