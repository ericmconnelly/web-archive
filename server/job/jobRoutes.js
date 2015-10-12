//Purpose: an API routes configuration for /api/job

var jobController = require('./jobController.js');

module.exports = function(app) {
  // app is the userrouter injected from middleware file
  app.post('/addjob', jobController.addJob);
  app.post('/status', jobController.checkJobStatus);
};
