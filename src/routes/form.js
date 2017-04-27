var constants = require('../constants');
var utils = require('../utils');

module.exports = function(app) {
  app.post('/api/shipment/', function(request, response) {
    response = utils.setResponseHeaderCors(response);
    console.log('api/shipment/ hit.');
    console.info('Req body is: ', request.body);
  });
};
