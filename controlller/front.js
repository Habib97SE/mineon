const express = require("express");
const fs = require("fs");
const path = require("path");
const d = new Date();
const YEAR = d.getFullYear();
const { MongoClient } = require("mongodb");
const { networkInterfaces } = require("os");

/**
 * Connect to DB
 */
const uri =
    "mongodb+srv://habib:Blomma93@mineoncloudtest.klaol.mongodb.net/?retryWrites=true&w=majority";

async function connectToCluster(uri) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();

        return mongoClient;
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    }
}

const primaryNavItems = [
    ["Home", "/"],
    ["How it works", "#"],
    ["Blog", "/blog"],
    ["FAQ", "/faq"],
    ["About us", "/about"],
    ["Contact us", "/contact"],
];
const secondaryNavItems = [
    ["Help", "/faq"],
    ["Support", "/faq"],
    ["Login", "/login"],
    ["Register", "/register"],
];

const headData = {
    metaDescription: "Mine Cryptocurrency with over 10 different mining locations in the world.",
    metaKeywords: "bitcoin, mining bitcoin, mine on cloud, cloud mining, bitcoin cloud mining",
    favIcon: "images/favicon.png",
    cssFiles: [
        "assets/css/vendor.bundle.css",
        "assets/css/style.css",
        "assets/css/theme-blue.css",
    ],
    jsFiles: [],
};

function changeMenuItems(req) {
    // Check if the user is logged in
    if (req.cookies.userLoggedIn) {
        for (let i = 0; i < secondaryNavItems.length; i++) {
            if (secondaryNavItems[i][0] === "Login") {
                secondaryNavItems[i][0] = req.cookies.userLoggedIn.name;
                secondaryNavItems[i][1] = "/account";
            }
            if (secondaryNavItems[i][0] === "Register") {
                secondaryNavItems[i][0] = "Logout";
                secondaryNavItems[i][1] = "/logout";
            }
        }
    }
}

exports.getHomePage = function(req, res, next) {
    // Check if the user is logged in
    if (req.cookies.userLoggedIn) {
        for (let i = 0; i < secondaryNavItems.length; i++) {
            if (secondaryNavItems[i][0] === "Login") {
                secondaryNavItems[i][0] = req.cookies.userLoggedIn.name;
                secondaryNavItems[i][1] = "/account";
            }
            if (secondaryNavItems[i][0] === "Register") {
                secondaryNavItems[i][0] = "Logout";
                secondaryNavItems[i][1] = "/logout";
            }
        }
    }
    res.render("index", {
        title: "Home",
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
        title: "Register",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
    });
};

function getUsersIP() {
    var ifaces = networkInterfaces();
    var ip = "";
    for (var dev in ifaces) {
        ifaces[dev].forEach(function(details) {
            if (details.family === "IPv4" && details.address !== "::1") {
                ip = details.address;
            }
        });
    }
    return ip;
}

