import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();

import pool from "./library/connection";
import userRoutes from "./route/user";
import restaurantRoutes from "./route/restaurant";
import cartRoutes from "./route/cart";
import orderRoutes from "./route/order";
import paymentRoutes from "./route/payment";
import ratingRoutes from "./route/rating";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api", ratingRoutes);

pool
  .connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Database connection established, Server listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((err: Error) => {
    console.log("Error connecting to the database", err);
  });
