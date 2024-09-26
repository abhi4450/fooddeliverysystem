import pool from "../library/connection";

class Cart {
  static async getCartByUserId(userId: number) {
    const { rows } = await pool.query(`SELECT * FROM cart WHERE user_id = $1`, [
      userId,
    ]);
    return rows.length ? rows[0] : null;
  }

  static async createCart(userId: number | string) {
    const { rows } = await pool.query(
      `INSERT INTO cart (user_id, createdat) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *`,
      [userId]
    );

    return rows[0];
  }

  static async getCartItemsWithTotal(cartId: number | string, client?: any) {
    if (client) {
      const { rows } = await client.query(
        `SELECT fi.item_name, ci.food_item_id, ci.quantity, ci.price, 
                 
                (ci.price * ci.quantity) AS total_price
         FROM cartitems ci
         JOIN fooditems fi ON ci.food_item_id = fi.id
         WHERE ci.cart_id = $1`,
        [cartId]
      );

      let totalamount = rows.reduce(
        (sum: any, item: any) => sum + parseFloat(item.total_price),
        0
      );

      totalamount = totalamount.toFixed(2);

      return { items: rows, totalamount };
    } else {
      const { rows } = await pool.query(
        `SELECT fi.item_name, ci.quantity, ci.price, 
                 
                (ci.price * ci.quantity) AS total_price
         FROM cartitems ci
         JOIN fooditems fi ON ci.food_item_id = fi.id
         WHERE ci.cart_id = $1`,
        [cartId]
      );

      const totalamount = rows.reduce(
        (sum: any, item: any) => sum + parseFloat(item.total_price),
        0
      );

      return { items: rows, totalamount };
    }
  }

  static async addItemToCart(
    cartId: number | string,
    foodItemId: number | string,
    quantity: number | string,
    price: number | string
  ) {
    const existingItemResult = await pool.query(
      `SELECT * FROM cartitems WHERE cart_id = $1 AND food_item_id = $2`,
      [cartId, foodItemId]
    );

    if (existingItemResult.rows.length > 0) {
      const existingItem = existingItemResult.rows[0];
      const newQuantity =
        (existingItem.quantity as number) +
        (typeof quantity === "string" ? parseInt(quantity) : quantity);

      await pool.query(
        `UPDATE cartitems SET quantity = $1 WHERE cart_id = $2 AND food_item_id = $3`,
        [newQuantity, cartId, foodItemId]
      );

      return { message: "Quantity updated successfully", item: existingItem };
    } else {
      const result = await pool.query(
        `INSERT INTO cartitems (cart_id, food_item_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`,
        [cartId, foodItemId, quantity, price]
      );
      return {
        message: "Item added to cart successfully",
        item: result.rows[0],
      };
    }
  }

  static async removeItemFromCart(
    cartId: number | string,
    foodItemId: number | string
  ) {
    //Checking if the item exists in the cart
    const existingItemResult = await pool.query(
      `SELECT * FROM cartitems WHERE cart_id = $1 AND food_item_id = $2`,
      [cartId, foodItemId]
    );

    const existingItem = existingItemResult.rows[0];

    // If the item quantity is 1, remove it from the cart
    if (existingItem.quantity === 1) {
      await pool.query(
        `DELETE FROM cartitems WHERE cart_id = $1 AND food_item_id = $2`,
        [cartId, foodItemId]
      );
      return { message: "Item removed from the cart" };
    }

    //If the item quantity is greater than 1, reduce the quantity
    const newQuantity = existingItem.quantity - 1;
    await pool.query(
      `UPDATE cartitems SET quantity = $1 WHERE cart_id = $2 AND food_item_id = $3`,
      [newQuantity, cartId, foodItemId]
    );

    return { message: "Item quantity updated", newQuantity };
  }

  static async clearCart(cart_id: number, client?: any) {
    await client.query(`DELETE FROM cartitems WHERE cart_id=$1`, [cart_id]);
  }
}

export default Cart;
