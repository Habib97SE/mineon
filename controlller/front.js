const express = require("express");

const YEAR = new Date().getFullYear();

const { networkInterfaces } = require("os");
const bcryptjs = require("bcryptjs");
const e = require("express");
const Email = require("../model/Email");
const Form = require("../model/Form");
const Database = require("../model/Database");

const Clients = "Clients";
const Contacts = "Contacts";

let db = new Database();

async function encryptPassword(password) {
    const salt = await bcryptjs.genSalt(12);
    return bcryptjs.hash(password, salt);
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
    changeMenuItems(req);
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
    if (req.cookies.userLoggedIn) {
        res.redirect("/");
    }
    changeMenuItems(req);
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

exports.postRegisterPage = async function(req, res, next) {
    let newForm = new Form(
        req.body.name,
        req.body.email,
        req.body.telno,
        req.body.password,
        req.body.confirmPassword
    );
    if (!newForm.isFormValid()) {
        res.redirect("/register");
    }

    if (checkIfUserExists(req.body.registerEmail)) {
        res.redirect("/register");
    }

    // Secure the data
    let data = {
        name: req.body.signupName,
        email: req.body.signupEmail.toLowerCase(),
        password: await encryptPassword(req.body.signupPasskey),
        telno: req.body.signupTelno,
        dateRegistered: new Date(),
        bitcoinAddress: "",
        newsletterSubscribed: true,
        deletedAccount: false,
        lastLoggedInTime: null,
        lastLoggedInIP: getUsersIP(),
    };
    // Send to the database
    (await createNewUser(data)) ? res.redirect("/"): res.redirect("/register");
};

exports.getLoginPage = function(req, res, next) {
    if (req.cookies.userLoggedIn) {
        res.redirect("/");
    }
    let error = req.query.error == "true" ? true : false;

    if (error) {
        let emailAddress = sessionStorage.getItem("loginEmailAddress");
        res.render("login", {
            title: "Login",
            head: headData,
            nav: primaryNavItems,
            secondaryNav: secondaryNavItems,
            footer: {
                currentYear: YEAR,
            },
            error: error,
            emailAddress: emailAddress,
        });
    }

    res.render("login", {
        title: "Login",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
        error: false,
    });
};

// function registerLastLogin(collection, emailAddress) {
//     collection.updateOne({ email: emailAddress }, { $set: { lastLoggedInTime: new Date(), lastLoggedInIP: getUsersIP() } });
// }

exports.postLoginPage = async function(req, res, next) {
    if (req.cookies.userLoggedIn) {
        res.redirect("/");
    }
    let data = {
        email: req.body.loginEmail.toLowerCase(),
        password: req.body.loginPasskey,
    };

    if (Form.isLoginFormValid(data.email, data.password)) {
        const result = await db.find(Clients, { email: data.email });
        if (result !== null) {
            if (!(await bcryptjs.compare(data.password, result.password))) {
                sessionStorage.setItem("loginEmailAddress", data.email);
                res.redirect("/login?error=true");
            }
            // if remember me is checked, set cookie for 30 days otherwise 1 day

            let time = req.body.rememberMe ? 1000 * (36000 * 24) : 36000 * 24;
            // Set the cookie
            res.cookie(
                "userLoggedIn", { name: result.name, id: result._id }, { maxAge: time, httpOnly: true }
            );
            res.redirect("/");
        } else {
            sessionStorage.setItem("loginEmailAddress", data.email);
            res.redirect("/login?error=true");
        }
    } else {
        // Redirect to login with get request with error set to true
        res.redirect("/login?error=true");
    }
};

exports.getAboutPage = async function(req, res, next) {
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

exports.getContactPage = async function(req, res, next) {
    let result;
    changeMenuItems(req);
    if (req.cookies.userLoggedIn) {
        result = await db.findById(Clients, req.cookies.userLoggedIn.id);
    }
    let message = "";
    if (req.query.error == "true") {
        message = "Something went wrong, please try again";
    } else if (req.query.success == "true") {
        message =
            "Your message has been sent, we will get back to you as soon as possible";
    }

    res.render("contact", {
        title: "Contact",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        footer: {
            currentYear: YEAR,
        },
        name: result ? result.name.replace(/\s/g, "") : "",
        email: result ? result.email.replace(/\s/g, "") : "",
        telno: result ? result.telno.replace(/\s/g, "") : "",
        message: message,
    });
};

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
    if (
        Form.isContactFormValid(
            data.name,
            data.email,
            data.telno,
            data.subject,
            data.message
        )
    ) {
        const isRegistered = db.insert(Contacts, data);
        if (isRegistered) {
            let newEmail = new Email(data.email, data.subject, data.message, "");
            await newEmail.send();
        } else {
            res.redirect("/contact?error=true");
        }

        res.redirect("/contact?success=true");
    } else {
        res.redirect("/contact?error=true");
    }

    // Send to the database
};

exports.getLogoutPage = function(req, res, next) {
    res.clearCookie("userLoggedIn");
    res.redirect("/");
};