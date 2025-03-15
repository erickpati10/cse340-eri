// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const regValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

/* ********************************
 * Route to diplay a vehicle by ID
 * ********************************* */
router.get("/detail/:inventory_id", invController.getVehicleDetails);

router.get("/", invController.managementView);

// **************** classification  *******************

router.get("/add-classification", invController.classificationView);
// Process to add new classification
router.post(
  "/add-classification",
  regValidate.classificationRule(),
  regValidate.checkClassificationData,
  utilities.handleErrors(invController.addNewClassification)
);

/* ********* ADD NEW INVENTORY *************** */

router.get("/add-inventory", invController.AddInventory);

router.post(
  "/add-inventory",
  regValidate.validateVehicleRules(),
  regValidate.checkVehicleData,
  utilities.handleErrors(invController.addNewInventory)
);

module.exports = router;
