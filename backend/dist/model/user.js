"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../library/connection"));
class User {
    constructor() { }
    static async insertUser(userData) {
        const { name, email, password, phone, usertype } = userData;
        try {
            const { rows } = await connection_1.default.query(`INSERT INTO users (name, email, password, phone, usertype) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`, [name, email, password, phone, usertype]);
            return rows[0];
        }
        catch (error) {
            console.error("Error inserting user:", error);
            throw error;
        }
    }
    static async getUserByEmail(email) {
        try {
            const result = await connection_1.default.query(`SELECT * FROM users WHERE email = $1`, [
                email,
            ]);
            return result.rows.length ? result.rows[0] : null;
        }
        catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }
    static async createAddress(resultData) {
        try {
            const { user_id, state, city, street, pincode } = resultData;
            const { rows } = await connection_1.default.query(`INSERT INTO address (user_id, state, city, street, pincode) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`, [user_id, state, city, street, pincode]);
            return rows[0];
        }
        catch (error) {
            throw new Error(`Error saving the address`);
        }
    }
}
exports.default = User;
