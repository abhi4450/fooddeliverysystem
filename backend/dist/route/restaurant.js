"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restaurant_1 = __importDefault(require("../controller/restaurant"));
const auth_1 = __importDefault(require("../library/auth"));
router.post("/restaurant", auth_1.default, restaurant_1.default.createRestaurant);
router.get("/restaurants", auth_1.default, restaurant_1.default.getRestaurants);
router.get("/restaurant/:id/menu", auth_1.default, restaurant_1.default.getRestaurantMenu);
router.get("/restaurants/search", auth_1.default, restaurant_1.default.searchRestaurantByName);
exports.default = router;
