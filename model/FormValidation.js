const fs = require("fs");
const path = require("path");

module.exports = class FormValidation {
    static validateField(data, regexPattern) {
        if (!regexPattern.test(data)) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        const regexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return this.validateField(email, regexPattern);
    }

    static validatePassword(password) {
        const regexPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return this.validateField(password, regexPattern);
    }

    static validateUsername(username) {
        const regexPattern = /^[a-zA-Z0-9_]{3,15}$/;
        return this.validateField(username, regexPattern);
    }

    static validatePhoneNumber(phoneNumber) {
        const regexPattern = /^\d{10}$/;
        return this.validateField(phoneNumber, regexPattern);
    }

    static validatePasswordConfirmation(password, passwordConfirmation) {
        return password === passwordConfirmation;
    }

    static checkEmailExists(email) {
        const filePath = path.join(__dirname, "../../data/users.json");
        const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return users.some((user) => user.email === email);
    }
};