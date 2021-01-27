const express = require("express");
const reviewRouter = express.Router();
const { protectRoute } = require("../Controller/authController");
const { createReview,updateReviewById, deleteReviewById } = require("../Controller/reviewController");

reviewRouter.route("").post(protectRoute,createReview);
reviewRouter.route("/:reviewId").post(protectRoute,updateReviewById).delete(protectRoute,deleteReviewById);

module.exports = reviewRouter;