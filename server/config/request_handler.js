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
