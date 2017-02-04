var constants = require('./constants');

// ==== Method to shorten the process for setting the response's header values.
// !! This is necessary to allow for CORS.
var setResponseHeaderCors = function(res) {
  // - Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', constants.CLIENT_URL);
  // - Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // - Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // - Set to true if you need the website to include cookies in the requests sent
  //    to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  return res;
};

module.exports = { setResponseHeaderCors };
