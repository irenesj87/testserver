const express = require("express");
//const res = require('express/lib/response');
const router = express.Router();
const users = require("../data/usersData");
const tokens = require("../data/tokensData");

// Este endpoint verifica si un token es válido (si está en el mapa de tokens)
// http://localhost:3001/token/
/** GET */
router.get("/:token", function (req, res) {
	// Obtenemos el token de los parámetros de la petición HTTP
	const currentToken = req.params["token"];

	// Si currentToken está en tokens entonces es un token válido
	if (currentToken in tokens) {
		// Obtenemos el correo del usuario del mapa de tokens
		const userMail = tokens[currentToken];
		// Con ese correo, obtenemos al usuario del array de usuarios
		const arrayUser = users.filter((user) => user.mail == userMail);

		// Después copiamos el usuario...
		const userCopy = {
			...arrayUser[0],
		};
		// ...y eliminamos su contraseña por seguridad
		delete userCopy["password"];

		// Finalmente, se manda la copia del usuario como respuesta
		res.status(200).json({ user: userCopy });
	} else {
		res.status(404).send();
	}
});

/** OPTIONS */
router.options("/", function (req, res) {
	res.status(200);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
	res.send();
});

module.exports = router;
