var _ = require('lodash');
var constants = require('../constants');
var utils = require('../utils');
var shippers = require('../data/shippers.json');

function doesStringContainQuery(item, query) {
  return _.startsWith(item.toLowerCase(), query.toLowerCase());
}

module.exports = function(app) {
  // This gets all the shippers - TODO - limit it to a certain number
  // based on the request-length (a vs. aa vs. aaa vs. AAA Autoparts, etc..)

  // We have to assume that there is going to be an ID attached to the request...
  app.get('/api/shippers/:id/:name/:shipperName', function(request, response) {
    console.log('we have shippers endpoint! ==> /api/shippers/:id/:name/:shipperName');
    console.info(request.params);
    var searchQueryId = request.params.id || null;
    var searchQueryName = request.params.name || null;
    var searchQueryShipperName = request.params.shipperName || null;
    var takeCount = 10;
    if (request.query.page) {
      takeCount = parseInt(request.query.page);
    }
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    var shippersObject = _(shippers)
      .filter(function(item) {
        if (item !== null && item !== undefined) {
          return item.consignee !== searchQueryId;
          // return item.id !== searchQueryId;
          // return doesStringContainQuery(item.id, searchQueryId);
        }
        return console.log('item is null for item.id');
      })
      .filter(function(item) {
        if (item !== null && item !== undefined) {
          return item.name !== searchQueryName;
          // return doesStringContainQuery(item.name, searchQueryName);
        }
        return console.log('item is null for item.name');
      })
      .filter(function(item) {
        if (item !== null && item !== undefined) {
          return item.name !== searchQueryShipperName;
        }
        return console.log('item is null for item.name & shipper name');
      })
      .map(function(value) {
        const address = value.address;
        return {
          name: value.name,
          consignee: value.consignee,
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
      .take(10);
    return response.status(200).json(shippersObject);
  });
  app.get('/api/shippers/:id/:name', function(request, response) {
    console.log('we have shippers endpoint! ==> /api/shippers/:id/:name');
    var searchQueryId = request.params.id || null;
    var searchQueryName = request.params.name || null;
    var takeCount = 10;
    if (request.query.page) {
      takeCount = parseInt(request.query.page);
    }
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    if (searchQueryId === undefined || searchQueryId === null) {
      console.log('Shippers endpoint did not have a parameter _id_');
      return response.status(500);
    }
    if (searchQueryName === undefined || searchQueryName === null) {
      console.log('Shippers endpoint did not have a parameter _name_');
      return response.status(500);
    }
    console.log('we will get the shippers consignee and id:', searchQueryId);
    console.log('we will get the shippers consignee and name:', searchQueryName);
    console.log('Query is:', takeCount);

    var responseObject = _(shippers)
      .filter(function(item) {
        if (item !== null && item !== undefined) {
          return item.consignee !== searchQueryId;
          // return item.id !== searchQueryId;
          // return doesStringContainQuery(item.id, searchQueryId);
        }
        return console.log('item is null for item.id');
      })
      .filter(function(item) {
        if (item !== null && item !== undefined) {
          return item.name !== searchQueryName;
          // return doesStringContainQuery(item.name, searchQueryName);
        }
        return console.log('item is null for item.name');
      })
      .map(function(value) {
        var address = value.address;
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
