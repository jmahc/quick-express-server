var _ = require('lodash');
var constants = require('../constants');
var utils = require('../utils');
var consignees = require('../data/consignees.json');

function doesStringContainQuery(item, query) {
  return _.startsWith(item.toLowerCase(), query.toLowerCase());
}

module.exports = function(app) {
  app.get('/api/consignees', function(request, response) {
    var takeCount = 10;
    if (request.query.page) {
      takeCount = parseInt(request.query.page);
    }
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    var consigneesObject = _(consignees)
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
      .orderBy('name')
      .take(takeCount);
    return response.status(200).json(consigneesObject);
  });

  app.get('/api/consignees/:id', function(request, response) {
    var searchQuery = request.params.id || null;
    var takeCount = 10;
    if (request.query.page) {
      takeCount = parseInt(request.query.page);
    }
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    if (request.params.id === undefined || request.params.id === null) {
      return response.status(500);
    }
    var responseObject = _(consignees)
      .filter(function(item) {
        if (
          searchQuery !== null &&
          searchQuery !== undefined &&
          item !== null &&
          item !== undefined
        ) {
          return doesStringContainQuery(item.name, searchQuery);
        }
        return;
      })
      .map(function(value) {
        const address = value.address;
        return {
          id: value.id,
          name: value.name,
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
      .orderBy('name')
      .take(takeCount);
    return response.status(200).json(responseObject);
  });
};
