import express from "express";

const router = express.Router();
import requireSignin from "../library/auth";
import ratingController from "../controller/rating";

router.post("/add-rating", requireSignin, ratingController.createRating);

export default router;
