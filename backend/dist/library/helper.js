"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    try {
        return await bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        throw new Error("Error hashing password");
    }
};
const comparePassword = async (inputPassword, userPassword) => {
    try {
        return await bcrypt_1.default.compare(inputPassword, userPassword);
    }
    catch (error) {
        throw new Error("Error comparing password");
    }
};
const helpers = {
    hashPassword,
    comparePassword
};
exports.default = helpers;
