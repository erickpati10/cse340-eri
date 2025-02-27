// Needed Resources
const express = require("express");
const router = new express.Router();
const errController = require("../controllers/errController");

/* ********************************
 * Route to trigger a 500 error
 * ********************************* */
router.get("/error", errController.triggerError);

module.exports = router;
