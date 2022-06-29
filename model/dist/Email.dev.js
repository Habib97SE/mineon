"use strict";
"use-strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nodemailer = require("nodemailer");
/**
 * Send email: send email to user
 */


module.exports =
/*#__PURE__*/
function () {
  function Email() {
    _classCallCheck(this, Email);

    this.name = "";
    this.email = "";
    this.subject = "";
    this.message = "";
    this.attachaments = "";
    this.recipient = "";
    this.sender = "";
  }

  _createClass(Email, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
  }, {
    key: "getSubject",
    value: function getSubject() {
      return this.subject;
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      return this.message;
    }
  }, {
    key: "getAttachaments",
    value: function getAttachaments() {
      return this.attachaments;
    }
  }, {
    key: "getRecipient",
    value: function getRecipient() {
      return this.recipient;
    }
  }, {
    key: "getSender",
    value: function getSender() {
      return this.sender;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: "setEmail",
    value: function setEmail(email) {
      this.email = email;
    }
  }, {
    key: "setSubject",
    value: function setSubject(subject) {
      this.subject = subject;
    }
  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this.message = message;
    }
  }, {
    key: "setAttachaments",
    value: function setAttachaments(attachaments) {
      this.attachaments = attachaments;
    }
  }, {
    key: "setRecipient",
    value: function setRecipient(recipient) {
      this.recipient = recipient;
    }
  }, {
    key: "setSender",
    value: function setSender(sender) {
      this.sender = sender;
    } // Create credentials

  }, {
    key: "createCredentials",
    value: function createCredentials() {
      var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD
        }
      });
      return transporter;
    }
    /**
     * Send email: send email to user
     * @returns true if email is sent successfully else false
     */

  }, {
    key: "send",
    value: function send() {
      var transporter, mailOptions;
      return regeneratorRuntime.async(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              transporter = this.createCredentials();
              mailOptions = {
                from: this.sender,
                to: this.recipient,
                subject: this.subject,
                text: template,
                attachments: this.attachaments ? this.attachaments : ""
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  return false;
                }

                return true;
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * This function is used to send email to users.
     * @param {array} emailList Array of email addresses
     * @param {string} template Template of the email
     * @return true if email is sent successfully else false
     */

  }, {
    key: "sendMultiple",
    value: function sendMultiple(emailList, template) {
      var transporter, i, mailOptions;
      return regeneratorRuntime.async(function sendMultiple$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              transporter = this.createCredentials();

              for (i = 0; i < emailList.length; i++) {
                mailOptions = {
                  from: this.sender,
                  to: emailList[i],
                  subject: this.subject,
                  text: template,
                  attachments: this.attachaments ? this.attachaments : ""
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    return false;
                  }

                  return true;
                });
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Email;
}();