const express = require("express");
const fs = require("fs");
const path = require("path");

exports.getHomePage = function(req, res, next) {
    res.render("index", {
        head: {
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
        },
    });
};