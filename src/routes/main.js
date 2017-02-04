var constants = require('../constants');
var utils = require('../utils');

module.exports = function(app) {
  app.get('/', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    return response.sendFile(constants.SOURCE_ROOT + '/index.html');
  });
};
