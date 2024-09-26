import Cart from "../model/cart";
import { Request, Response } from "express";

const addToCart = async (req: any, res: Response): Promise<void> => {
  const { foodItemId, quantity, price } = req.body;

  try {
    let cart = await Cart.getCartByUserId(req.user.id);
    console.log("fetched cart", cart);
    if (!cart) {
      cart = await Cart.createCart(req.user.id);
    }

    // Adding item to the cart
    const result = await Cart.addItemToCart(
      cart.id,
      foodItemId,
      quantity,
      price
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const fetchCart = async (req: any, res: Response): Promise<void> => {
  const userId = req.user.id;

  try {
    const cart = await Cart.getCartByUserId(userId);

    if (cart) {
      const cartDetails = await Cart.getCartItemsWithTotal(cart.id);
      res.status(200).json(cartDetails);
    } else {
      res.status(404).json({ message: "Cart not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const removeItemFromCart = async (req: Request, res: Response) => {
  const { cartId, foodItemId } = req.params;

  try {
    const result = await Cart.removeItemFromCart(cartId, foodItemId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item from cart", error });
  }
};

const cartController = {
  addToCart,
  fetchCart,
  removeItemFromCart,
};

export default cartController;
