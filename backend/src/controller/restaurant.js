"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var validationSchema_1 = require("../library/validationSchema");
var restaurant_1 = require("../model/restaurant");
var createRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newRestaurant, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validationSchema_1.default.restaurantSchema.validateAsync(req.body)];
            case 1:
                result = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, restaurant_1.default.insertRestaurant(__assign(__assign({}, result), { owner_id: req.user.id }))];
            case 3:
                newRestaurant = _a.sent();
                res.status(201).json({
                    message: "Restaurant created successfully",
                    restaurant: newRestaurant,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(500).json({ message: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getRestaurants = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurants, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, restaurant_1.default.getAllRestaurants()];
            case 1:
                restaurants = _a.sent();
                res.status(200).json(restaurants);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getRestaurantMenu = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, menuWithItems, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, restaurant_1.default.getMenuWithFoodItems(id)];
            case 2:
                menuWithItems = _a.sent();
                if (!menuWithItems) {
                    res.status(404).json({ message: "Menu not found for this restaurant" });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    message: "Menu fetched successfully",
                    data: menuWithItems,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ message: "Internal server error", error: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var searchRestaurantByName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, restaurants, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.query.name;
                console.log("restaurant_name", name);
                if (!name) {
                    res.status(400).json({ message: "Restaurant name is required" });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, restaurant_1.default.searchByName(name)];
            case 2:
                restaurants = _a.sent();
                if (restaurants.length === 0) {
                    res.status(404).json({ message: "No restaurants found with that name" });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    error: false,
                    message: "Restaurants fetched successfully",
                    data: restaurants,
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: "Internal server error", error: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var restaurantController = {
    createRestaurant: createRestaurant,
    getRestaurants: getRestaurants,
    getRestaurantMenu: getRestaurantMenu,
    searchRestaurantByName: searchRestaurantByName,
};
exports.default = restaurantController;
