import type { NextFunction, Request, Response } from "express";
import { createOrderService, verifyPaymentService } from "../../services/payment.service.js";
import { apiResponse } from "../../utils/apiResponse.js";

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { amount } = req.body;
    const userId = req.user?.id
    console.log("working==> " , req.user)
    const response = await createOrderService(Number(amount) , userId!.toString());
    return apiResponse(res , 200, "Order Created", true, response)
  } catch (error) {
    next(error);
  }
};




export const verifyPaymentController = async (req: Request, res: Response, next: NextFunction) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

  try {

    const paymentResponse = await verifyPaymentService(razorpay_payment_id, razorpay_order_id, razorpay_signature)
    return apiResponse(res, 200, "Payment Verified", true, paymentResponse)


  } catch (error) {
    next(error)
  }


}
