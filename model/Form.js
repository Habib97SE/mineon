"use-strict";
module.exports = class Form {
    constructor() {
            this.name = "";
            this.email = "";
            this.telno = "";
            this.password = "";
            this.confirmPassword = "";
            this.subject = "";
            this.message = "";
        }
        /************************************/
        /* Setter and getters methods here */
        /***********************************/

    getPassword() {
        return this.password;
    }
    getEmail() {
        return this.email;
    }

    setPassword(password) {
        this.password = password;
    }
    setConfirmPassword(confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    setEmail(email) {
        this.email = email;
    }
    setTelno(telno) {
        this.telno = telno;
    }
    setName(name) {
        this.name = name;
    }
    setSubject(subject) {
        this.subject = subject;
    }
    setMessage(message) {
        this.message = message;
    }

    /**
     * Check to validate name, a name must be at least 3 characters long.
     * And only contains letters, spaces and dashes and apostroph .
     * @returns {boolean} : true if name is valid, false otherwise
     */
    isNameValid() {
        const namePattern = /^[a-zA-Z-'\s]+$/;
        return namePattern.test(this.name);
    }

    /**
     * Check to validate email.
     * @returns {string} : returns the name of the user
     */
    isEmailValid() {
        const emailPattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        return emailPattern.test(this.email);
    }

    /**
     * Check to validate telno.
     * @returns {boolean} : true if the telno is valid, false otherwise
     */
    isTelnoValid() {
        const telnoPattern =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return telnoPattern.test(this.telno);
    }

    /**
     *
     * @returns {boolean} : true if the form is valid, false otherwise
     */
    isPasswordValid() {
        const passwordPattern =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"/;
        return passwordPattern.test(this.password);
    }

    /**
     * Check if the confirm password is equal to the password.
     * @returns {boolean} : true if the confirm password is valid, false otherwise
     */
    isConfirmPasswordValid() {
        return password === passwordConfirm;
    }

    /**
     * Check if the subject is valid.
     * @param {string} subject : subject of the message
     * @returns true if the subject is valid, false otherwise
     */
    isSubjectValid(subject) {
        return subject.length > 0;
    }

    /**
     * Check if the message is valid.
     * @param {string} message : message of the user
     * @returns returns true if the message is valid, false otherwise
     */
    isMessageValid(message) {
        return message.length > 0;
    }

    /**
     * This method checks if the registration form is valid.
     * @param {string} name : name of the user
     * @param {string} email : email of the user
     * @param {string} telno : telno of the user
     * @param {string} password : password of the user
     * @param {stirng} confirmPassword : confirm password of the user
     * @returns return true if the form is valid, false otherwise
     */
    isRegistrationValid(name, email, telno, password, confirmPassword) {
        //set the values of the form
        this.setName(name);
        this.setEmail(email);
        this.setTelno(telno);
        this.setPassword(password);
        this.setConfirmPassword(confirmPassword);
        return (
            this.isNameValid() &&
            this.isEmailValid() &&
            this.isTelnoValid() &&
            this.isPasswordValid() &&
            this.isConfirmPasswordValid()
        );
    }

    /**
     * Check if the login data is valid.
     * @param {string} email : email of the user
     * @param {string} password : password of the user
     * @returns returns true if the form is valid, false otherwise
     */
    isLoginFormValid(email, password) {
        this.setPassword(password);
        this.setEmail(email);
        return this.isEmailValid() && this.isPasswordValid();
    }

    /**
     * This method checks if the contact form is valid.
     * @param {string} name : name of the user
     * @param {string} email : email of the user
     * @param {string} telno : telno of the user
     * @param {string} subject : subject of the message
     * @param {string} message : message of the user
     * @returns true if the form is valid, false otherwise
     */
    isContactFormValid(name, email, telno, subject, message) {
        //set the values of the form
        this.setName(name);
        this.setEmail(email);
        this.setTelno(telno);
        this.setSubject(subject);
        this.setMessage(message);
        return (
            this.isEmailValid(email) &&
            this.isTelnoValid(telno) &&
            this.isSubjectValid(subject) &&
            this.isMessageValid(message)
        );
    }
};