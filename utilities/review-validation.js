
const utilities = require(".");
const { body, validationResult } = require("express-validator");

const validate = {};


/* ******************************************
 *  Add Review Data Validation Rules
 * ***************************************** */
validate.reviewRules = () => {
    return [
      body("review_text")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Review must be at least 3 characters long."),
    ];
  };
  
  /* ******************************************
   *  Check review data and return errors or continue
   * ***************************************** */
  validate.checkReviewData = async (req, res, next) => {
    const { review_text, inv_id } = req.body;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
  
      // You might also need to re-fetch vehicle details and reviews
      const invModel = require("../models/inventory-model");
      const reviewModel = require("../models/review-model");
  
      const vehicle = await invModel.getVehicleById(inv_id);
      const reviews = await reviewModel.getReviewsByInvId(inv_id);
  
      return res.render("inventory/vehicleDetail", {
        title: `${vehicle.inv_make} ${vehicle.inv_model}`,
        nav,
        vehicle,
        reviews,
        errors,
      });
    }
    next();
  };
  
  module.exports = validate;
