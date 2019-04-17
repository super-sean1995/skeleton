// Application configration.
'use strict';

var config = module.exports;

// server setting.
config.server = {
    port: 8080
};

// database configration
config.db = {
    user: 'root', 
    password: '',
    name: 'subscription'
};

config.db.details = {
    host: 'localhost',
    port: 3306,      
    dialect: 'mysql'
};

// token secret key
config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

// User access configration.
var userRoles = config.userRoles = {
    student: 1,    // ...001
    parent: 2,     // ...010
    admin: 4     // ...100
};

config.accessLevels = {
    student: userRoles.student | userRoles.parent | userRoles.admin,    // ...111
    parent: userRoles.parent | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};