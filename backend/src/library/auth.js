"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var requireSignin = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("req.user", req.user);
        next();
    }
    catch (err) {
        return res
            .status(401)
            .json({ message: "Invalid token", error: err.message });
    }
};
exports.default = requireSignin;
