// this file has been added to ad the review section on the car details page. 
// week 13

const invModel = require("../models/inventory-model");
const reviewModel = require("../models/review-model");
const utilities = require("../utilities");

const reviewCont = {};

// Add a review
reviewCont.addReview = async function (req, res) {
  try {
    const { review_text, inv_id, account_id } = req.body;
    await reviewModel.addReview(review_text, inv_id, account_id);
    req.flash("notice", "Review submitted.");
    res.redirect(`/inv/detail/${inv_id}`);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Server Error");
  }
};

// Edit review page
reviewCont.editReviewPage = async function (req, res) {
  try {
    const review_id = req.params.reviewId;
    const review = await reviewModel.getReviewById(review_id);
    const vehicle = await invModel.getVehicleById(review.inv_id);
    const nav = await utilities.getNav();
    res.render("review/edit-review", {
      title: "Edit Review",
      nav,
      review,
      vehicle,
      errors: null,
    });
  } catch (error) {
    console.error("Error loading edit review page:", error);
    res.status(500).send("Server Error");
  }
};

// Update a review
reviewCont.updateReview = async function (req, res) {
  try {
    const { review_id, review_text } = req.body;
    await reviewModel.updateReview(review_id, review_text);
    req.flash("notice", "Review updated successfully.");
    res.redirect("/account");
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).send("Server Error");
  }
};

// confirmation review delete view

reviewCont.deleteReviewView = async function (req, res, next) {
  const reviewId = parseInt(req.params.reviewId);

  if (isNaN(reviewId)) {
    return res.status(400).send("Invalid review ID");
  }

  let nav = await utilities.getNav();
  const reviewData = await reviewModel.getReviewById(reviewId);

  if (!reviewData) {
    return res.status(404).send("Review not found");
  }

  const formattedDate = new Date(reviewData.review_date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });

  res.render("./review/review-delete", {
    title: "Delete Review",
    nav,
    errors: null,
    review: reviewData,  
    review_date: formattedDate,  
  });
};




// Delete a review
reviewCont.deleteReview = async (req, res) => {
  const reviewId = req.body.review_id;

  try {
    const deletedReview = await reviewModel.deleteReview(reviewId);
    if (deletedReview) {
      req.flash('notice', 'Review deleted successfully.');
      res.redirect('/account/');
    } else {
      req.flash('notice', 'Review not found.');
      res.redirect('/account/');
    }
  } catch (err) {
    console.error(err);
    req.flash('notice', 'Error deleting review.');
    res.redirect('/account/');
  }
};


module.exports = reviewCont;
