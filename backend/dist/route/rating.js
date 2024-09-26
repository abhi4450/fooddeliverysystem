"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../library/auth"));
const rating_1 = __importDefault(require("../controller/rating"));
router.post("/add-rating", auth_1.default, rating_1.default.createRating);
exports.default = router;
