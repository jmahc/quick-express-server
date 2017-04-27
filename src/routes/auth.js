var constants = require('../constants');
var utils = require('../utils');

module.exports = function(app) {
  // app.get('/', function(req, res) {
    app.post('/auth/login/', function(request, response) {
      response = utils.setResponseHeaderCors(response);
      console.info('auth/login hit.');
      console.info('Req body is: ', request.body);
      if (request.body.email === JWT_EMAIL && request.body.password === JWT_PASSWORD) {
        response.header();
        return response.status(200).json({ token: JWT_TOKEN });
      } else {
        console.log('Username and/or password were incorrect.');
        return response.sendStatus(403);
      }
    });

    // ==== Request data & include a JWT
    app.get('/getData/', function(request, response) {
      response = utils.setResponseHeaderCors(response);

      var token = request.headers['authorization'];
      if (!token) {
        return response.sendStatus(401);
      } else {
        try {
          var decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
          console.log(decoded);
          return response
            .status(200)
            .json({
              data: 'Valid JWT found! This protected data was fetched from the server.'
            });
        } catch (error) {
          console.log(
            'ERROR /getData/ | Responding to client with a 401 status.  Message reads:'
          );
          console.info(error);
          return response.sendStatus(401);
        }
      }
    });

    // ==== Mock endpoint for a request to a "protected" part of the site/application
    app.get('/protected', (request, response) => {
      console.log('/protected');
      response = utils.setResponseHeaderCors(response);

      var token = request.headers['Authorization'];
      console.log('Request headers for authorization: ');
      console.log(token);
      if (token === JWT_TOKEN) {
        console.log('/protected true');
        response.send({
          content: 'The protected test route is functional!',
          authenticated: true
        });
      } else {
        console.log('/protected false');
        response.send({
          content: 'The token provided via browser cookie did not authenticate.',
          authenticated: false,
          status: 403
        });
      }
    });
  // });
};
