import { prisma } from "../utils/prisma.js"
import { generateId } from "../utils/miscHelpers.js";

interface SavePaymentPayload {
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  userId: string;
  bookingId?: string;
  paymentId?: string;
  signature?: string;
}




export const SavePaymentRepository = async (payload: SavePaymentPayload) => {

  const { orderId, amount, currency, status, userId } = payload

  const findPayment = await prisma.payment.create({
    data: {
      id: String(generateId()),
      razorpayOrderId: orderId,
      status,
      amount,
      userId: (userId),

    }
  })
  return findPayment

}



export const paymentVerifyRepository = async (razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) => {
  const update = await prisma.payment.update({
    where: {
      razorpayOrderId: razorpay_order_id
    },
    data: {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "SUCCESS",
    }
  })

  return update
}