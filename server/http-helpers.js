//Purpose: a collection of helper function for HTTP communication with
//the client

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


//define the default header for response
exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

//a function that handle sending back response to the client
exports.sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

//a function that handle sending 404 if the asset/page address is not found
exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};

//a function that handle sending a client information about the page to be redirected to
exports.sendRedirect = function(response, location, jobID){
  response.send({
    location: location,
    jobID: jobID
  });
};


//a function that handle serving the asset to client
exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};

  // 1. check in public folder
  fs.readFile( archive.paths.siteAssets + asset, encoding, function(err, data){
    if(err){
      // 2. file doesn't exist in public, check archive folder
      fs.readFile( archive.paths.archivedSites + asset, encoding, function(err, data){
        if(err){
          // 3. file doesn't exist in either location
          callback ? callback() : exports.send404(res);
        } else {
          // file exists, serve it
          exports.sendResponse(res, data);
        }
      });
    } else {
      // file exists, serve it
      exports.sendResponse(res, data);
    }
  });
};
