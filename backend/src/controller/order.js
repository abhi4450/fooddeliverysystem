"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../model/order");
var cart_1 = require("../model/cart");
var connection_1 = require("../library/connection");
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, restaurant_id, cart_id, client, cartItems, order, _i, _b, item, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, restaurant_id = _a.restaurant_id, cart_id = _a.cart_id;
                console.log("restaurantId and cartId", restaurant_id, cart_id);
                return [4 /*yield*/, connection_1.default.connect()];
            case 1:
                client = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 12, 14, 15]);
                //  the transaction begins
                return [4 /*yield*/, client.query("BEGIN")];
            case 3:
                //  the transaction begins
                _c.sent();
                return [4 /*yield*/, cart_1.default.getCartItemsWithTotal(cart_id, client)];
            case 4:
                cartItems = _c.sent();
                console.log("cartItems.items", cartItems.items);
                return [4 /*yield*/, order_1.default.createOrder(req.user.id, restaurant_id, cartItems.totalamount, client // Passing the client to execute queries within the transaction
                    )];
            case 5:
                order = _c.sent();
                _i = 0, _b = cartItems.items;
                _c.label = 6;
            case 6:
                if (!(_i < _b.length)) return [3 /*break*/, 9];
                item = _b[_i];
                return [4 /*yield*/, order_1.default.addOrderItem(order.id, item.food_item_id, item.quantity, item.price, client // Pass the client to keep all queries in the same transaction
                    )];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 6];
            case 9: 
            // Clears the cart after the order is placed
            return [4 /*yield*/, cart_1.default.clearCart(cart_id, client)];
            case 10:
                // Clears the cart after the order is placed
                _c.sent();
                // Commit the transaction
                return [4 /*yield*/, client.query("COMMIT")];
            case 11:
                // Commit the transaction
                _c.sent();
                return [2 /*return*/, res
                        .status(201)
                        .json({ message: "Order placed successfully", orderId: order.id })];
            case 12:
                error_1 = _c.sent();
                // Roll back the transaction if any step fails
                return [4 /*yield*/, client.query("ROLLBACK")];
            case 13:
                // Roll back the transaction if any step fails
                _c.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({ message: "Failed to place order" })];
            case 14:
                client.release(); // Releasing the client back to the pool
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
var fetchOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderDetails, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("fetching orders...");
                return [4 /*yield*/, order_1.default.getOrderDetails(req.user.id)];
            case 1:
                orderDetails = _a.sent();
                if (orderDetails) {
                    res.status(200).json(orderDetails);
                }
                else {
                    res.status(404).json({ message: "orders not found" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: "Internal server error", error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var orderController = {
    createOrder: createOrder,
    fetchOrders: fetchOrders,
};
exports.default = orderController;
