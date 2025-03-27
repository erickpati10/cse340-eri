// account Routes
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");

// Deliver Login view

router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Deliver Registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// view Management account

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.accountManagementView)
);

//Deliver Account Management Page
router.get("/", utilities.handleErrors(accountController.accountLoginSuccess));


// Deliver the account update view
router.get("/updateAccount", utilities.handleErrors(accountController.updateAccountPage));

// Route to process the account update request
router.post("/updateAccount",
  regValidate.updateAccountRules(),
  regValidate.checkUpdateAccountData,
  utilities.handleErrors(accountController.updateAccount));

// Route to process the password update request
router.post("/update_password",
  regValidate.updatePasswordRules(),
  regValidate.checkUpdatePasswordData,
  utilities.handleErrors(
  accountController.updatePassword));


router.get("/logout", utilities.handleErrors( accountController.logout));


module.exports = router;
