"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../model/order"));
const cart_1 = __importDefault(require("../model/cart"));
const connection_1 = __importDefault(require("../library/connection"));
const createOrder = async (req, res) => {
    const { restaurant_id, cart_id } = req.query;
    console.log("restaurantId and cartId", restaurant_id, cart_id);
    // Starting a transaction
    const client = await connection_1.default.connect();
    try {
        //  the transaction begins
        await client.query("BEGIN");
        const cartItems = await cart_1.default.getCartItemsWithTotal(cart_id, client);
        console.log("cartItems.items", cartItems.items);
        // Creates the order
        const order = await order_1.default.createOrder(req.user.id, restaurant_id, cartItems.totalamount, client // Passing the client to execute queries within the transaction
        );
        // Insert each item into the order
        for (const item of cartItems.items) {
            await order_1.default.addOrderItem(order.id, item.food_item_id, item.quantity, item.price, client // Pass the client to keep all queries in the same transaction
            );
        }
        // Clears the cart after the order is placed
        await cart_1.default.clearCart(cart_id, client);
        // Commit the transaction
        await client.query("COMMIT");
        return res
            .status(201)
            .json({ message: "Order placed successfully", orderId: order.id });
    }
    catch (error) {
        // Roll back the transaction if any step fails
        await client.query("ROLLBACK");
        console.error(error);
        return res.status(500).json({ message: "Failed to place order" });
    }
    finally {
        client.release(); // Releasing the client back to the pool
    }
};
const fetchOrders = async (req, res) => {
    try {
        console.log("fetching orders...");
        const orderDetails = await order_1.default.getOrderDetails(req.user.id);
        if (orderDetails) {
            res.status(200).json(orderDetails);
        }
        else {
            res.status(404).json({ message: "orders not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const orderController = {
    createOrder,
    fetchOrders,
};
exports.default = orderController;
