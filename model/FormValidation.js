const fs = require("fs");
const path = require("path");

module.exports = class FormValidation {
    static validateField(data, regexPattern) {
        if (!regexPattern.test(data)) {
            return false;
        }
        return true;
    }
};