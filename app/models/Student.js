// The Student model.
'use strict';

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

var config = require('../_core/config'),
    db = require('../services/database');

// 1. The model schema.
var modelDefinition = {
    p_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
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
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    token: {
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
    gender: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birth_date: {
        type: Sequelize.STRING,
        allowNull: true
    },
    time_zone_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    state_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    school_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    major_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sport_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    activity_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    challenge_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    login_at: {
        type: Sequelize.STRING,
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
        compareToken: compareToken
    },
    hooks: {
        beforeValidate: hashToken
    }
}

// 3. Define the Student model.
var StudentModel = db.define('tbl_student', modelDefinition, modelOptions);

// 4. Compare two token.
function compareToken(token, callback) {
    bcrypt.compare(token, this.token, function(error, isMatch) {
        if (error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// 5. Hash the token for student object
function hashToken(student) {
    if(student.changed('token')) {
        return bcrypt.hash(student.token, 10).then(function(token) {
            student.token = token;
        });
    }
}

module.exports = StudentModel;