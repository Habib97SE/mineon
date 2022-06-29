"use strict";

var express = require("express");

var path = require("path");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var frontRoutes = require("./router/front");

require("dotenv").config("./config/config.env"); // const DB_URL = "mongodb://127.0.0.1:27017";
// const DB_NAME = "chckout";


var app = express(); // using cookie

app.use(cookieParser()); // bodyParser for getting data from post methods.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); //app.use(express.cookieParser());
// public folder in root directory of the project serves all static data like
// images, css files and javascript.

app.use(express["static"](path.join(__dirname, process.env.DIR_NAME))); // Template Engine = EJS

app.set("view engine", "ejs"); // All routes related to admin
//app.use("/admin", adminRoutes);
// All routes related to front site.
// Connection URL

app.use(frontRoutes);
app.listen(process.env.PORT);