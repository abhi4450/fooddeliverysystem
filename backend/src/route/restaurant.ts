import express from "express";

const router = express.Router();
import restaurantController from "../controller/restaurant";
import requireSignin from "../library/auth";

router.post(
  "/restaurant",
  requireSignin,
  restaurantController.createRestaurant
);
router.get("/restaurants", requireSignin, restaurantController.getRestaurants);
router.get(
  "/restaurant/:id/menu",
  requireSignin,
  restaurantController.getRestaurantMenu
);
router.get(
  "/restaurants/search",
  requireSignin,
  restaurantController.searchRestaurantByName
);

export default router;
