const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  *******************************************
 *  Add classification Data Validation Rules
 * ******************************************** */

validate.classificationRule = () => {
  return [
    // name is required and must be string
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .isAlpha()
      .withMessage("Provide a correct classification name."),
  ];
};

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/*  **********************************
 *  Add Vehicle Data Validation Rules
 * ********************************* */
validate.validateVehicleRules = () => {
  const isValidImageUrl = (value) => {
    // Define a regular expression pattern to match the expected URL format
    const urlPattern = /^\/images\/vehicles\/.+\.png$/;
    // Check if the value matches the pattern
    return urlPattern.test(value);
  };
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Make cannot be left empty"),

    body("inv_model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Model cannot be left empty"),

    body("inv_year")
      .trim()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Enter a valid year"),

    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Description cannot be left empty"),

    body("inv_image")
      .trim()
      .custom((value) => {
        // Use the custom validation function to check the URL
        if (!isValidImageUrl(value)) {
          throw new Error("Invalid image URL");
        }
        return true;
      }),

    body("inv_thumbnail")
      .trim()
      .custom((value) => {
        // Use the custom validation function to check the URL
        if (!isValidImageUrl(value)) {
          throw new Error("Invalid thumbnail URL");
        }
        return true;
      }),

    body("inv_price")
      .trim()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("inv_miles")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Miles must be a non-negative integer"),

    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Color cannot be left empty"),

    body("classification_id")
      .trim()
      .isInt({ min: 1 })
      .withMessage("Invalid classification ID"),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classificationSelect = await utilities.buildClassificationList();
    return res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      nav,
      classificationSelect,
      errors,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
  }
  next();
};

/* ******************************
 * Check data and errors will be directed back to the edit view
 * ***************************** */

validate.checkUpdateData = async (req, res, next) => {
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classificationSelect = await utilities.buildClassificationList();
    return res.render("inventory/edit-inventory", {
      errors,
      title: "Edit Inventory",
      nav,
      classificationSelect,
      errors,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      inv_id,
    });
  }
  next();
};

module.exports = validate;