async function checkIfUserExists(emailAddress) {
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Clients");
        console.log("Connected successfully to the database mineOn");
        // Get the documents collection where the name is equal to data.name
        const result = await collection.findOne({ email: emailAddress });
        // If the result is not null, then the user exists, set cookie and redirect to homepage
        if (result !== null) {
            console.log("Email already exists");
            return true;
        } else {
            console.log("Email does not exist");
            return false;
        }
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

async function createNewUser(data) {
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Clients");
        console.log("Connected successfully to the database mineOn");
        // Get the documents collection where the name is equal to data.name
        const result = await collection.insertOne(data);
        // If the result is not null, then the user exists, set cookie and redirect to homepage
        if (result !== null) {
            // Create a cookie with the user's name
            console.log("User created");
            return true;
        } else {
            console.log("User not created");
            return false;
        }
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

exports.postRegisterPage = function(req, res, next) {
    if (checkIfUserExists(req.body.registerEmail)) {
        res.redirect("/register");
    }
    // Secure the data
    let data = {
        name: req.body.signupName,
        email: req.body.signupEmail,
        password: req.body.signupPasskey,
        telno: req.body.signupTelno,
        dateRegistered: new Date(),
        bitcoinAddress: "",
        newsletterSubscribed: true,
        deletedAccount: false,
        lastLoggedInTime: null,
        lastLoggedInIP: getUsersIP(),
    };
    // Send to the database
    const result = createNewUser(data);
    if (result) {
        res.redirect("/");
    } else {
        res.redirect("/register");
    }
};

exports.getLoginPage = function(req, res, next) {
    if (req.cookies.userLoggedIn) {
        res.redirect("/");
    }
    res.render("login", {
        title: "Login",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
        message: "",
    });
};

async function findUserByEmailAndPassword(collection, emailAddress, password) {
    return collection.findOne({ email: emailAddress, password: password });
}

// function registerLastLogin(collection, emailAddress) {
//     collection.updateOne({ email: emailAddress }, { $set: { lastLoggedInTime: new Date(), lastLoggedInIP: getUsersIP() } });
// }

async function authenticateUser(data) {
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Clients");
        // Get the documents collection where the name is equal to data.name
        const result = await findUserByEmailAndPassword(
            collection,
            data.email,
            data.password
        );
        // If the result is not null, then the user exists, set cookie and redirect to homepage
        if (result !== null && result.deletedAccount === false) {
            // Create a cookie with the user's name
            //registerLastLogin(collection, result.email);
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

function secureData(data) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordPattern =
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
    return data.email.match(emailPattern) && data.password.match(passwordPattern);
}

exports.postLoginPage = async function(req, res, next) {
    const data = {
        email: req.body.loginEmail,
        password: req.body.loginPasskey,
    };
    if (!secureData(data)) {
        res.redirect("/login");
    }
    let result = await authenticateUser(data);
    if (result !== null) {
        // Create a cookie with the user's name
        let time = req.body.rememberMe ? 3600000 * 24 * 7 * 52 : 360000;
        res.cookie(
            "userLoggedIn", { id: result._id, name: result.name }, { maxAge: time }
        );
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
    res.end();
};

exports.getAboutPage = function(req, res, next) {
    changeMenuItems(req);
    res.render("about", {
        title: "About",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
    });
};

async function getUsersEmailAddress(userName) {
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Clients");
        // Get the documents collection where the name is equal to data.name

        const result = await collection.findOne({ name: userName });

        // If the result is not null, then the user exists, set cookie and redirect to homepage
        if (result !== null) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

exports.getContactPage = async function(req, res, next) {
    changeMenuItems(req);
    const result = await getUsersEmailAddress(req.cookies.userLoggedIn.name);
    res.render("contact", {
        title: "Contact",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
        name: result.name,
        telno: result.telno,
        emailAddress: result.email,
    });
};

async function registerContact(data) {
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Contacts");
        // Get the documents collection where the name is equal to data.name
        const result = await collection.insertOne(data);
        // If the result is not null, then the user exists, set cookie and redirect to homepage
        if (result !== null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

function secureContactData(data) {
    const namePattern = /^[a-zA-Z ]+$/;
    const telnoPattern = /^[0-9]{10}$/;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (
        data.name.match(namePattern) &&
        data.telno.match(telnoPattern) &&
        data.email.match(emailPattern)
    );
}

exports.postContactPage = async function(req, res, next) {
    changeMenuItems(req);
    const data = {
        name: req.body.contactName,
        email: req.body.contactEmail,
        telno: req.body.contactPhone,
        subject: req.body.contactSubject,
        message: req.body.contactMessage,
        registeredTime: new Date(),
        registeredIP: getUsersIP(),
    };
    console.log(data);
    if (!secureContactData(data)) {
        res.redirect("/contact");
    }
    registerContact(data);
    res.redirect("/contact");
    // Send to the database
};

exports.getLogoutPage = function(req, res, next) {
    res.clearCookie("userLoggedIn");
    res.redirect("/");
};