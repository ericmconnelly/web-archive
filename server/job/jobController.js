var archive = require('../../helpers/archive-helpers');
var utils = require('../http-helpers');
var worker = require('../../workers/htmlfetcher');

module.exports = {
  addJob: function(request, response){
    var url = request.body.url;
    archive.isUrlInList(url, function(found){
      if( found ){ // yes:
        // is archived ?
        archive.isURLArchived(url, function(exists){
          if( exists ){ // yes:
            // redirect to page
              utils.sendRedirect(response, '/'+ url);
          } else { // no:
              // redirect to loading
              archive.findJobID(url, function(id){
                utils.sendRedirect(response, '/loading.html', id);
              })
          }
        });
      } else { // no:
          // append to sites
          archive.addUrlToList(url, function(){
            // redirect to loading
            archive.findJobID(url, function(jobID){
              utils.sendRedirect(response, '/loading.html', jobID);
            })
          });
      }
    });
  },
  checkJobStatus: function(request, response){
    archive.checkJobStatus(request.body.id, function(obj){
      response.send(obj);
    });
  }
}
