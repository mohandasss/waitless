

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
