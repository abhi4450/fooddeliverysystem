import { any, number, string } from "joi";
import Delivery from "../model/delivery";
import Order from "../model/order";
import Payment from "../model/payment";
import { Request, Response } from "express";
import validationSchema from "../library/validationSchema";
import pool from "../library/connection";

const createPayment = async (req: any, res: Response) => {
  const result = await validationSchema.paymentSchema.validateAsync(req.body);
  const { orderId, paymentMethod } = result;
  // Starting a transaction
  const client = await pool.connect();
  try {
    const totalAmount = await Order.getTotalForOderId(
      req.user.id,
      orderId,
      client
    );

    await Payment.insertPayment({
      orderId,
      paymentMethod,
      totalAmount,
      client,
    });

    const deliveryPersonId = await Delivery.getDeliveryPersonId(client);

    const deliveryDetails = await Delivery.createDelivery({
      orderId,
      deliveryPersonId,
      client,
    });

    // Commit the transaction
    await client.query("COMMIT");

    return res.status(201).json({
      deliveryDetails,
      message:
        "We are processing your payment,once successful,will be assinging a delivery partner for your order",
    });
  } catch (error: any) {
    // Roll back the transaction if any step fails
    await client.query("ROLLBACK");
    console.error(error);
    return res.status(500).json({ message: "falied to process the payment" });
  } finally {
    client.release(); // Releasing the client back to the pool
  }
};

const paymentController = {
  createPayment,
};

export default paymentController;
