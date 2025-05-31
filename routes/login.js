const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const tokens = require("../data/tokensData");
const helpers = require("../helpers/helpers");

/** LOGIN */
router.post("/", function (req, res) {
	// Obtenemos el correo y la contraseña del usuario que se quiere loguear
	const { mail, password } = req.body;

	// Después, buscamos en la base de datos si hay un usuario con ese correo y esa contraseña
	const arrayResult = users.filter(
		(user) =>
			user.mail.toLowerCase() == mail.toLowerCase() && user.password == password
	);

	// Si no hay ninguno
	if (arrayResult.length == 0) {
		res.status(401).json({ error: "Datos erróneos. Inténtalo de nuevo." });
	} else {
		// Si lo hay, se genera un token aleatorio...
		const token = helpers.generateToken();
		// ...y se asigna ese token al correo de ese usuario: ejemplo "876578gfhjrfb755868": "userLogged@mail.com"
		tokens[token] = arrayResult[0].mail;
		res.status(200);
		// Después se hace una copia del usuario logueado y se elimina la contraseña por razones de seguridad
		const userCopy = {
			...arrayResult[0],
		};
		delete userCopy["password"];
		/* Después enviamos el token y el usuario al cliente. Se manda el token para que el usuario pueda autenticar futuras 
		peticiones y se manda el usuario, sin datos sensibles, para que el cliente tenga disponible su información en caso de
		que haya que mostrarla. */
		res.json({ token: token, user: userCopy });
	}
});

/** LOGOUT */
router.delete("/", function (req, res, next) {
	// Obtenemos el token del usuario...
	const token = req.headers.authorization.substring("Bearer ".length);
	// ...y se elimina de los tokens de la base de datos
	delete tokens[token];
	res.status(200);
	res.json({
		token: token,
	});
});

/** OPTIONS */
router.options("/", function (req, res) {
	res.status(200);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
	res.send();
});

module.exports = router;
