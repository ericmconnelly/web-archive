//Purpose: the collection of controller function that allow
//client to queue and save the job + status to mySQL db
//also allow them to get job status using job ID

var archive = require('../../helpers/archive-helpers');
var utils = require('../http-helpers');
var worker = require('../../workers/htmlfetcher');

module.exports = {

  //a function that handle queuing up archive job for processing
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
  //a function that handle checking on job status
  checkJobStatus: function(request, response){
    archive.checkJobStatus(request.body.id, function(obj){
      response.send(obj);
    });
  }
}
