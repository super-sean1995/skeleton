// authController.js
'use strict';

var jwt = require('jsonwebtoken');

var config = require('../_core/config'),
    db = require('../services/database'),
    emailHandler = require('../services/emailHandler'),
    Parent = require('../models/Parent'),
    Student = require('../models/Student');
   

// The authentication controller.
var AuthController = {};

// Register a Parent.
AuthController.signUpParent = function(req, res) {
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
         res.json({
             message: 'Please provide a user detail'
         });
    } else {
        var firstName = req.body.firstName,
            lastName = req.body.lastName,
            email = req.body.email,
            password = req.body.password,
            potentialEmail = { where: { email: email } };

        Parent.findOne(potentialEmail).then(function(parent) {
            if (parent) {
                res.status(403).json({
                    message: 'Email already used by another user!'
                });
            } else {
                db.sync().then(function() {
                    var newParent = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password
                    };

                    return Parent.create(newParent).then(function(response) {
                        res.status(201).json({
                            message: 'Email has been verified! Please Continue to create account',
                            email: email,
                            parentID: response.dataValues.id
                        });
                    });
                });
            }
        });
    }
}

// Register a Student.
AuthController.signUpStudent = function(req, res) {
    if(!req.body.parentID || !req.body.email || !req.body.firstName || !req.body.lastName) {
        res.status(403).json({
            message: 'Connection Error!, Please try again!'
        });
    } else {
        var parentID       = req.body.parentID,  
            firstName      = req.body.firstName,
            lastName       = req.body.lastName,
            email          = req.body.email,
            phoneNumber    = req.body.phoneNumber,
            stateID        = req.body.state_id ,
            schoolID       =  req.body.school_id,
            year           = req.body.year,
            majorID        = req.body.major_id,
            sportID        = req.body.sport_id,
            activityID     = req.body.activity_id,
            challengeID    = req.body.challenge_id,
            potentialEmail = { where: { email: email } };

        Student.findOne(potentialEmail).then(function(student) {
            if (student) {
                res.status(403).json({
                    message: 'Email already used by another user!'
                });
            } else {
                db.sync().then(function() {
                    var newStudent = {
                        p_id     : parentID,
                        first_name    : firstName,
                        last_name     : lastName,
                        email         : email,
                        phone_number  : phoneNumber,
                        state_id      : stateID,
                        school_id     : schoolID,
                        year          : year,
                        major_id      : majorID,
                        sport_id      : sportID,
                        activity_id   : activityID,
                        challenge_id  : challengeID,
                        token         : parentID.toString()
                    };

                    return Student.create(newStudent).then(function(response) {
                        res.status(201).json({
                            message: 'Email has been verified! Please Continue to create account',
                            studentEmail: email,
                            studentID: response.dataValues.id
                        });
                    });
                });
            }
        })
    } 
}

// Subscription plan and billing method escrolling handler.
AuthController.signUpPlan = function(req, res) {
    if(!req.body.parentID || !req.body.planID ) {
        res.status(403).json({
            message: 'There is some issue on server, so you can not conitue to register account! Try again later'
        });
    } else {
        var parentID = req.body.parentID,
            planID = req.body.planID,
            cardName = req.body.cardName,
            phoneNumber = req.body.phoneNumber,
            cardNumber = req.body.cardNumber,
            expirationDate = req.body.expirationDate,
            cvc = req.body.cvc,
            potentialID = { where : { id: parentID } };
        
        Parent.findOne(potentialID).then(function(parent) {
            if(parent) {
                var updateData = {
                    plan_id : planID,
                    card_holder_name : cardName,
                    phone_number : phoneNumber,
                    card_number : cardNumber,
                    expiration_date : expirationDate,
                    cvc : cvc,
                    status: 3
                };

                Parent.update(updateData, potentialID);

                Parent.findOne(potentialID).then(function(parent) {
                    if (parent) {
                        var parentEmail = parent.dataValues.email;
                        emailHandler.sendVerificationCode(parentEmail, function(callback) {
                            if (callback) { console.log(callback);
                                Parent.update({verify_code : callback}, { where: { id : parentID } });
                            }
                            res.status(201).json({
                                parentID: parentID,
                                message: 'please verify your account'
                            });
                        });
                    } else {
                        res.status(404).json({
                            message : 'Verification failure!'
                        })
                    }
                });
            } else {
                res.status(404).json({
                    message: 'Validation error!'
                });
            }        
        });
    }
}

// Parent email verification using mail handler.
AuthController.signUpParentVerify = function(req, res) {
    if(!req.body.parentID || !req.body.verifyCode) {

    } else {
        var parentID = req.body.parentID,
            verifyCode = req.body.verifyCode,
            potentialID = { where : { id: req.body.parentID } };

        Parent.findOne(potentialID).then(function(parent) {
            if (parent) {

                if(parent.dataValues.verify_code.toString() == verifyCode) {
                    res.status(201).json({
                        message: 'verified your account!',
                        parentID: parentID
                    })
                } else {
                    res.status(404).json({
                        message: 'Invalidated your email, do you want to try again?'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'Incorrect Email vailidation, you are not user!'
                });
            }
        })
    }
}

// Signup Set Suffix.
AuthController.signUpSetSuffix = function(req, res) {
    // console.log(req.body);
    Parent.findOne({ where : { id: req.body.parentID } }).then(function(parent) {
        if(parent) {
            var parentID = parent.dataValues.id,
            suffix = req.body.suffix,
            potentialID = { where : { id : parentID } },
            updateData = { suffix : suffix };
    
            Parent.update(updateData, potentialID);

            res.status(201).json({
                message: '',
                parentID : parentID
            });
        } else {
            res.status(404).json({
                message : ''
            });
        }
    });
}

AuthController.signUp = function(req, res) {
    // if(!req.body.username || !req.body.password) {
    //     res.json({ message: 'Please provide a username and a password.' });
    // } else {
    //     db.sync().then(function() {
    //         var newUser = {
    //             username: req.body.username,
    //             password: req.body.password
    //         };

    //         return User.create(newUser).then(function() {
    //             res.status(201).json({ message: 'Account created!' });
    //         });
    //     }).catch(function(error) {
    //         console.log(error);
    //         res.status(403).json({ message: 'Username already exists!' });
    //     });
    // }
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res) {
    // if(!req.body.username || !req.body.password) {
    //     res.status(404).json({ message: 'Username and password are needed!' });
    // } else {
    //     var username = req.body.username,
    //         password = req.body.password,
    //         potentialUser = { where: { username: username } };

    //     User.findOne(potentialUser).then(function(user) {
    //         if(!user) {
    //             res.status(404).json({ message: 'Authentication failed!' });
    //         } else {
    //             user.comparePasswords(password, function(error, isMatch) {
    //                 if(isMatch && !error) {
    //                     var token = jwt.sign(
    //                         { username: user.username },
    //                         config.keys.secret,
    //                         { expiresIn: '30m' }
    //                     );

    //                     res.json({
    //                         success: true,
    //                         token: 'JWT ' + token,
    //                         role: user.role
    //                     });
    //                 } else {
    //                     res.status(404).json({ message: 'Login failed!' });
    //                 }
    //             });
    //         }
    //     }).catch(function(error) {
    //         res.status(500).json({ message: 'There was an error!' });
    //     });
    // }
}

module.exports = AuthController;