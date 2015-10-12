//Purpose: handle all the archiving task for the client

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var urlParser = require('url');
var http = require('http');
var Sequelize = require('sequelize');

// defining Sequelize object, the databases with authentication information
var sequelize = new Sequelize('archive_machine', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
        timestamps: false,
  }
});

//define the Jobs schema object
var Jobs = sequelize.define('jobs', {
  id:  { type: Sequelize.INTEGER,
  			 autoIncrement: true,
  			 primaryKey: true },
  url: Sequelize.STRING,
  status: Sequelize.STRING,
  isArchived: Sequelize.BOOLEAN
});

//do authentication and open connection with the databases
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });


//define the default paths to both archived assets directory and site asset directory
exports.paths = {
  siteAssets: path.join(__dirname, '../client/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
};

//a function that will query the url, isArchived and id field
//of database and return them in nicely formatted array
exports.readListOfUrls = function(callback){
	var result = [];

	Jobs.findAll({
		attributes: ['url', 'isArchived', 'id']
	})
	.then(function(urls){
		urls.forEach(function(url){
      console.log(url.dataValues);
			result.push({
        url : url.dataValues.url,
        id: url.dataValues.id});
		});
		if(callback){
      callback(result);
    }
	})
	.catch(function(err){
		console.log('An error occured while reading list of URLs:', err)
	});
};

//a function that check whether the URL exist in the databases
exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.url.match(url)
    });
    callback(found);
  });
};

//a function that find the jobID given the url
exports.findJobID = function(url, callback){
    Jobs.findOne({
      where: {url: url},
      attributes: ['id']
    })
    .then(function(obj){
      callback(obj.id)
    })
    .catch(function(err){
      console.log('An error occured while search jobID:', err)
    });
};

//a function that check for the status of the job (either 'incomplete' or 'completed')
exports.checkJobStatus = function(id, callback){
    Jobs.findOne({
      where: {id: id},
      attributes: ['status', 'url']
    })
    .then(function(obj){
      callback(obj)
    })
    .catch(function(err){
      console.log('An error occured while checking job status:', err)
    });
};

//a function that add the URL to the databases with default field status = 'incomplete' and isArchived = 'false' ie not archived yet
exports.addUrlToList = function(url, callback){
	//adding url to txt file
	var newJob = Jobs.build({url: url,
													status: 'incomplete',
													isArchived: false});

	newJob.save()

	.then(function(){
			callback();
	})
	.catch(function(err){
		console.log('ERR', err)
	})
};

//a function that check if the url is already archived
exports.isURLArchived = function(url, callback){
  var sitePath =  path.join(exports.paths.archivedSites, url);
  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

//a function that go through the list of urls array and download them one by one
//then write them to a file inside ./archives/sites directory
exports.downloadUrls = function(urls){
  // Iterate over urls and pipe to new files
  console.log('****************DOWNLOADING*****************')
  console.log(urls)
  var fileStream;
  _.each(urls, function(url) {
		if(!url){ return; }
    request('http://' + url.url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url.url));
  	Jobs.update({
  		status: 'completed',
  		isArchived: true
  	},{
  		where: {url: url.url}
  	})
  });
  return true;
};

