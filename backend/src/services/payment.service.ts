
import { razorpay } from "../config/razorpay.js";
import { paymentVerifyRepository, SavePaymentRepository } from "../repository/payment.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";

export const createOrderService = async (amount: number, userId: string) => {
  console.log("amount", amount)
  console.log("userId", userId)
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });


    // return order
    const savedPayment = await SavePaymentRepository({
      userId: Number(userId),
      orderId: order.id,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      status: "pending",
    })

    if (!savedPayment) {
      throw new ApiError(400, "failed to save payment")
    }


 
    const paymentDetails = {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,

    }



    return paymentDetails

  } catch (error) {
    throw new ApiError(400, "failed to create order")
  }









};

export const verifyPaymentService = async (razorpay_payment_id: string, razorpay_order_id: string, razorpay_signature: string) => {

  const updateResponse = await paymentVerifyRepository(razorpay_order_id, razorpay_payment_id, razorpay_signature)

  if (!updateResponse) {
    throw new ApiError(400, "failed to update payment")
  }

  return updateResponse



}
