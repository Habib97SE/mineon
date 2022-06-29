"use strict";

var YEAR = new Date().getFullYear();

var _require = require("os"),
    networkInterfaces = _require.networkInterfaces;

var bcryptjs = require("bcryptjs");

var Email = require("../model/Email");

var Form = require("../model/Form");

var Database = require("../model/Database");

var Clients = "Clients";
var Contacts = "Contacts";
var Blogs = "Blogs";
var db = new Database();
var newForm = new Form();
var newEmail = new Email();

function encryptPassword(password) {
  var salt;
  return regeneratorRuntime.async(function encryptPassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcryptjs.genSalt(12));

        case 2:
          salt = _context.sent;
          return _context.abrupt("return", bcryptjs.hash(password, salt));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

var primaryNavItems = [["Home", "/"], ["How it works", "#"], ["Blog", "/blog"], ["FAQ", "/faq"], ["About us", "/about"], ["Contact us", "/contact"]];
var secondaryNavItems = [["Help", "/faq"], ["Support", "/faq"], ["Login", "/login"], ["Register", "/register"]];
var headData = {
  metaDescription: "Mine Cryptocurrency with over 10 different mining locations in the world.",
  metaKeywords: "bitcoin, mining bitcoin, mine on cloud, cloud mining, bitcoin cloud mining",
  favIcon: "images/favicon.png",
  cssFiles: ["assets/css/vendor.bundle.css", "assets/css/style.css", "assets/css/theme-blue.css"],
  jsFiles: []
};

function getUsersIP() {
  var ifaces = networkInterfaces();
  var ip = "";

  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
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
    var error = {
      login: true,
      register: true
    };

    for (var i = 0; i < secondaryNavItems.length; i++) {
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

exports.getHomePage = function (req, res, next) {
  changeMenuItems(req);
  res.render("index", {
    title: "Home",
    head: headData,
    nav: primaryNavItems,
    secondaryNav: secondaryNavItems,
    footer: {
      currentYear: YEAR
    }
  });
};

exports.getRegisterPage = function (req, res, next) {
  var data = {
    name: "",
    email: "",
    telno: ""
  };

  if (req.cookies.userLoggedIn) {
    res.redirect("/");
  }

  var message = "";

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
      currentYear: YEAR
    },
    message: message,
    data: {
      name: data.name,
      email: data.email,
      telno: data.telno
    }
  });
};

