const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* *************************************************
 * Get details of a specific vehicle by inventory_id
 * ************************************************** */
invCont.getVehicleDetails = async function (req, res) {
  try {
    const inventory_id = req.params.inventory_id;
    const vehicleDetails = await invModel.getVehicleById(inventory_id);

    if (!vehicleDetails) {
      return res.status(404).send("Vehicle not found");
    }
    let nav = await utilities.getNav();

    const htmlContent = utilities.wrapVehicleDetailsInHTML(vehicleDetails);
    res.render("./inventory/vehicleDetail", {
      title: vehicleDetails.inv_model,
      nav: nav,
      htmlContent,
    });
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = invCont;
