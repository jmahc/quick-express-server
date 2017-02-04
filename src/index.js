var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var jwt = require('jsonwebtoken');
var constants = require('./constants');
var routes = require('./routes');
var utils = require('./utils');

// ==== Instantiate the express server
var app = express();

// ==== Set the port number
app.set('port', constants.PORT);

// ==== Add headers to allow for CORS & pass to next layer of middleware
app.use(function(request, response, next) {
  response = utils.setResponseHeaderCors(response);
  next();
});
// ... Both of these found from stackoverflow..
// - `cors` plugin works if defined first, as seen here.
// !! Could be unnecessary to call setResponseHeaderCors(response) each endpoint versus once
app.use(cors(constants.CORS_OPTIONS));
app.options('*', cors());

// =============
// ==== PLUGINS
// =============
//
app.use(bodyParser.json());

// =========================
// ==== SERVER IS LISTENING
// =======================
//
app.listen(constants.PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port: ', constants.PORT);
  }
});

// ======================
// ==== ROUTES/ENDPOINTS
// ====================
require('./routes')(app);

// ==== Export the expressJS server for nodeJS
module.exports = app;
