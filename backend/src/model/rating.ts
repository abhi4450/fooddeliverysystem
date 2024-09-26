import pool from "../library/connection";

interface ratingData {
  restaurantId: number;
  rating: number;
  userId: number;
}

class Rating {
  constructor() {}

  static async insertRating(ratingDetails: ratingData) {
    const { restaurantId, rating, userId } = ratingDetails;

    try {
      const { rows } = await pool.query(
        `INSERT INTO rating (user_id,restaurant_id,rating) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [userId, restaurantId, rating]
      );

      return rows[0];
    } catch (error) {
      console.error("Error creating rating:", error);
      throw error;
    }
  }
}

export default Rating;
