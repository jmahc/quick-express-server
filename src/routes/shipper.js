var _ = require('lodash');
var constants = require('../constants');
var utils = require('../utils');
var shippers = require('../data/shippers.json');

module.exports = function(app) {
  // This gets all the shippers - TODO - limit it to a certain number
  // based on the request-length (a vs. aa vs. aaa vs. AAA Autoparts, etc..)
  app.get('/api/shipper', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    console.log('we have shippers: shippers');
    var shippersObject = shippers.map(function(val) {
      return {
        name: val.name,
        consignee: val.consignee,
        address: {
          address1: val.address.address1,
          address2: val.address.address2,
          city: val.address.city,
          stateprov: val.address.stateprov,
          postal: val.address.postal,
          country: val.address.country
        }
      };
    });
    return response.status(200).json(_.orderBy(shippersObject, 'name'));
  });
  app.get('/api/shipper/:id/:name', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    var shipperIdentity = request.params.id;
    var shipperName = request.params.name;
    console.log('we will get the shippers consignee and ', shipperIdentity);
    console.log('we will get the shippers consignee and ', shipperName);
    if (request.params.id === undefined || request.params.id === null) {
      return response.status(500);
    }
    var shippersObject = shippers
      .filter(function(itemIdentity) {
        return itemIdentity.id !== shipperIdentity;
      })
      .filter(function(itemIdentity) {
        return itemIdentity.name !== shipperName;
      })
      .map(function(value) {
        var address = value.address;
        return {
          name: value.name,
          id: value.id,
          address: {
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            stateprov: address.stateprov,
            postal: address.postal,
            country: address.country
          }
        };
      });
    return response.status(200).json(_.orderBy(shippersObject, 'name'));
  });
};
