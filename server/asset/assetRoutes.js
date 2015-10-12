var urlParser = require('url');
var assetController = require('./assetController.js');

module.exports = function(app, express) {
  app.get('/*', assetController.getAsset);
};
