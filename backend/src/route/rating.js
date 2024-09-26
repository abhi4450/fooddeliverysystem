"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var auth_1 = require("../library/auth");
var rating_1 = require("../controller/rating");
router.post("/add-rating", auth_1.default, rating_1.default.createRating);
exports.default = router;
