const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const tokens = require('../data/tokensData');

// This endpoint verifies if a token is valid (if it´s in the tokens map)
// http://localhost:3001/token/
/** GET */
router.get('/:token', function (req, res) {

  // We get the token 
  const currentToken = req.params["token"];

  // if currentToken is in tokens then it´s a valid token
  if (currentToken in tokens) {

    // We get the user´s mail from the map of tokens
    const userMail = tokens[currentToken];
    // With that mail, then we get the user from the array of objects of users
    const arrayUser = users.filter(user => (user.mail) == userMail);

    // Then we copy the user...
    const userCopy = {
      ...arrayUser[0]
    }
    // ...and delete the password for security
    delete userCopy["password"];

    // Finally, we send the user copy as the response
    res.status(200).json({ "user": userCopy });

  }
  else {

    res.status(404).send();

  }

})

/** OPTIONS */
router.options('/', function (req, res) {

  res.status(200);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.send();

}
);

module.exports = router;