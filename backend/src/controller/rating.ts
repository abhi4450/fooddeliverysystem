import validationSchema from "../library/validationSchema";
import { any, number, string } from "joi";
import { Request, Response } from "express";
import Rating from "../model/rating";

const createRating = async (req: any, res: Response) => {
  const result = await validationSchema.ratingSchema.validateAsync(req.body);

  const { restaurantId, rating } = result;

  try {
    const newRating = await Rating.insertRating({
      restaurantId,
      rating,
      userId: req.user.id,
    });
    return res
      .status(201)
      .json({ newRating, message: "rating added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Rating couldn't be added due to some issues" });
  }
};

const ratingController = {
  createRating,
};

export default ratingController;
