const express = require("express");
const fs = require("fs");
const path = require("path");

const primaryNavItems = [["Home", "/"], ["How it works", "#"], ["Blog", "/blog"], ["FAQ", "/faq"], ["About us", "about-us"], ["Contact us", "/contact-us"]];
const secondaryNavItems = [["Help", "/faq"], ["Support", "/faq"], ["Login", "/register#tab2"], ["Register", "/register"]]


/**
 * Data needed for head page
 */
const headData = {
    metaDescription: "This is the description",
    metaKeywords: "This is the keywords",
    favIcon: "images/favicon.png",
    title: "Home",
    cssFiles: [
        "assets/css/vendor.bundle.css",
        "assets/css/style.css",
        "assets/css/theme-blue.css",
    ],
    jsFiles: [],
};

exports.getHomePage = function (req, res, next) {
    res.render("index", {
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
    });
};

exports.getRegisterPage = function (req, res, next) {
    res.render("register", {
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
    })
}