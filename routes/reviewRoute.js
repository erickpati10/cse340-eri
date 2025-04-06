// this file has been added to ad the review section on the car details page. 
// week 13

const express = require("express");
const router = new express.Router();
const reviewController = require("../controllers/reviewController");
const utilities = require("../utilities");
const reviewValidate = require("../utilities/review-validation");

router.post(
  "/add",
  utilities.checkLogin,
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  reviewController.addReview
);
router.post("/add", reviewController.addReview);


router.get("/edit/:reviewId", utilities.checkLogin, reviewController.editReviewPage);
router.post("/update", reviewValidate.reviewRules(), reviewValidate.checkReviewData, reviewController.updateReview);


router.get(
  "/delete/:reviewId",
  utilities.handleErrors(reviewController.deleteReviewView)
);

router.post("/delete/",   
  utilities.handleErrors(reviewController.deleteReview)
  );

module.exports = router;
