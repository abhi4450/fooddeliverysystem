"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../library/connection"));
class Cart {
    static async getCartByUserId(userId) {
        const { rows } = await connection_1.default.query(`SELECT * FROM cart WHERE user_id = $1`, [
            userId,
        ]);
        return rows.length ? rows[0] : null;
    }
    static async createCart(userId) {
        const { rows } = await connection_1.default.query(`INSERT INTO cart (user_id, createdat) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *`, [userId]);
        return rows[0];
    }
    static async getCartItemsWithTotal(cartId, client) {
        if (client) {
            const { rows } = await client.query(`SELECT fi.item_name, ci.food_item_id, ci.quantity, ci.price, 
                 
                (ci.price * ci.quantity) AS total_price
         FROM cartitems ci
         JOIN fooditems fi ON ci.food_item_id = fi.id
         WHERE ci.cart_id = $1`, [cartId]);
            let totalamount = rows.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
            totalamount = totalamount.toFixed(2);
            return { items: rows, totalamount };
        }
        else {
            const { rows } = await connection_1.default.query(`SELECT fi.item_name, ci.quantity, ci.price, 
                 
                (ci.price * ci.quantity) AS total_price
         FROM cartitems ci
         JOIN fooditems fi ON ci.food_item_id = fi.id
         WHERE ci.cart_id = $1`, [cartId]);
            const totalamount = rows.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
            return { items: rows, totalamount };
        }
    }
    static async addItemToCart(cartId, foodItemId, quantity, price) {
        const existingItemResult = await connection_1.default.query(`SELECT * FROM cartitems WHERE cart_id = $1 AND food_item_id = $2`, [cartId, foodItemId]);
        if (existingItemResult.rows.length > 0) {
            const existingItem = existingItemResult.rows[0];
            const newQuantity = existingItem.quantity +
                (typeof quantity === "string" ? parseInt(quantity) : quantity);
            await connection_1.default.query(`UPDATE cartitems SET quantity = $1 WHERE cart_id = $2 AND food_item_id = $3`, [newQuantity, cartId, foodItemId]);
            return { message: "Quantity updated successfully", item: existingItem };
        }
        else {
            const result = await connection_1.default.query(`INSERT INTO cartitems (cart_id, food_item_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`, [cartId, foodItemId, quantity, price]);
            return {
                message: "Item added to cart successfully",
                item: result.rows[0],
            };
        }
    }
    static async removeItemFromCart(cartId, foodItemId) {
        //Checking if the item exists in the cart
        const existingItemResult = await connection_1.default.query(`SELECT * FROM cartitems WHERE cart_id = $1 AND food_item_id = $2`, [cartId, foodItemId]);
        const existingItem = existingItemResult.rows[0];
        // If the item quantity is 1, remove it from the cart
        if (existingItem.quantity === 1) {
            await connection_1.default.query(`DELETE FROM cartitems WHERE cart_id = $1 AND food_item_id = $2`, [cartId, foodItemId]);
            return { message: "Item removed from the cart" };
        }
        //If the item quantity is greater than 1, reduce the quantity
        const newQuantity = existingItem.quantity - 1;
        await connection_1.default.query(`UPDATE cartitems SET quantity = $1 WHERE cart_id = $2 AND food_item_id = $3`, [newQuantity, cartId, foodItemId]);
        return { message: "Item quantity updated", newQuantity };
    }
    static async clearCart(cart_id, client) {
        await client.query(`DELETE FROM cartitems WHERE cart_id=$1`, [cart_id]);
    }
}
exports.default = Cart;
