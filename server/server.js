
var initialize = require("./initialize.js");
var express = require('express');
var app = express();

//intializing the application to have the archives and ./archives/sites folder
//to store all the archives assets
initialize();

// configure the server with all the middleware and the routing
require('./config/middleware')(app, express);

//define the port
var port = 8080;

//binds and listens for connections on the specified host and port.
app.listen(port);

console.log('Listening on port ' + port);
module.exports = app;
