import pool from "../library/connection";

interface Restaurant {
  name: string;
  address: string;
  phone: string;
  owner_id: number;
}

class Restaurant implements Restaurant {
  static async insertRestaurant(restaurantData: Restaurant) {
    const { name, address, phone, owner_id } = restaurantData;
    try {
      const query = `
        INSERT INTO restaurants (name, address, phone, owner_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [
        name,
        address,
        phone,
        owner_id,
      ]);
      return rows[0];
    } catch (error: any) {
      throw new Error(`Error inserting restaurant: ${error.message}`);
    }
  }

  static async getAllRestaurants() {
    try {
      const query = `
        SELECT * FROM restaurants;
      `;
      const { rows } = await pool.query(query);
      return rows;
    } catch (error: any) {
      throw new Error(`Error fetching restaurants: ${error.message}`);
    }
  }

  static async getRestaurantById(restaurantId: number) {
    try {
      const query = `
        SELECT * FROM restaurants WHERE id = $1;
      `;
      const { rows } = await pool.query(query, [restaurantId]);
      return rows[0];
    } catch (error: any) {
      throw new Error(
        `Error fetching restaurant with ID ${restaurantId}: ${error.message}`
      );
    }
  }

  static async updateRestaurant(restaurantData: Restaurant) {
    const { name, address, phone, owner_id } = restaurantData;
    try {
      const query = `
        UPDATE restaurants 
        SET name = $1, address = $2, phone = $3, owner_id = $4 
        WHERE id = $5 
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [
        name,
        address,
        phone,
        owner_id,
      ]);
      return rows[0];
    } catch (error: any) {
      throw new Error(`Error updating restaurant: ${error.message}`);
    }
  }

  static async getMenuWithFoodItems(restaurantId: number | string) {
    console.log("restaurantId", restaurantId);
    try {
      const query = `
            SELECT
            fi.id As foodItemId,
              rm.menuname,
              fi.item_name,
              fi.price,
              fi.description,
              fi.isavailable
            FROM 
              restaurantMenu rm
            JOIN 
              foodItems fi ON rm.id = fi.menu_id
            WHERE 
              rm.restaurant_id = $1
          `;

      const { rows } = await pool.query(query, [restaurantId]);
      console.log("rows of menu", rows);

      if (rows.length === 0) {
        return null;
      }

      return rows;
    } catch (error) {
      console.error("Error fetching menu with food items", error);
      throw new Error("Database query error");
    }
  }

  static async searchByName(name: string) {
    try {
      const query = `SELECT * FROM restaurants WHERE LOWER(name) LIKE LOWER($1)`;
      const values = [`%${name}%`];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw new Error("Error fetching restaurants by name");
    }
  }
}

export default Restaurant;
