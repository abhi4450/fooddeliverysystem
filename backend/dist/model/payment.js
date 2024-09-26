"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor() { }
    static async insertPayment(paymentDetails) {
        const { orderId, paymentMethod, totalAmount, client } = paymentDetails;
        try {
            const { rows } = await client.query(`INSERT INTO payments (order_id, method, amount, status, createdat) 
         VALUES ($1, $2, $3,'processing',NOW()) 
         RETURNING *`, [orderId, paymentMethod, totalAmount]);
            return rows[0];
        }
        catch (error) {
            console.error("Error inserting user:", error);
            throw error;
        }
    }
}
exports.default = Payment;
