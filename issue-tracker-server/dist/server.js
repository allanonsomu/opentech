"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var issueRoutes = require('./routes/issues');

// Create an instance of Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', issueRoutes);

// Start the server
var port = 5000;
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});