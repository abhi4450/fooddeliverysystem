"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../model/user"));
const helper_1 = __importDefault(require("../library/helper"));
const validationSchema_1 = __importDefault(require("../library/validationSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    try {
        const result = await validationSchema_1.default.signupSchema.validateAsync(req.body);
        const hashedPassword = await helper_1.default.hashPassword(result.password);
        const existingUser = await user_1.default.getUserByEmail(result.email);
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const newUser = await user_1.default.insertUser({
            ...result,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (err) {
        if (err.isJoi) {
            res
                .status(400)
                .json({ message: "Validation error", details: err.details });
            return;
        }
        res.status(500).json({ message: "Internal server error", err });
    }
};
const login = async (req, res) => {
    const result = await validationSchema_1.default.loginSchema.validateAsync(req.body);
    try {
        const user = await user_1.default.getUserByEmail(result.email);
        if (!user) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }
        const passwordMatch = await helper_1.default.comparePassword(result.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Email is valid but incorrect password",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        return res.status(200).json({
            message: "User Logged In Successfully.",
            user: user,
            token: token,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const addAddress = async (req, res) => {
    try {
        const result = await validationSchema_1.default.addressSchema.validateAsync(req.body);
        const newAddress = await user_1.default.createAddress({
            ...result,
            user_id: req.user.id,
        });
        return res.status(201).json({
            newAddress: newAddress,
            message: "Address created successfully",
        });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
};
const userController = {
    signup,
    login,
    addAddress,
};
exports.default = userController;
