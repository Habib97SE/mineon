const YEAR = new Date().getFullYear();
const { networkInterfaces } = require("os");
const bcryptjs = require("bcryptjs");
const Email = require("../model/Email");
const Form = require("../model/Form");
const Database = require("../model/Database");

const Clients = "Clients";
const Contacts = "Contacts";
const Blogs = "Blogs";

let db = new Database();
let newForm = new Form();
let newEmail = new Email();

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
        let error = { login: true, register: true };
        for (let i = 0; i < secondaryNavItems.length; i++) {
            if (secondaryNavItems[i][0] === "Login") {
                secondaryNavItems[i][0] = req.cookies.userLoggedIn.name;
                secondaryNavItems[i][1] = "/account";
                error.login = false;
            }
            if (secondaryNavItems[i][0] === "Register") {
                secondaryNavItems[i][0] = "Logout";
                secondaryNavItems[i][1] = "/logout";
                error.register = false;
            }
        }
        if (error.login) {
            secondaryNavItems.push([req.cookies.userLoggedIn.name, "/account"]);
        }
        if (error.register) {
            secondaryNavItems.push(["Logout", "/logout"]);
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
    let data = {
        name: "",
        email: "",
        telno: "",
    };
    if (req.cookies.userLoggedIn) {
        res.redirect("/");
    }
    let message = "";
    if (req.query.error == "true") {
        message = req.cookies.errorMessage.message;
        data.name = req.cookies.errorMessage.name;
        data.email = req.cookies.errorMessage.email;
        data.telno = req.cookies.errorMessage.telno;
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
        message: message,
        data: {
            name: data.name,
            email: data.email,
            telno: data.telno,
        },
    });
};

exports.postRegisterPage = async function(req, res, next) {
    let formData = {
        name: req.body.signupName,
        email: req.body.signupEmail.toLowerCase(),
        password: req.body.signupPasskey,
        confirmPassword: req.body.signupPasskeyConfirm,
        telno: req.body.signupTelno,
    };
    let formIsValid = newForm.isRegistrationValid(
        formData.name,
        formData.email,
        formData.telno,
        formData.password,
        formData.confirmPassword
    );
    if (!formIsValid) {
        // Load getRegisterPage
        res.cookie("errorMessage", {
            message: "Please fill in all fields",
            name: formData.name,
            email: formData.email,
            telno: formData.telno,
        });
        res.redirect("/register?error=true");
    }

    // Check if the email address is already in use, if yes then load getRegisterPage
    let emailInUse = await db.isEmailInUse(Clients, formData.email);
    // if emailInUse is not false then redirect to register page with error
    if (emailInUse) {
        //set session with error message
        res.cookie("errorMessage", {
            message: "Email address already in use",
            name: formData.name,
            email: formData.email,
            telno: formData.telno,
        });
        res.redirect("register?error=true");
    }
    formData.dateRegistered = new Date();
    formData.bitcoinAddress = "";
    formData.newsletterSubscribed = true;
    formData.deletedAccount = false;
    formData.lastLoggedInIP = getUsersIP();
    formData.lastLoggedInTime = null;
    // Send to the database
    let result = db.insert(Clients, formData);
    if (!result) {
        //set session with error message
        res.cookie("errorMessage", {
            message: "Error registering account",
            name: formData.name,
            email: formData.email,
            telno: formData.telno,
        });
        res.redirect("register?error=true");
    }
    // If inserted successfully, send email: welcome email
    if (result) {
        //  remove cookie errorMessage if there is any
        res.clearCookie("errorMessage");
        newEmail.setSender("info@nuvane.se");
        newEmail.setReceiver(formData.email);
        newEmail.setSubject("Nuvane - Account Created");
        newEmail.setMessage(
            "Hello " +
            formData.name +
            ",\n\n" +
            "Your account has been created.\n\n" +
            "You can now login to your account at https://nuvane.se/login\n\n" +
            "Regards,\n" +
            "Nuvane Team"
        );
        // let emailResult = newEmail.send();
        // if (emailResult) {
        //     res.redirect("login");
        // } else {
        //     res.redirect("register");
        // }
        console.log("Email sent");
    }
};

exports.getLoginPage = function(req, res, next) {
    if (req.cookies.userLoggedIn) {
        res.redirect("/");
    }
    let error = req.query.error == "true" ? true : false;

    if (error) {
        let emailAddress = req.cookies.loginFailed.email;
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

    let formIsValid = newForm.isLoginValid(data.email, data.password);

    if (!formIsValid) {
        const result = await db.find(Clients, { email: data.email });
        if (result !== null) {
            if (!(await bcryptjs.compare(data.password, result.password))) {
                res.cookie(
                    "loginFailed", { status: true, email: data.email }, { maxAge: 100000 }
                );
                res.redirect("/login?error=true");
            }
            // if remember me is checked, set cookie for 30 days otherwise 1 day

            let cookieLifeTime = req.body.rememberMe ?
                1000 * (36000 * 24) :
                36000 * 24;
            // Set the cookie
            res.cookie(
                "userLoggedIn", { name: result.name, id: result._id }, { maxAge: cookieLifeTime, httpOnly: true }
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
    // emailStatus: 0 = email not sent because of error, 1 = email sent, 2 = contact form has not submitted yet
    let emailStatus = 2;
    if ((req.query.error = "true")) {
        emailStatus = 0;
        message = "Please fill in all fields";
    }

    if ((req.query.success = "true")) {
        emailStatus = 1;
        message = "Message sent";
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
        emailStatus: emailStatus,
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
    let isFormValid = newForm.isContactFormValid(
        data.name,
        data.email,
        data.telno,
        data.subject,
        data.message
    );
    if (isFormValid) {
        const isRegistered = db.insert(Contacts, data);
        if (isRegistered) {
            newEmail.setMessage(data.message);
            newEmail.setSender(data.email);
            newEmail.setRecipient("info@nuvane.se");
            newEmail.setSubject(data.subject);
            let emailResult = newEmail.send();
            if (emailResult) {
                res.redirect("/contact?success=true");
            } else {
                res.redirect("/contact?error=true");
            }
        } else {
            res.redirect("/contact?error=true");
        }

        res.redirect("/contact?success=true");
    } else {
        res.redirect("/contact?error=true");
    }

    // Send to the database
};

exports.getBlogPage = async function(req, res, next) {
    changeMenuItems(req);
    let blogPosts = await db.find(Blogs, {});
    res.render("blog", {
        title: "Blog",
        head: headData,
        nav: primaryNavItems,
        secondaryNav: secondaryNavItems,
        blogPosts: blogPosts,
        footer: {
            currentYear: YEAR,
        },
    });
};
exports.getLogoutPage = function(req, res, next) {
    res.clearCookie("userLoggedIn");
    res.redirect("/");
};

exports.getTestPage = async function(req, res, next) {
    res.render("test");
};