exports.postRegisterPage = function _callee(req, res, next) {
  var formData, formIsValid, emailInUse, result;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          formData = {
            name: req.body.signupName,
            email: req.body.signupEmail.toLowerCase(),
            password: req.body.signupPasskey,
            confirmPassword: req.body.signupPasskeyConfirm,
            telno: req.body.signupTelno
          };
          formIsValid = newForm.isRegistrationValid(formData.name, formData.email, formData.telno, formData.password, formData.confirmPassword);

          if (!formIsValid) {
            // Load getRegisterPage
            res.cookie("errorMessage", {
              message: "Please fill in all fields",
              name: formData.name,
              email: formData.email,
              telno: formData.telno
            });
            res.redirect("/register?error=true");
          } // Check if the email address is already in use, if yes then load getRegisterPage


          _context2.next = 5;
          return regeneratorRuntime.awrap(db.isEmailInUse(Clients, formData.email));

        case 5:
          emailInUse = _context2.sent;

          // if emailInUse is not false then redirect to register page with error
          if (emailInUse) {
            //set session with error message
            res.cookie("errorMessage", {
              message: "Email address already in use",
              name: formData.name,
              email: formData.email,
              telno: formData.telno
            });
            res.redirect("register?error=true");
          }

          formData.dateRegistered = new Date();
          formData.bitcoinAddress = "";
          formData.newsletterSubscribed = true;
          formData.deletedAccount = false;
          formData.lastLoggedInIP = getUsersIP();
          formData.lastLoggedInTime = null; // Send to the database

          result = db.insert(Clients, formData);

          if (!result) {
            //set session with error message
            res.cookie("errorMessage", {
              message: "Error registering account",
              name: formData.name,
              email: formData.email,
              telno: formData.telno
            });
            res.redirect("register?error=true");
          } // If inserted successfully, send email: welcome email


          if (result) {
            //  remove cookie errorMessage if there is any
            res.clearCookie("errorMessage");
            newEmail.setSender("info@nuvane.se");
            newEmail.setReceiver(formData.email);
            newEmail.setSubject("Nuvane - Account Created");
            newEmail.setMessage("Hello " + formData.name + ",\n\n" + "Your account has been created.\n\n" + "You can now login to your account at https://nuvane.se/login\n\n" + "Regards,\n" + "Nuvane Team"); // let emailResult = newEmail.send();
            // if (emailResult) {
            //     res.redirect("login");
            // } else {
            //     res.redirect("register");
            // }

            console.log("Email sent");
          }

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getLoginPage = function (req, res, next) {
  if (req.cookies.userLoggedIn) {
    res.redirect("/");
  }

  var error = req.query.error == "true" ? true : false;

  if (error) {
    var emailAddress = req.cookies.loginFailed.email;
    res.render("login", {
      title: "Login",
      head: headData,
      nav: primaryNavItems,
      secondaryNav: secondaryNavItems,
      footer: {
        currentYear: YEAR
      },
      error: error,
      emailAddress: emailAddress
    });
  }

  res.render("login", {
    title: "Login",
    head: headData,
    nav: primaryNavItems,
    secondaryNav: secondaryNavItems,
    footer: {
      currentYear: YEAR
    },
    error: false
  });
}; // function registerLastLogin(collection, emailAddress) {
//     collection.updateOne({ email: emailAddress }, { $set: { lastLoggedInTime: new Date(), lastLoggedInIP: getUsersIP() } });
// }


exports.postLoginPage = function _callee2(req, res, next) {
  var data, formIsValid, result, cookieLifeTime;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (req.cookies.userLoggedIn) {
            res.redirect("/");
          }

          data = {
            email: req.body.loginEmail.toLowerCase(),
            password: req.body.loginPasskey
          };
          formIsValid = newForm.isLoginValid(data.email, data.password);

          if (formIsValid) {
            _context3.next = 22;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(db.find(Clients, {
            email: data.email
          }));

        case 6:
          result = _context3.sent;

          if (!(result !== null)) {
            _context3.next = 18;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(bcryptjs.compare(data.password, result.password));

        case 10:
          if (_context3.sent) {
            _context3.next = 13;
            break;
          }

          res.cookie("loginFailed", {
            status: true,
            email: data.email
          }, {
            maxAge: 100000
          });
          res.redirect("/login?error=true");

        case 13:
          // if remember me is checked, set cookie for 30 days otherwise 1 day
          cookieLifeTime = req.body.rememberMe ? 1000 * (36000 * 24) : 36000 * 24; // Set the cookie

          res.cookie("userLoggedIn", {
            name: result.name,
            id: result._id
          }, {
            maxAge: cookieLifeTime,
            httpOnly: true
          });
          res.redirect("/");
          _context3.next = 20;
          break;

        case 18:
          sessionStorage.setItem("loginEmailAddress", data.email);
          res.redirect("/login?error=true");

        case 20:
          _context3.next = 23;
          break;

        case 22:
          // Redirect to login with get request with error set to true
          res.redirect("/login?error=true");

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getAboutPage = function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          changeMenuItems(req);
          res.render("about", {
            title: "About",
            head: headData,
            nav: primaryNavItems,
            secondaryNav: secondaryNavItems,
            footer: {
              currentYear: YEAR
            }
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getContactPage = function _callee4(req, res, next) {
  var result, message, emailStatus;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          changeMenuItems(req);

          if (!req.cookies.userLoggedIn) {
            _context5.next = 5;
            break;
          }

          _context5.next = 4;
          return regeneratorRuntime.awrap(db.findById(Clients, req.cookies.userLoggedIn.id));

        case 4:
          result = _context5.sent;

        case 5:
          message = ""; // emailStatus: 0 = email not sent because of error, 1 = email sent, 2 = contact form has not submitted yet

          emailStatus = 2;

          if (req.query.error = "true") {
            emailStatus = 0;
            message = "Please fill in all fields";
          }

          if (req.query.success = "true") {
            emailStatus = 1;
            message = "Message sent";
          }

          res.render("contact", {
            title: "Contact",
            head: headData,
            nav: primaryNavItems,
            secondaryNav: secondaryNavItems,
            footer: {
              currentYear: YEAR
            },
            name: result ? result.name.replace(/\s/g, "") : "",
            email: result ? result.email.replace(/\s/g, "") : "",
            telno: result ? result.telno.replace(/\s/g, "") : "",
            emailStatus: emailStatus,
            message: message
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.postContactPage = function _callee5(req, res, next) {
  var data, isFormValid, isRegistered, emailResult;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          changeMenuItems(req);
          data = {
            name: req.body.contactName,
            email: req.body.contactEmail,
            telno: req.body.contactPhone,
            subject: req.body.contactSubject,
            message: req.body.contactMessage,
            registeredTime: new Date(),
            registeredIP: getUsersIP()
          };
          isFormValid = newForm.isContactFormValid(data.name, data.email, data.telno, data.subject, data.message);

          if (isFormValid) {
            isRegistered = db.insert(Contacts, data);

            if (isRegistered) {
              newEmail.setMessage(data.message);
              newEmail.setSender(data.email);
              newEmail.setRecipient("info@nuvane.se");
              newEmail.setSubject(data.subject);
              emailResult = newEmail.send();

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
          } // Send to the database


        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getBlogPage = function _callee6(req, res, next) {
  var blogPosts;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          changeMenuItems(req);
          _context7.next = 3;
          return regeneratorRuntime.awrap(db.find(Blogs, {}));

        case 3:
          blogPosts = _context7.sent;
          res.render("blog", {
            title: "Blog",
            head: headData,
            nav: primaryNavItems,
            secondaryNav: secondaryNavItems,
            blogPosts: blogPosts,
            footer: {
              currentYear: YEAR
            }
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getLogoutPage = function (req, res, next) {
  res.clearCookie("userLoggedIn");
  res.redirect("/");
};

exports.getTestPage = function _callee7(req, res, next) {
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render("test");

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};