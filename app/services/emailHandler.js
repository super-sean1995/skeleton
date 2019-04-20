// verifyEmail.js
'use strict';

var nodemailer = require('nodemailer'),
    config = require('../_core/config');

var emailHandler = {};

emailHandler.sendVerificationCode = sendVerificationCode;


var smtpTransport = nodemailer.createTransport(config.smtp);

var rand,mailOptions;

function sendVerificationCode (email, callback) {
    rand = Math.floor((Math.random() * 100000) + 34528);
    
    mailOptions = {
        to : email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br>number is <strong>" + rand + "</strong>"
    }

    console.log(rand);

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(rand);
        }
    })
}

module.exports = emailHandler;