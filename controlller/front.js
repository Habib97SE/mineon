const express = require("express");
const fs = require("fs");
const path = require("path");

const d = new Date();
const YEAR = d.getFullYear();

const primaryNavItems = [
    ["Home", "/"],
    ["How it works", "#"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["About us", "about-us"],
    ["Contact us", "/contact-us"],
];
const secondaryNavItems = [
    ["Help", "/faq"],
    ["Support", "/faq"],
    ["Login", "/register#tab2"],
    ["Register", "/register"],
];

const headData = {
    metaDescription: "Mine Cryptocurrency with over 10 different mining locations in the world.",
    metaKeywords: "bitcoin, mining bitcoin, mine on cloud, cloud mining, bitcoin cloud mining",
    favIcon: "images/favicon.png",
    title: "Home",
    cssFiles: [
        "assets/css/vendor.bundle.css",
        "assets/css/style.css",
        "assets/css/theme-blue.css",
    ],
    jsFiles: [],
};

exports.getHomePage = function(req, res, next) {
    res.render("index", {
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
    });
};

exports.getRegisterPage = function(req, res, next) {
    res.render("register", {
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
    });
};

exports.postRegisterPage = function(req, res, next) {};