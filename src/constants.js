var pkg = require('../package.json');
var urlForApi = pkg.devConfig.apiUrl;
var urlForClientApplication = pkg.devConfig.clientUrl;
var portNumber = pkg.devConfig.apiPort;

// ==== Test a user login and provide it with the mock JWT
// - Email/password to test against when entering form information.
// - Sample token "generated" on the server to test against each page request.
var jwtEmail = 'hello@test.com';
var jwtPassword = 'test22';
var jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8';
// Whitelisted URL's for the server
var whitelisted = [ urlForApi, urlForClientApplication ];

// ===============
// ==== CONSTANTS
// =============
module.exports = {
  API_URL: urlForApi,
  CLIENT_URL: urlForClientApplication,
  CORS_OPTIONS: {
    credentials: true,
    origin: function(requestOrigin, callback) {
      callback(null, whitelisted.indexOf(requestOrigin) !== -1);
    }
  },
  JWT_EMAIL: jwtEmail,
  JWT_PASSWORD: jwtPassword,
  JWT_TOKEN: jwtToken,
  PORT: portNumber,
  SOURCE_ROOT: __dirname
}
