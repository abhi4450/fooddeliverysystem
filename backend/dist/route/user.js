"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../controller/user"));
const auth_1 = __importDefault(require("../library/auth"));
router.post("/signup", user_1.default.signup);
router.post("/login", user_1.default.login);
router.post("/user/add-address", auth_1.default, user_1.default.addAddress);
exports.default = router;
