import express from "express";

const router = express.Router();
import userController from "../controller/user";
import requireSignin from "../library/auth";

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/user/add-address", requireSignin, userController.addAddress);

export default router;
