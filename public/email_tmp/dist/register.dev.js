"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

exports.module =
/*#__PURE__*/
function () {
  function EmailTemplate() {
    _classCallCheck(this, EmailTemplate);
  }

  _createClass(EmailTemplate, [{
    key: "exportRegisterConfirmationTemplate",
    value: function exportRegisterConfirmationTemplate(name, activationLink) {
      var template = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <style>\n        body {\n            margin: 5%;\n            padding: 0;\n            font-family: 'Roboto', sans-serif;\n            font-size: calc(16px + (24 - 16) * ((100vw - 300px) / (1600 - 300)));\n        }\n        \n        @media only screen and (max-width: 600px) {\n            .inner-body {\n                width: 100% !important;\n            }\n            .footer {\n                width: 100% !important;\n            }\n        }\n        \n        @media screen and (max-width: 500px) {\n            .button {\n                width: 100% !important;\n            }\n        }\n    </style>\n</head>\n\n<body>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <h1>Welcome to mineOn.Cloud</h1>\n                <p>\n                    Thank you for registering with us.\n                </p>\n                <p> \n                    Mr/Mrs ".concat(name, "\n                </p>\n                <p>\n                    Please click the link below to verify your email address.\n                </p>\n                <p>\n                    <a href=\"").concat(activationLink, "\">Verify Email</a>\n                </p>\n            </div>\n        </div>\n    </div>\n</body>\n</html>");
    }
  }]);

  return EmailTemplate;
}();