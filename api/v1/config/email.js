var nodemailer = require("nodemailer");
var dotenv = require('dotenv').config();
var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
})

module.exports = smtpTransport
