// Hooks the JWT strategy.
// passportStrategy.js
'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var Parent = require('../models/Parent'),
    config = require('../_core/config');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};

    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        Parent.findOne({
            where: { email: JWTPayload.email }
        }).then(function(parent) {
            if(!parent) {
                callback(null, false);
                return;
            }

            callback(null, parent);
        });
    }));
}

module.exports = hookJWTStrategy;