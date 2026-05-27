import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export type AuthMethod = "sms" | "whatsapp";

export const sendOtpMessage = async (
  phone: string,
  otp: string,
  method: AuthMethod
) => {
  const body = `Your WaitLess OTP is: ${otp}`;

  const messageData =
    method === "whatsapp"
      ? {
          body,
          from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER!}`,
          to: `whatsapp:+91${phone}`,
        }
      : {
          body,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: `+91${phone}`,
        };

  return client.messages.create(messageData);
};