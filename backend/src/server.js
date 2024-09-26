"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var app = (0, express_1.default)();
dotenv_1.default.config();
var connection_1 = require("./library/connection");
var user_1 = require("./route/user");
var restaurant_1 = require("./route/restaurant");
var cart_1 = require("./route/cart");
var order_1 = require("./route/order");
var payment_1 = require("./route/payment");
var rating_1 = require("./route/rating");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api", user_1.default);
app.use("/api", restaurant_1.default);
app.use("/api", cart_1.default);
app.use("/api", order_1.default);
app.use("/api", payment_1.default);
app.use("/api", rating_1.default);
connection_1.default
    .connect()
    .then(function () {
    app.listen(process.env.PORT, function () {
        console.log("Database connection established, Server listening on port ".concat(process.env.PORT));
    });
})
    .catch(function (err) {
    console.log("Error connecting to the database", err);
});
