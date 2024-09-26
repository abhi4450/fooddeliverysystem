"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../model/cart"));
const addToCart = async (req, res) => {
    const { foodItemId, quantity, price } = req.body;
    try {
        let cart = await cart_1.default.getCartByUserId(req.user.id);
        console.log("fetched cart", cart);
        if (!cart) {
            cart = await cart_1.default.createCart(req.user.id);
        }
        // Adding item to the cart
        const result = await cart_1.default.addItemToCart(cart.id, foodItemId, quantity, price);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const fetchCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await cart_1.default.getCartByUserId(userId);
        if (cart) {
            const cartDetails = await cart_1.default.getCartItemsWithTotal(cart.id);
            res.status(200).json(cartDetails);
        }
        else {
            res.status(404).json({ message: "Cart not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const removeItemFromCart = async (req, res) => {
    const { cartId, foodItemId } = req.params;
    try {
        const result = await cart_1.default.removeItemFromCart(cartId, foodItemId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to remove item from cart", error });
    }
};
const cartController = {
    addToCart,
    fetchCart,
    removeItemFromCart,
};
exports.default = cartController;
