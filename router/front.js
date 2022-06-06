const express = require("express");

const frontController = require("../controlller/front");

const router = express.Router();

// GET homepage
router.get("/", frontController.getHomePage);

// GET register page
router.get("/register", frontController.getRegisterPage);

// POST register page
router.post("/register", frontController.postRegisterPage);

// GET login page
router.get("/login", frontController.getLoginPage);

// GET About page
router.get("/about", frontController.getAboutPage);

// GET Contact page
router.get("/contact", frontController.getContactPage);

module.exports = router;