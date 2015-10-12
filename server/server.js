var initialize = require("./initialize.js");
var express = require('express');
var app = express();

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

// configure the server with all the middleware and the routing
require('./config/middleware')(app, express);

var port = 8080;

app.listen(port);

console.log('Listening on port ' + port);
module.exports = app;
