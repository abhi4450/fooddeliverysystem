"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../library/connection"));
class Rating {
    constructor() { }
    static async insertRating(ratingDetails) {
        const { restaurantId, rating, userId } = ratingDetails;
        try {
            const { rows } = await connection_1.default.query(`INSERT INTO rating (user_id,restaurant_id,rating) 
         VALUES ($1, $2, $3) 
         RETURNING *`, [userId, restaurantId, rating]);
            return rows[0];
        }
        catch (error) {
            console.error("Error creating rating:", error);
            throw error;
        }
    }
}
exports.default = Rating;
