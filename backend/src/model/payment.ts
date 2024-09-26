import pool from "../library/connection";

interface paymentData {
  orderId: number;
  paymentMethod: string;
  totalAmount: number;
  client: any;
}

class Payment {
  constructor() {}

  static async insertPayment(paymentDetails: paymentData) {
    const { orderId, paymentMethod, totalAmount, client } = paymentDetails;

    try {
      const { rows } = await client.query(
        `INSERT INTO payments (order_id, method, amount, status, createdat) 
         VALUES ($1, $2, $3,'processing',NOW()) 
         RETURNING *`,
        [orderId, paymentMethod, totalAmount]
      );

      return rows[0];
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
}

export default Payment;
