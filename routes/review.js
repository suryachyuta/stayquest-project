const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");//model
const Review = require("../models/review.js");//model
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { createReview } = require("../controllers/review.js");

const reviewController = require("../controllers/review.js");

//Create Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;