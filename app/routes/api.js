// api.js
'use strict';

var router = require('express').Router();

var config = require('../_core/config'),
    allowOnly = require('../services/routeHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController');

var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/signup/parent', AuthController.signUpParent);
    router.post('/signup/student', AuthController.signUpStudent);
    router.post('/signup/plan', AuthController.signUpPlan);
    router.post('/signup/parent/verify', AuthController.signUpParentVerify);
    router.post('/signup/setsuffix', AuthController.signUpSetSuffix);
    router.post('/authenticate', AuthController.authenticateUser);

    // GET Routes.
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    return router;
};

module.exports = APIRoutes;