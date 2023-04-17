const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const pug = require("pug");
const AppError = require('../utils/appErrors');
const { google } = require('googleapis');
const OAtuh2 = google.auth.OAuth2;
const OAtuh2_client = new OAtuh2(process.env.EMAIL_CLIENT_ID, process.env.EMAIL_CLIENT_SECRET);
OAtuh2_client.setCredentials({refresh_token:process.env.EMAIL_REFRECH_TOKEN });

module.exports = class Email {
    constructor(user, url) {
        this.to = user.login;
        this.firstName = user.full_name;
        this.url = url;
        this.from = `Egor Maksimov <${process.env.EMAIL_FROM}>`;
    }

    async account() {
        return await nodemailer.createTestAccount();
    }

    newTransport() {
        const accessToken = OAtuh2_client.getAccessToken();

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USERNAME,
                clientId: process.env.EMAIL_CLIENT_ID,
                clientSecret: process.env.EMAIL_CLIENT_SECRET,
                refreshToken: process.env.EMAIL_REFRECH_TOKEN,
                accessToken
            }
        });
    }

    async send(template, subject){
      const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
          firstName: this.firstName,
          url: this.url,
          subject
      });
      const mailOptions = {
          from: this.from,
          to: this.to,
          subject,
          html,
          text: htmlToText.fromString(html),
      }
      await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome(){
        await this.send('welcome', "Welcome to the Pintogram!")
    }

    async sendPasswrodReset(){
        await this.send('passwordReset', "Your password reset token (valid for 10 minutes)");
    }
}

