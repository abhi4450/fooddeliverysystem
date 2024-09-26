import express from "express";

const router = express.Router();
import requireSignin from "../library/auth";
import paymentController from "../controller/payment";

router.post("/make-payment", requireSignin, paymentController.createPayment);

export default router;
