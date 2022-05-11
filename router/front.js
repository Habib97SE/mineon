const express = require("express");

const frontController = require("../controlller/front");

const router = express.Router();

// GET homepage
router.get("/", frontController.getHomePage);

// GET register page
router.get("/register", frontController.getRegisterPage);

module.exports = router;