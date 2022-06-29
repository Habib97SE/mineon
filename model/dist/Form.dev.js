"use strict";
"use-strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function Form() {
    _classCallCheck(this, Form);

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


  _createClass(Form, [{
    key: "getPassword",
    value: function getPassword() {
      return this.password;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
  }, {
    key: "setPassword",
    value: function setPassword(password) {
      this.password = password;
    }
  }, {
    key: "setConfirmPassword",
    value: function setConfirmPassword(confirmPassword) {
      this.confirmPassword = confirmPassword;
    }
  }, {
    key: "setEmail",
    value: function setEmail(email) {
      this.email = email;
    }
  }, {
    key: "setTelno",
    value: function setTelno(telno) {
      this.telno = telno;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
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
    /**
     * Check to validate name, a name must be at least 3 characters long.
     * And only contains letters, spaces and dashes and apostroph .
     * @returns {boolean} : true if name is valid, false otherwise
     */

  }, {
    key: "isNameValid",
    value: function isNameValid() {
      var namePattern = /^[a-zA-Z-'\s]+$/;
      return namePattern.test(this.name);
    }
    /**
     * Check to validate email.
     * @returns {string} : returns the name of the user
     */

  }, {
    key: "isEmailValid",
    value: function isEmailValid() {
      var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      return emailPattern.test(this.email);
    }
    /**
     * Check to validate telno.
     * @returns {boolean} : true if the telno is valid, false otherwise
     */

  }, {
    key: "isTelnoValid",
    value: function isTelnoValid() {
      var telnoPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return telnoPattern.test(this.telno);
    }
    /**
     *
     * @returns {boolean} : true if the form is valid, false otherwise
     */

  }, {
    key: "isPasswordValid",
    value: function isPasswordValid() {
      var passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"/;
      return passwordPattern.test(this.password);
    }
    /**
     * Check if the confirm password is equal to the password.
     * @returns {boolean} : true if the confirm password is valid, false otherwise
     */

  }, {
    key: "isConfirmPasswordValid",
    value: function isConfirmPasswordValid() {
      return password === passwordConfirm;
    }
    /**
     * Check if the subject is valid.
     * @param {string} subject : subject of the message
     * @returns true if the subject is valid, false otherwise
     */

  }, {
    key: "isSubjectValid",
    value: function isSubjectValid(subject) {
      return subject.length > 0;
    }
    /**
     * Check if the message is valid.
     * @param {string} message : message of the user
     * @returns returns true if the message is valid, false otherwise
     */

  }, {
    key: "isMessageValid",
    value: function isMessageValid(message) {
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

  }, {
    key: "isRegistrationValid",
    value: function isRegistrationValid(name, email, telno, password, confirmPassword) {
      //set the values of the form
      this.setName(name);
      this.setEmail(email);
      this.setTelno(telno);
      this.setPassword(password);
      this.setConfirmPassword(confirmPassword);
      return this.isNameValid() && this.isEmailValid() && this.isTelnoValid() && this.isPasswordValid() && this.isConfirmPasswordValid();
    }
    /**
     * Check if the login data is valid.
     * @param {string} email : email of the user
     * @param {string} password : password of the user
     * @returns returns true if the form is valid, false otherwise
     */

  }, {
    key: "isLoginFormValid",
    value: function isLoginFormValid(email, password) {
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

  }, {
    key: "isContactFormValid",
    value: function isContactFormValid(name, email, telno, subject, message) {
      //set the values of the form
      this.setName(name);
      this.setEmail(email);
      this.setTelno(telno);
      this.setSubject(subject);
      this.setMessage(message);
      return this.isEmailValid(email) && this.isTelnoValid(telno) && this.isSubjectValid(subject) && this.isMessageValid(message);
    }
  }]);

  return Form;
}();