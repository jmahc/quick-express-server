var constants = require('../constants');
var utils = require('../utils');
// var offices = require('../data/dummy-data.json');

module.exports = function(app) {
  app.get('/', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    return response.sendFile(constants.SOURCE_ROOT + '/index.html');
  });

  // app.get('/api/officestatus', function(request, response) {
  //   response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
  //   return response.status(200).json(offices);
  // });
};
