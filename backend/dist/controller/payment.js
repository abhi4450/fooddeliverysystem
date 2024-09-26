"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delivery_1 = __importDefault(require("../model/delivery"));
const order_1 = __importDefault(require("../model/order"));
const payment_1 = __importDefault(require("../model/payment"));
const validationSchema_1 = __importDefault(require("../library/validationSchema"));
const connection_1 = __importDefault(require("../library/connection"));
const createPayment = async (req, res) => {
    const result = await validationSchema_1.default.paymentSchema.validateAsync(req.body);
    const { orderId, paymentMethod } = result;
    // Starting a transaction
    const client = await connection_1.default.connect();
    try {
        const totalAmount = await order_1.default.getTotalForOderId(req.user.id, orderId, client);
        await payment_1.default.insertPayment({
            orderId,
            paymentMethod,
            totalAmount,
            client,
        });
        const deliveryPersonId = await delivery_1.default.getDeliveryPersonId(client);
        const deliveryDetails = await delivery_1.default.createDelivery({
            orderId,
            deliveryPersonId,
            client,
        });
        // Commit the transaction
        await client.query("COMMIT");
        return res.status(201).json({
            deliveryDetails,
            message: "We are processing your payment,once successful,will be assinging a delivery partner for your order",
        });
    }
    catch (error) {
        // Roll back the transaction if any step fails
        await client.query("ROLLBACK");
        console.error(error);
        return res.status(500).json({ message: "falied to process the payment" });
    }
    finally {
        client.release(); // Releasing the client back to the pool
    }
};
const paymentController = {
    createPayment,
};
exports.default = paymentController;
