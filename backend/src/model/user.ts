import pool from "../library/connection";

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  usertype: string;
}

interface AddressData {
  user_id: number;
  state: string;
  city: string;
  street: string;
  pincode: number;
}

class User {
  constructor() {}

  static async insertUser(userData: User) {
    const { name, email, password, phone, usertype } = userData;

    try {
      const { rows } = await pool.query(
        `INSERT INTO users (name, email, password, phone, usertype) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, email, password, phone, usertype]
      );

      return rows[0];
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
  static async getUserByEmail(email: string) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);
      return result.rows.length ? result.rows[0] : null;
    } catch (error: any) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  static async createAddress(resultData: AddressData) {
    try {
      const { user_id, state, city, street, pincode } = resultData;

      const { rows } = await pool.query(
        `INSERT INTO address (user_id, state, city, street, pincode) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [user_id, state, city, street, pincode]
      );

      return rows[0];
    } catch (error: any) {
      throw new Error(`Error saving the address`);
    }
  }
}

export default User;
