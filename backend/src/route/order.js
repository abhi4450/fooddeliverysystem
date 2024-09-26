"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var auth_1 = require("../library/auth");
var order_1 = require("../controller/order");
router.post("/order", auth_1.default, order_1.default.createOrder);
router.get("/orders", auth_1.default, order_1.default.fetchOrders);
exports.default = router;
