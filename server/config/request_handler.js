//Purpose: an request handler that handle GET request to some asset
//will either
//  1. return a specific asset if valid and archived
//  or 2. send the user to loading.html if the asset is in the list and is still loading
//  or 3. send the user 404 if the asset is invalid

var utils = require('../http-helpers');
var urlParser = require('url');
var utils = require('../http-helpers');
var archive = require('../../helpers/archive-helpers');

exports.handleGet = function(request, response){
    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.serveAssets(response, urlPath, function(){
      archive.isUrlInList(urlPath.slice(1), function(found){
        if( found ){ // yes:
          // redirect to loading
          utils.sendRedirect(response, '/loading.html');
        } else {
          // 404
          utils.send404(response);
        }
      });
    });
};
