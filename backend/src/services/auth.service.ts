
import twilio from "twilio";


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);



export const sendOTP = async (phone: string, method: 'sms' | 'whatsapp') => {
  console.log("Inside sendOTP")
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(`[AuthService] Generated OTP ${otp} for ${phone} via ${method}`);

  const isWhatsapp = method === 'whatsapp';

  let messageData: any;

  if (isWhatsapp) {
    messageData = {
      from: 'whatsapp:+14155238886',
      contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
      contentVariables: JSON.stringify({ "1": otp }),
      to: `whatsapp:+91${phone}`
    };
  } else {
    messageData = {
      from: process.env.TWILIO_PHONE_NUMBER!,
      body: `Your WaitLess OTP is: ${otp}`,
      to: `+91${phone}`
    };
  }

  const response = await client.messages.create(messageData);

  return {
    response,
    otp
  };
};






