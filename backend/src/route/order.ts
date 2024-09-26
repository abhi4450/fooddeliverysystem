import express from "express";

const router = express.Router();
import requireSignin from "../library/auth";
import orderController from "../controller/order";

router.post("/order", requireSignin, orderController.createOrder);
router.get("/orders", requireSignin, orderController.fetchOrders);

export default router;
