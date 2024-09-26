"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const connection_1 = __importDefault(require("./library/connection"));
const user_1 = __importDefault(require("./route/user"));
const restaurant_1 = __importDefault(require("./route/restaurant"));
const cart_1 = __importDefault(require("./route/cart"));
const order_1 = __importDefault(require("./route/order"));
const payment_1 = __importDefault(require("./route/payment"));
const rating_1 = __importDefault(require("./route/rating"));
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
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Database connection established, Server listening on port ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log("Error connecting to the database", err);
});
