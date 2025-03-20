const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const users = require('../data/usersData');
const tokens = require('../data/tokensData');
const helpers = require('../helpers/helpers');


/** LOGIN */
router.post('/', function (req, res) {

  // We take the mail and the password of the user that wants to log
  const { mail, password } = req.body;

  // Then we search in the database if there´s an user with that mail and that password
  const arrayResult = users.filter(user => user.mail.toLowerCase() == mail.toLowerCase() && user.password == password);

  // If there's none
  if (arrayResult.length == 0) {

    res.status(401).json({ error: 'Datos erróneos. Inténtalo de nuevo.' });

  }
  else { // If there is

    // We generate a random token...
    const token = helpers.generateToken();
    // ...and assign that token to the user's mail: example "876578gfhjrfb755868": "userLogged@mail.com"
    tokens[token] = arrayResult[0].mail;
    res.status(200);

    // Now we make a copy of the logged user and delete the password for security reasons
    const userCopy = {
      ...arrayResult[0]
    }

    delete userCopy["password"];

    // Then we send the token and the user to the client
    res.json({ token: token, user: userCopy });

  }
}
);

/** LOGOUT */
router.delete('/', function (req, res, next) {

  // We obtain the user's token...
  const token = req.headers.authorization.substring("Bearer ".length);
  // ...and then delete it from the tokens in the database
  delete tokens[token];
  res.status(200);
  res.json({

    token: token

  });
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





