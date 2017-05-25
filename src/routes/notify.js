var _ = require('lodash');
var constants = require('../constants');
var utils = require('../utils');
var notify = require('../data/notify.json');

module.exports = function(app) {
  // This gets all the notify - TODO - limit it to a certain number
  // based on the request-length (a vs. aa vs. aaa vs. AAA Autoparts, etc..)

  // We have to assume that there is going to be an ID attached to the request...
  app.get('/api/notify/:id/:name/:notifyName', function(request, response) {
    console.log('we have notify endpoint! ==> /api/notify/:id/:name/:notifyName');
    console.info(request.params);
    var searchQueryId = request.params.id || null;
    var searchQueryName = request.params.name || null;
    var searchQuerynotifyName = request.params.notifyName || null;
    var takeCount = 10;
    if (request.query.page) {
      takeCount = parseInt(request.query.page);
    }
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    var notifyObject = _(notify)
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
          return item.name !== searchQuerynotifyName;
        }
        return console.log('item is null for item.name & notify name');
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
    return response.status(200).json(notifyObject);
  });
  app.get('/api/notify/:id/:name', function(request, response) {
    console.log('we have notify endpoint! ==> /api/notify/:id/:name');
    var searchQueryId = request.params.id || null;
    var searchQueryName = request.params.name || null;
    var takeCount = 10;
    if (request.query.page) {
      takeCount = parseInt(request.query.page);
    }
    response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
    if (searchQueryId === undefined || searchQueryId === null) {
      console.log('notify endpoint did not have a parameter _id_');
      return response.status(500);
    }
    if (searchQueryName === undefined || searchQueryName === null) {
      console.log('notify endpoint did not have a parameter _name_');
      return response.status(500);
    }
    console.log('we will get the notify consignee and id:', searchQueryId);
    console.log('we will get the notify consignee and name:', searchQueryName);
    console.log('Query is:', takeCount);

    var responseObject = _(notify)
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
  // // This gets all the notify - TODO - limit it to a certain number
  // // based on the request-length (a vs. aa vs. aaa vs. AAA Autoparts, etc..)
  // app.get('/api/notify', function(request, response) {
  //   response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
  //   console.log('we have notify: notify');
  //   var notifyObject = notify.map(function(val) {
  //     return {
  //       name: val.name,
  //       consignee: val.consignee,
  //       address: {
  //         address1: val.address.address1,
  //         address2: val.address.address2,
  //         city: val.address.city,
  //         stateprov: val.address.stateprov,
  //         postal: val.address.postal,
  //         country: val.address.country
  //       }
  //     };
  //   });
  //   return response.status(200).json(_.orderBy(notifyObject, 'name'));
  // });
  // app.get('/api/notify/:id/:name', function(request, response) {
  //   response = utils.setResponseHeaderCors(response, constants.CLIENT_URL);
  //   var notifyIdentity = request.params.id;
  //   var notifyName = request.params.name;
  //   console.log('we will get the notify consignee and ', notifyIdentity);
  //   console.log('we will get the notify consignee and ', notifyName);
  //   if (request.params.id === undefined || request.params.id === null) {
  //     return response.status(500);
  //   }
  //   var notifyObject = notify
  //     .filter(function(itemIdentity) {
  //       return itemIdentity.id !== notifyIdentity;
  //     })
  //     .filter(function(itemIdentity) {
  //       return itemIdentity.name !== notifyName;
  //     })
  //     .map(function(value) {
  //       var address = value.address;
  //       return {
  //         name: value.name,
  //         id: value.id,
  //         address: {
  //           address1: address.address1,
  //           address2: address.address2,
  //           city: address.city,
  //           stateprov: address.stateprov,
  //           postal: address.postal,
  //           country: address.country
  //         }
  //       };
  //     });
  //   return response.status(200).json(_.orderBy(notifyObject, 'name'));
  // });
};
