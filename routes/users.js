const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const users = require('../data/usersData');
const { validToken } = require('../helpers/helpers');


/** GET to get the users mail */
router.get('/', function (req, res, next) {

  const response = users.map(userMail => {

    return { user: userMail }
  })

  res.status(200).json(response);

});

// Counter for users's id
let counter = 2;

/** POST for creating a new user */
router.post('/', function (req, res) {

  // First we get the mail of the user that wants to register
  const { mail } = req.body;

  // We see if there´s already an user with that mail in the database
  let arrayResult = users.filter(user => (user.mail).toLowerCase() == mail.toLowerCase());


  // If there's one
  if (arrayResult.length > 0) {
    res.status(409).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
  }
  else {

    // If there´s not, we create an user with the info sent in the petition, an empty array of excursions and an id
    const user = {

      ...req.body,
      excursions: [],
      id: counter

    };
    // And then we add it to the array of users
    users.push(user);
    res.status(201).setHeader('Location', `http://localhost:3001/users/${counter}`);
    counter++;
    res.json(user);
  }
}

);

/** PUT for updating user info */
router.put('/:mail', function (req, res, next) {

  // We see if the token is valid and if it pertains to the user that wants to update his/her info 
  if (!req.headers.authorization) {

    res.status(401).send();
    return;

  }
  // If the token is valid, (if it's in the database)
  const currentToken = validToken(req.headers.authorization.substring("Bearer ".length));
  // We obtain the mail of the user currently logged in...
  const currentMail = req.params["mail"];
  // ...and see if there's an user in the database with that mail
  const currentUser = users.filter(user => (user.mail).toLowerCase() == currentMail.toLowerCase());

  // If the token and the token of the current user is the same
  if (currentToken && currentUser[0]) {

    // We update the user's info
    Object.assign(currentUser[0], req.body);
    res.status(200).json(currentUser[0]);
  }
  else {

    res.status(401).send();

  }

});

/** PUT for updating the users's excursions list */
router.put('/:mail/excursions/:id', function (req, res, next) {

  // We see if the token is valid and if it pertains to the user that wants to update his/her info  
  if (!req.headers.authorization) {

    res.status(401).send();
    return;

  }
  // If the token is valid, (if it's in the database)
  const currentToken = validToken(req.headers.authorization.substring("Bearer ".length));
  // We obtain the mail of the user currently logged in...
  const currentMail = req.params["mail"];
  // ...and see if there's an user in the database with that mail
  const currentUser = users.filter(user => (user.mail).toLowerCase() == currentMail.toLowerCase());

  // If the token and the token of the current user is the same
  if (currentToken && currentUser[0]) {

    // We add the excursion to his/her array of excursions
    currentUser[0].excursions.push(parseInt(req.params["id"]));
    res.status(200).json(currentUser[0]);

  }
  else {

    res.status(401).send();

  }

})

/** OPTIONS */
router.options('/', function (req, res) {

  res.status(200);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  res.send();

}
);

module.exports = router;
