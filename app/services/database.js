// Database configration service
// database.js
'use strict';

var config = require('../_core/config'),
    Sequelize = require('sequelize');

module.exports = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);