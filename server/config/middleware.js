var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var urlParser = require('url');
var utils = require('../http-helpers');
var archive = require('../../helpers/archive-helpers');


module.exports = function(app, express) {
  //define router
  var jobRouter = express.Router();
  var assetRouter = express.Router();

  app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors());

  app.use(express.static(__dirname + '/../../client/public'));

  app.get('/*', function(request, response){
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
  });

  app.use('/api/job', jobRouter);
  // app.use('/asset', assetRouter);
  app.post('/*', function(){
    return;
  });

  require('../job/jobRoutes.js')(jobRouter);
  // require('../asset/assetRoutes.js')(assetRouter, express);
};
