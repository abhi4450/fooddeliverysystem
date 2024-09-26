"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationSchema_1 = __importDefault(require("../library/validationSchema"));
const restaurant_1 = __importDefault(require("../model/restaurant"));
const createRestaurant = async (req, res) => {
    const result = await validationSchema_1.default.restaurantSchema.validateAsync(req.body);
    try {
        const newRestaurant = await restaurant_1.default.insertRestaurant({
            ...result,
            owner_id: req.user.id,
        });
        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant: newRestaurant,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurant_1.default.getAllRestaurants();
        res.status(200).json(restaurants);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getRestaurantMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const menuWithItems = await restaurant_1.default.getMenuWithFoodItems(id);
        if (!menuWithItems) {
            res.status(404).json({ message: "Menu not found for this restaurant" });
            return;
        }
        res.status(200).json({
            message: "Menu fetched successfully",
            data: menuWithItems,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const searchRestaurantByName = async (req, res) => {
    const { name } = req.query;
    console.log("restaurant_name", name);
    if (!name) {
        res.status(400).json({ message: "Restaurant name is required" });
        return;
    }
    try {
        const restaurants = await restaurant_1.default.searchByName(name); //type assertion (forcing it as string)
        if (restaurants.length === 0) {
            res.status(404).json({ message: "No restaurants found with that name" });
            return;
        }
        res.status(200).json({
            error: false,
            message: "Restaurants fetched successfully",
            data: restaurants,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
const restaurantController = {
    createRestaurant,
    getRestaurants,
    getRestaurantMenu,
    searchRestaurantByName,
};
exports.default = restaurantController;
