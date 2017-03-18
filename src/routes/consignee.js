var _ = require('lodash');
var constants = require('../constants');
var utils = require('../utils');
var shippers = require('../data/shippers.json');
var consignees = require('../data/consignees.json');

function doesStringContainQuery(item, query) {
  return _.startsWith(item.toLowerCase(), query.toLowerCase());
}

module.exports = function(app) {
  app.get('/api/consignees', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    console.log('we have consignees endpoint!');
    var consigneesObject = _(consignees).map(function(value) {
      return {
        name: value.name,
        id: value.id,
        address: {
          address1: value.address.address1,
          address2: value.address.address2,
          city: value.address.city,
          stateprov: value.address.stateprov,
          postal: value.address.postal,
          country: value.address.country
        }
      };
    })
    .orderBy('name')
    .take(10);
    return response.status(200).json(consigneesObject);
  });

  app.get('/api/consignees/:id', function(request, response) {
    var searchQuery = request.params.id;
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    if (request.params.id === undefined || request.params.id === null) {
      return response.status(500);
    }
    var responseObject = _(consignees)
      .filter(function(item) {
        return doesStringContainQuery(item.name, searchQuery);
      })
      .map(function(value) {
        const address = value.address;
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
      })
      .orderBy('name');
    return response.status(200).json(responseObject);
  });
}
