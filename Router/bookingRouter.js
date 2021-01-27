const express = require("express");
const { protectRoute } = require("../Controller/authController");
const { createPaymentSession ,checkoutComplete} = require("../Controller/bookingController");
const bodyParser = require("body-parser");


const bookingRouter = express.Router();

bookingRouter.post("/createPaymentSession" , protectRoute , createPaymentSession);
bookingRouter.post("/checkoutComplete",bodyParser.raw({type: 'application/json'}) ,checkoutComplete);

module.exports = bookingRouter;