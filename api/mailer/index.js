const nodeMailer = require("nodemailer");
require("dotenv").config();

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_SERVICE = process.env.MAIL_SERVICE;
const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;

class Mailer {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: MAIL_HOST,
      service: MAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
      },
    });
  }

  async send(email, subject, text) {
    await this.transporter.sendMail({
      from: EMAIL,
      to: email,
      subject,
      text,
    });
  }
}

module.exports = new Mailer();
