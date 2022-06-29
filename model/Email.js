"use-strict";
const nodemailer = require("nodemailer");

/**
 * Send email: send email to user
 */
module.exports = class Email {
    constructor() {
        this.name = "";
        this.email = "";
        this.subject = "";
        this.message = "";
        this.attachaments = "";
        this.recipient = "";
        this.sender = "";
    }

    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getSubject() {
        return this.subject;
    }
    getMessage() {
        return this.message;
    }
    getAttachaments() {
        return this.attachaments;
    }
    getRecipient() {
        return this.recipient;
    }
    getSender() {
        return this.sender;
    }

    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setSubject(subject) {
        this.subject = subject;
    }
    setMessage(message) {
        this.message = message;
    }
    setAttachaments(attachaments) {
        this.attachaments = attachaments;
    }
    setRecipient(recipient) {
        this.recipient = recipient;
    }
    setSender(sender) {
        this.sender = sender;
    }

    // Create credentials
    createCredentials() {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD,
            },
        });
        return transporter;
    }

    /**
     * Send email: send email to user
     * @returns true if email is sent successfully else false
     */
    async send() {
        const transporter = this.createCredentials();
        const mailOptions = {
            from: this.sender,
            to: this.recipient,
            subject: this.subject,
            text: template,
            attachments: this.attachaments ? this.attachaments : "",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return false;
            }
            return true;
        });
    }

    /**
     * This function is used to send email to users.
     * @param {array} emailList Array of email addresses
     * @param {string} template Template of the email
     * @return true if email is sent successfully else false
     */
    async sendMultiple(emailList, template) {
        const transporter = this.createCredentials();
        for (let i = 0; i < emailList.length; i++) {
            const mailOptions = {
                from: this.sender,
                to: emailList[i],
                subject: this.subject,
                text: template,
                attachments: this.attachaments ? this.attachaments : "",
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return false;
                }
                return true;
            });
        }
    }
};