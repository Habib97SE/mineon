"use-strict";
const nodemailer = require("nodemailer");

/**
 * Send email: send email to user
 */
module.exports = class SendEmail {
    constructor(email, subject, message, name, attachaments) {
            this.name = name;
            this.email = email;
            this.subject = subject;
            this.message = message;
            this.attachaments = attachaments;
        }
        // Create credentials
    createCredentials() {
        const transporter = nodemailer.createTransport({
            host: "ns3.inleed.net",
            port: 465,
            secure: true,
            auth: {
                user: "info@nuvane.se",
                pass: "1q2w3a$S",
            },
        });
        return transporter;
    }

    /**
     * This method will send an email to the admin, where the user has sent it via the contact form.
     *
     */
    async send() {
        const transporter = this.createCredentials();
        const mailOptions = {
            from: this.email,
            to: "info@nuvane.se",
            subject: this.subject,
            text: this.message,
            attachments: this.attachaments ? this.attachaments : "",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            return error ? false : true;
        });
    }
};