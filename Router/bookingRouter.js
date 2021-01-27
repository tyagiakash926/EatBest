const express = require("express");
const { protectRoute } = require("../Controller/authController");
const { createPaymentSession } = require("../Controller/bookingController");


const bookingRouter = express.Router();

bookingRouter.post("/createPaymentSession" , protectRoute , createPaymentSession);

module.exports = bookingRouter;