//Purpose: a crontab scheduler that use archived helper to read the list
//of urls in the databases and download them one by one

var request = require('request');
var archive = require('../helpers/archive-helpers');
var crontab = require('node-crontab');

var jobId = crontab.scheduleJob("* *", function(){ //This will call this function every 1 minutes
    archive.readListOfUrls(function(urls){
    	archive.downloadUrls(urls);
    });
});

