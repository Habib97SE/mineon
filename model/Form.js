"use-strict";
module.exports = class Form {
    constructor(name, email, telno, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.telno = telno;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    // Patterns

    static isEmailValid(emailAddress) {
        const emailPattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        return emailPattern.test(emailAddress);
    }

    static isTelnoValid(telno) {
        var telnoPattern =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return telnoPattern.test(telno);
    }

    static isPasswordValid(password) {
        var passwordPattern =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        return new RegExp(passwordPattern).test(password);
    }

    static isConfirmPasswordValid(password, passwordConfirm) {
        return password === passwordConfirm;
    }

    static isSubjectValid(subject) {
        return subject.length > 0;
    }

    static isMessageValid(message) {
        return message.length > 0;
    }

    isRegistrationValid() {
        return (
            this.isEmailValid(this.email) &&
            this.isTelnoValid(this.telno) &&
            this.isPasswordValid(this.password) &&
            this.isConfirmPasswordValid(this.passwordConfirm)
        );
    }

    static isLoginFormValid(email, password) {
        return this.isEmailValid(email) && this.isPasswordValid(password);
    }

    static isContactFormValid(name, email, telno, subject, message) {
        return (
            this.isEmailValid(email) &&
            this.isTelnoValid(telno) &&
            this.isSubjectValid(subject) &&
            this.isMessageValid(message)
        );
    }
};