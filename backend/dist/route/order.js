"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../library/auth"));
const order_1 = __importDefault(require("../controller/order"));
router.post("/order", auth_1.default, order_1.default.createOrder);
router.get("/orders", auth_1.default, order_1.default.fetchOrders);
exports.default = router;
