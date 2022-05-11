const express = require("express");
const fs = require("fs");
const path = require("path");

const d = new Date();
const YEAR = d.getFullYear();

exports.getHomePage = function(req, res, next) {
    res.render("index", {
        head: {
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
        },
        footer: {
            currentYear: YEAR,
        },
    });
};

exports.getRegisterPage = function(req, res, next) {
    res.render("register", {
        head: {
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
        },
        footer: {
            currentYear: YEAR,
        },
    });
};