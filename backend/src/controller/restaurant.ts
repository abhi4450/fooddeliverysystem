import validationSchema from "../library/validationSchema";

import { Request, Response } from "express";
import Restaurant from "../model/restaurant";

const createRestaurant = async (req: any, res: Response) => {
  const result = await validationSchema.restaurantSchema.validateAsync(
    req.body
  );

  try {
    const newRestaurant = await Restaurant.insertRestaurant({
      ...result,
      owner_id: req.user.id,
    });
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const menuWithItems = await Restaurant.getMenuWithFoodItems(id);

    if (!menuWithItems) {
      res.status(404).json({ message: "Menu not found for this restaurant" });
      return;
    }

    res.status(200).json({
      message: "Menu fetched successfully",
      data: menuWithItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const searchRestaurantByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.query;

  console.log("restaurant_name", name);

  if (!name) {
    res.status(400).json({ message: "Restaurant name is required" });
    return;
  }

  try {
    const restaurants = await Restaurant.searchByName(name as string); //type assertion (forcing it as string)

    if (restaurants.length === 0) {
      res.status(404).json({ message: "No restaurants found with that name" });
      return;
    }

    res.status(200).json({
      error: false,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const restaurantController = {
  createRestaurant,
  getRestaurants,
  getRestaurantMenu,
  searchRestaurantByName,
};
export default restaurantController;
