// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var archive = require('../helpers/archive-helpers');
var crontab = require('node-crontab');

var jobId = crontab.scheduleJob("* *", function(){ //This will call this function every 2 minutes
    // exports.fetch();
    archive.readListOfUrls(function(urls){
    	archive.downloadUrls(urls);
    });
});

