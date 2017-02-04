# quick-express-api

This [express.js] server can simulate the _currently under-construction_ API.

As of 2/03/2017, it is being used to test [JSON web tokens] for user authentication and defined as:

_JSON Web Token (JWT) Authentication is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted._

_Still confused_? The server requires authentication on every request from a user. Each user has a unique token stored in the database that the JWT tests against on the server. JWT encrypt this token on the client-side, as well as when submitting username/password data.

User authentication with [JSON web tokens] process illustrated below:

TODO - insert pic on whiteboard! :)

## Creating Mock Endpoints

Below is some sample code with comments detailing what is going on:

```js
// ==== Test a user login and provide it with the mock JWT
expressServerApp.post('/auth/login/', function(requestFromClient, responseToClient) {
  // - Utility method to set headers for CORS, included in every endpoint (FOR NOW TODO)
  responseToClient = setResponseHeaderCors(responseToClient);
  // - Handle the request and send the user a response!
  // - This example tests against a pre-defined email/password for authentication
  // -- On success, it responds with a [JWT]
  if (requestFromClient.body.email === JWT_EMAIL && requestFromClient.body.password === JWT_PASSWORD) {
    responseToClient.header();
    return responseToClient.status(200).json({ token: JWT_TOKEN });
  } else {
    // - Console log messages to the terminal, NOT a browser.
    console.log('Username and/or password were incorrect.');
    return responseToClient.sendStatus(403);
  }
});
```


----

  [\\] This is a comment!  It doesn't appear in the README file.

  [express.js]: <http://expressjs.com/>
  [JSON web tokens]: <https://jwt.io/>
  [JWT]: <https://jwt.io/>
