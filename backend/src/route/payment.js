"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var auth_1 = require("../library/auth");
var payment_1 = require("../controller/payment");
router.post("/make-payment", auth_1.default, payment_1.default.createPayment);
exports.default = router;
