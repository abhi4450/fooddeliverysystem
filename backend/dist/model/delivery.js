"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Delivery {
    constructor() { }
    static async getDeliveryPersonId(client) {
        const { rows } = await client.query(`SELECT id FROM users WHERE userType = $1`, ["delivery_person"]);
        return rows[0].id;
    }
    static async createDelivery(data) {
        const { orderId, deliveryPersonId, client } = data;
        try {
            const { rows } = await client.query(`INSERT INTO deliveries (order_id, delivery_person_id,delivery_status,created_at) 
         VALUES ($1, $2,'processing',NOW()) 
         RETURNING *`, [orderId, deliveryPersonId]);
            return rows[0];
        }
        catch (error) {
            console.error("Error inserting user:", error);
            throw error;
        }
    }
}
exports.default = Delivery;
