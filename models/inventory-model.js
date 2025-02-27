const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

/* ***************************
 *  Get details of a specific vehicle by inv_id
 * ************************** */
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT inv_id, inv_make, inv_model, inv_price, inv_image, inv_year, inv_miles, inv_color, classification_id, inv_description/* add other columns as needed */ FROM public.inventory WHERE inv_id = $1",

      [inv_id]
    );

    return data.rows[0];
  } catch (error) {
    console.error("getVehicleById error " + error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById,
};
