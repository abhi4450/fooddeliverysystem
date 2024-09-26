"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../library/auth"));
const cart_1 = __importDefault(require("../controller/cart"));
router.post("/add-to-cart", auth_1.default, cart_1.default.addToCart);
router.get("/cart", auth_1.default, cart_1.default.fetchCart);
router.post("/remove-from-cart/:cartId/:foodItemId", auth_1.default, cart_1.default.removeItemFromCart);
exports.default = router;
