"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../library/auth"));
const payment_1 = __importDefault(require("../controller/payment"));
router.post("/make-payment", auth_1.default, payment_1.default.createPayment);
exports.default = router;
