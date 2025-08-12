const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../data/usersData");
const tokens = require("../data/tokensData");
const helpers = require("../helpers/helpers");

/** LOGIN */
router.post("/", async function (req, res) {
	// Obtenemos el correo y la contraseña del usuario que se quiere loguear
	const { mail, password } = req.body;

	// 1. Buscamos al usuario solo por su correo electrónico.
	const foundUser = users.find(
		(user) => user.mail.toLowerCase() === mail.toLowerCase()
	);

	// 2. Si se encuentra el usuario, comparamos la contraseña proporcionada con el hash almacenado.
	// bcrypt.compare se encarga de forma segura de la comparación.
	const passwordMatch = foundUser
		? await bcrypt.compare(password, foundUser.password)
		: false;

	// Si el usuario no existe o la contraseña no coincide, devolvemos un error genérico.
	if (!foundUser || !passwordMatch) {
		return res
			.status(401)
			.json({ error: "Datos erróneos. Inténtalo de nuevo." });
	} else {
		// Si se encuentra, se genera un token aleatorio...
		const token = helpers.generateToken();
		// ...y se asigna ese token al correo de ese usuario: ejemplo "876578gfhjrfb755868": "userLogged@mail.com"
		tokens[token] = foundUser.mail;

		// Se hace una copia del usuario y se excluye la contraseña por seguridad
		const userCopy = { ...foundUser };
		delete userCopy["password"];

		/* Después enviamos el token y el usuario al cliente. Se manda el token para que el usuario pueda autenticar futuras 
		peticiones y se manda el usuario, sin datos sensibles, para que el cliente tenga disponible su información en caso de
		que haya que mostrarla. */
		return res.status(200).json({ token: token, user: userCopy });
	}
});

module.exports = router;
