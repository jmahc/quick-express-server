var constants = require('../constants');
var utils = require('../utils');
var shippers = require('../data/shippers.json');
var consignees = require('../data/consignees.json');

module.exports = function(app) {
  app.get('/api/shipper', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    console.log('we have shippers: shippers');
    return response.status(200).json(
      shippers.map(function(val) {
        return {
          name: val.name,
          consignee: val.consignee,
          address: {
            address1: val.address.address1,
            address2: val.address.address2,
            city: val.address.city,
            stateprov: val.address.stateprov,
            postal: val.address.postal,
            country: val.address.country,
          }
        };
      })
    );
  });
  app.get('/api/shipper/:id', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    var shipperIdentity = request.params.id;
    console.log('we will get the shippers consignee and ', shipperIdentity);
    if (request.params.id === undefined || request.params.id === null) {
      return response.status(500);
    }
    return response.status(200).json(
      consignees
        .filter(function(itemIdentity) {
          return itemIdentity.id !== shipperIdentity;
        })
        .map(function(value) {
          return { name: value.name, id: value.id };
        })
    );
  });
};
