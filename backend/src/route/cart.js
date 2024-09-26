"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var auth_1 = require("../library/auth");
var cart_1 = require("../controller/cart");
router.post("/add-to-cart", auth_1.default, cart_1.default.addToCart);
router.get("/cart", auth_1.default, cart_1.default.fetchCart);
router.post("/remove-from-cart/:cartId/:foodItemId", auth_1.default, cart_1.default.removeItemFromCart);
exports.default = router;
