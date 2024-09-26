"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../library/connection"));
class Order {
    static async createOrder(userId, restaurantId, totalPrice, client) {
        const result = await client.query("INSERT INTO orders (customer_id, restaurant_id, totalamount, orderstatus, createdat) VALUES ($1, $2, $3, $4, NOW()) RETURNING *", [userId, restaurantId, totalPrice, "pending"]);
        return result.rows[0];
    }
    static async addOrderItem(orderId, foodItemId, quantity, price, client) {
        console.log("foodItemId from add OrderItem:", foodItemId);
        if (client) {
            await client.query("INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES ($1, $2, $3, $4)", [orderId, foodItemId, quantity, price]);
        }
        else {
            await connection_1.default.query("INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES ($1, $2, $3, $4)", [orderId, foodItemId, quantity, price]);
        }
    }
    static async getOrderDetails(userId) {
        console.log("fetching orders for userId", userId);
        const { rows } = await connection_1.default.query(`SELECT 
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
          od.customer_id = $1`, [userId]);
        console.log("orderDetails:::::", rows);
        return { orderDetails: rows };
    }
    static async getTotalForOderId(userId, orderId, client) {
        const { rows } = await client.query(`SELECT totalamount from orders where customer_id=$1 AND id=$2`, [userId, orderId]);
        return rows[0].totalamount;
    }
}
exports.default = Order;
