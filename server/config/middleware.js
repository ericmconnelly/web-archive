var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var urlParser = require('url');
var utils = require('../http-helpers');
var archive = require('../../helpers/archive-helpers');
var handler = require('./request_handler.js')


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
    handler.handleGet(request, response)
  });

  app.use('/api/job', jobRouter);

  //prevent external API calls, potentially crash the server
  app.post('/*', function(){
    return;
  });

  require('../job/jobRoutes.js')(jobRouter);
};
