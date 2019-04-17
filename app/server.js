// server.js
'use strict';

// NPM dependencies
var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    passport = require('passport'),
    path = require('path');

// App related modules.
var hookJWTStrategy = require('./services/passportStrategy');

// Config details.
var config = require('./_core/config');

// Initializations.
var app = express();
var httpPort = process.env.PORT || config.server.port;

// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Hook up Passport.
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// Set the static files location.
app.use(express.static(__dirname + '/../public'));

// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

// Catch all route.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/app/views/index.html'));
});

// Start the server.
var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
    console.log((new Date()) + '=> Http Sever running on http://' + httpServer.address().address + ':' + httpPort);
});