import express from "express";

const router = express.Router();
import requireSignin from "../library/auth";
import cartController from "../controller/cart";

router.post("/add-to-cart", requireSignin, cartController.addToCart);
router.get("/cart", requireSignin, cartController.fetchCart);
router.post(
  "/remove-from-cart/:cartId/:foodItemId",
  requireSignin,
  cartController.removeItemFromCart
);
export default router;
