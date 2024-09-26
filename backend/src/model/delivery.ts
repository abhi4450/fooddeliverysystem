import pool from "../library/connection";

interface DeliveryData {
  orderId: number;
  client: any;
  deliveryPersonId: number;
}

class Delivery {
  constructor() {}

  static async getDeliveryPersonId(client: any): Promise<number> {
    const { rows } = await client.query(
      `SELECT id FROM users WHERE userType = $1`,
      ["delivery_person"]
    );
    return rows[0].id;
  }

  static async createDelivery(data: DeliveryData) {
    const { orderId, deliveryPersonId, client } = data;

    try {
      const { rows } = await client.query(
        `INSERT INTO deliveries (order_id, delivery_person_id,delivery_status,created_at) 
         VALUES ($1, $2,'processing',NOW()) 
         RETURNING *`,
        [orderId, deliveryPersonId]
      );

      return rows[0];
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
}

export default Delivery;
