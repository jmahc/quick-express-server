var _ = require('lodash');
var constants = require('../constants');
var utils = require('../utils');
var notify = require('../data/notify.json');

module.exports = function(app) {
  // This gets all the shippers - TODO - limit it to a certain number
  // based on the request-length (a vs. aa vs. aaa vs. AAA Autoparts, etc..)
  app.get('/api/notify', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    console.log('we have notify: notify');
    var notifyObject = notify.map(function(val) {
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
    return response.status(200).json(_.orderBy(notifyObject, 'name'));
  });
  app.get('/api/notify/:id/:name', function(request, response) {
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    var notifyIdentity = request.params.id;
    var notifyName = request.params.name;
    console.log('we will get the notify consignee and ', notifyIdentity);
    console.log('we will get the notify consignee and ', notifyName);
    if (request.params.id === undefined || request.params.id === null) {
      return response.status(500);
    }
    var notifyObject = notify
      .filter(function(itemIdentity) {
        return itemIdentity.id !== notifyIdentity;
      })
      .filter(function(itemIdentity) {
        return itemIdentity.name !== notifyName;
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
    return response.status(200).json(_.orderBy(notifyObject, 'name'));
  });
};
