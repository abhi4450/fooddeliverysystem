"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const signupSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    phone: Joi.string().required(),
    usertype: Joi.string().required(),
});
const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
});
const restaurantSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    address: Joi.string().min(10).max(500).required(),
    phone: Joi.string().required(),
});
const addressSchema = Joi.object({
    state: Joi.string().lowercase().required(),
    city: Joi.string().lowercase().required(),
    street: Joi.string().lowercase().required(),
    pincode: Joi.number().required(),
});
const paymentSchema = Joi.object({
    orderId: Joi.number().required(),
    paymentMethod: Joi.string().lowercase().required(),
});
const ratingSchema = Joi.object({
    restaurantId: Joi.number().required(),
    rating: Joi.number().required(),
});
const validationSchema = {
    signupSchema,
    loginSchema,
    restaurantSchema,
    addressSchema,
    paymentSchema,
    ratingSchema,
};
exports.default = validationSchema;
