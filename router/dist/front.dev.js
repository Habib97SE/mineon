"use strict";

var express = require("express");

var frontController = require("../controlller/front");

var router = express.Router(); // GET homepage

router.get("/", frontController.getHomePage); // GET register page

router.get("/register", frontController.getRegisterPage); // POST register page

router.post("/register", frontController.postRegisterPage); // POST register page

router.post("/register", frontController.postRegisterPage); // GET login page

router.get("/login", frontController.getLoginPage); // POST login page

router.post("/login", frontController.postLoginPage); // GET logout page

router.get("/logout", frontController.getLogoutPage); // GET About page

router.get("/about", frontController.getAboutPage); // GET Contact page

router.get("/contact", frontController.getContactPage); // POST Contact page

router.post("/contact", frontController.postContactPage);
router.get("/test", frontController.getTestPage);
router.get("/blog", frontController.getBlogPage);
module.exports = router;