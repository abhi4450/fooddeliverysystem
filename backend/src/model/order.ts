import pool from "../library/connection";

class Order {
  static async createOrder(
    userId: number,
    restaurantId: number,
    totalPrice: number,
    client?: any
  ) {
    const result = await client.query(
      "INSERT INTO orders (customer_id, restaurant_id, totalamount, orderstatus, createdat) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [userId, restaurantId, totalPrice, "pending"]
    );
    return result.rows[0];
  }

  static async addOrderItem(
    orderId: number,
    foodItemId: number,
    quantity: number,
    price: number,
    client?: any
  ) {
    console.log("foodItemId from add OrderItem:", foodItemId);
    if (client) {
      await client.query(
        "INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, foodItemId, quantity, price]
      );
    } else {
      await pool.query(
        "INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, foodItemId, quantity, price]
      );
    }
  }
  static async getOrderDetails(userId: number) {
    console.log("fetching orders for userId", userId);
    const { rows } = await pool.query(
      `SELECT 
          rs.name AS restaurantName,
          (odi.price * odi.quantity) As total_price,
          odi.food_item_id,
          odi.quantity,
          odi.price
       FROM 
          restaurants rs
       JOIN 
          orders od ON od.restaurant_id = rs.id
       JOIN 
          order_items odi ON odi.order_id = od.id
       WHERE 
          od.customer_id = $1`,
      [userId]
    );

    console.log("orderDetails:::::", rows);
    return { orderDetails: rows };
  }

  static async getTotalForOderId(
    userId: number,
    orderId: number,
    client: any
  ): Promise<number> {
    const { rows } = await client.query(
      `SELECT totalamount from orders where customer_id=$1 AND id=$2`,
      [userId, orderId]
    );

    return rows[0].totalamount;
  }
}

export default Order;
