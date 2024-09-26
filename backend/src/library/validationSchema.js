"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var signupSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    phone: Joi.string().required(),
    usertype: Joi.string().required(),
});
var loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
});
var restaurantSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    address: Joi.string().min(10).max(500).required(),
    phone: Joi.string().required(),
});
var addressSchema = Joi.object({
    state: Joi.string().lowercase().required(),
    city: Joi.string().lowercase().required(),
    street: Joi.string().lowercase().required(),
    pincode: Joi.number().required(),
});
var paymentSchema = Joi.object({
    orderId: Joi.number().required(),
    paymentMethod: Joi.string().lowercase().required(),
});
var ratingSchema = Joi.object({
    restaurantId: Joi.number().required(),
    rating: Joi.number().required(),
});
var validationSchema = {
    signupSchema: signupSchema,
    loginSchema: loginSchema,
    restaurantSchema: restaurantSchema,
    addressSchema: addressSchema,
    paymentSchema: paymentSchema,
    ratingSchema: ratingSchema,
};
exports.default = validationSchema;
