const express = require("express");
const router = express.Router();
//const req = require('express/lib/request');
//const res = require('express/lib/response');
const users = require("../data/usersData");
const { validToken } = require("../helpers/helpers");

/** GET para obtener el correo del usuario */
router.get("/", function (req, res, next) {
	const response = users.map((userMail) => {
		return { user: userMail };
	});

	res.status(200).json(response);
});

// Contador para el id del usuario
let counter = 2;

/** POST para crear un nuevo usuario */
router.post("/", function (req, res) {
	// Primero obtenemos el correo del usuario que se quiere registrar
	const { mail } = req.body;

	// Se comprueba si ya hay un usuario con ese correo
	const userFound = users.find(
		(user) => user.mail.toLowerCase() == mail.toLowerCase()
	);

	// Si hay uno
	if (userFound) {
		res
			.status(409)
			.json({ error: "Ya existe un usuario con ese correo electrónico." });
	} else {
		// Si no lo hay, creamos un usuario con la info mandada en la petición, un array vacío de excursiones y un id
		const user = {
			...req.body,
			excursions: [],
			id: counter,
		};
		// Y después se añade al array de usuarios
		users.push(user);
		res
			.status(201)
			/* res.setHeader(name, value): Es un método de Express.js. Se usa para setear una cabecera HTTP específica en
			la respuesta que se mandará otra vez al cliente */
			/* Location: Es el nombre de la cabecera HTTP. Cuando se usa con un código '201 Created'dice al cliente la URL 
			exacta donde se encuentra el recurso que se acaba de crear */
			/* Esta línea setea la cabecera Location en la respuesta para apuntar a la URL específica del usuario que se acaba de crear.
			Es una práctica estándar en las APIs RESTful */
			.setHeader("Location", `http://localhost:3001/users/${counter}`);
		counter++;
		res.json(user);
	}
});

/** PUT para actualizar la info del usuario */
router.put("/:mail", function (req, res, next) {
	// Se comprueba si el token es válido y si pertenece al usuario que quiere actualizar su info
	if (!req.headers.authorization) {
		res.status(401).send();
		return;
	}
	// Si el token es válido, (si está en la base de datos)
	const currentToken = validToken(
		req.headers.authorization.substring("Bearer ".length)
	);
	// Obtenemos el correo con el que el usuario está logueado en este momento...
	const currentMail = req.params["mail"];
	// ...y se mira si hay un usuario que está en la base de datos con ese correo
	const currentUser = users.filter(
		(user) => user.mail.toLowerCase() == currentMail.toLowerCase()
	);

	// Si el token de la base de datos y el token del usuario actual es el mismo
	if (currentToken && currentUser[0]) {
		/* Object.assign(target, source): Es una función de JavaScript. Copia todas las propiedades enumerables de uno o más
		 objetos (req.body) a otro objeto (currentUser[0]). Con esto se actualiza la info del usuario */
		Object.assign(currentUser[0], req.body);
		res.status(200).json(currentUser[0]);
	} else {
		res.status(401).send();
	}
});

/** PUT para actualizar la lista de excursiones a las que el usuario se ha apuntado */
router.put("/:mail/excursions/:id", function (req, res, next) {
	// We see if the token is valid and if it pertains to the user that wants to update his/her info
	if (!req.headers.authorization) {
		res.status(401).send();
		return;
	}
	// If the token is valid, (if it's in the database)
	const currentToken = validToken(
		req.headers.authorization.substring("Bearer ".length)
	);
	// We obtain the mail of the user currently logged in...
	const currentMail = req.params["mail"];
	// ...and see if there's an user in the database with that mail
	const currentUser = users.filter(
		(user) => user.mail.toLowerCase() == currentMail.toLowerCase()
	);

	// If the token and the token of the current user is the same
	if (currentToken && currentUser[0]) {
		// We add the excursion to his/her array of excursions
		currentUser[0].excursions.push(parseInt(req.params["id"]));
		res.status(200).json(currentUser[0]);
	} else {
		res.status(401).send();
	}
});

/** OPTIONS */
router.options("/", function (req, res) {
	res.status(200);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
	res.send();
});

module.exports = router;
