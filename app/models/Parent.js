// The Parent model
'use strict';

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

var config = require('../_core/config'),
    db = require('../services/database');

// 1. The model schema.
var modelDefinition = {
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    suffix: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    security_question_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    security_answer: {
        type: Sequelize.STRING,
        allowNull: true
    },
    verify_code: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    country_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: true
    },
    time_zone_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    card_holder_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    card_number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    expiration_date: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cvc: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    plan_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    end_at: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    }
}

// 2. The model options.
var modelOptions = {
    instanceMethods: {
        comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
}

// 3. Define the Parent model
var ParentModel = db.define('tbl_parent', modelDefinition, modelOptions);

// 4. Compare two passwords.
function comparePasswords(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

//  Hash the password for a parent object.
function hashPassword(parent) {
    if(parent.changed('password')) {
        return bcrypt.hash(parent.password, 10).then(function(password) {
            parent.password = password;
        });
    }
}

module.exports = ParentModel;