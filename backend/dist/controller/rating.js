"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationSchema_1 = __importDefault(require("../library/validationSchema"));
const rating_1 = __importDefault(require("../model/rating"));
const createRating = async (req, res) => {
    const result = await validationSchema_1.default.ratingSchema.validateAsync(req.body);
    const { restaurantId, rating } = result;
    try {
        const newRating = await rating_1.default.insertRating({
            restaurantId,
            rating,
            userId: req.user.id,
        });
        return res
            .status(201)
            .json({ newRating, message: "rating added successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ error, message: "Rating couldn't be added due to some issues" });
    }
};
const ratingController = {
    createRating,
};
exports.default = ratingController;
