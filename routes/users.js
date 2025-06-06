const express = require("express");
const router = express.Router();
const tokens = require("../data/tokensData");
const users = require("../data/usersData");
const { validToken } = require("../helpers/helpers");

/* Middleware: En Express.js son funciones que tienen acceso a los objetos request y response y la función next. Son los que 
realizan los pasos que deben ir entre que una petición llega hasta que va a su handler route final. */
// Middleware que dice si un token es válido o no
const authenticateToken = (req, res, next) => {
	try {
		// Se guardan las credenciales de autenticación del usuario
		const authHeader = req.headers.authorization;
		if (!authHeader?.startsWith("Bearer ")) {
			console.log(
				"Auth Middleware: Authorization header missing or invalid format."
			);
			return res
				.status(401)
				.json({ error: "Authorization header missing or invalid." });
		}
		// Se obtiene el token de la cabecera
		const tokenString = authHeader.substring("Bearer ".length);
		const currentToken = validToken(tokenString); // Retorna un string con el token si es válido y null si no lo es
		console.log("Auth Middleware: Validated token:", currentToken);
		if (!currentToken) {
			return res.status(401).json({ error: "Invalid or expired token." });
		}
		// Mete el token y su correo asociado al objeto request
		req.token = currentToken;
		req.tokenEmail = tokens[currentToken];
		console.log(`Auth Middleware: Attached req.tokenEmail = ${req.tokenEmail}`);
		next();
	} catch (error) {
		console.error("Auth Middleware: Unexpected error:", error);
		return res
			.status(500)
			.json({ error: "Internal Server Error during authentication." });
	}
};

// Middleware que dice si un usuario puede modificar info o no
const authorizeUserModification = (req, res, next) => {
	// Obtenemos el correo asociado al token
	const emailFromToken = req.tokenEmail; // Lo da el middleware authenticateToken
	// Obtenemos el correo del usuario a modificar desde la URL
	const targetMail = req.params["mail"];
	// Si el correo asociado al token no es el mismo que el correo del usuario que quiere actualizar su info...
	// Esta comprobación de seguridad se hace para que otro usuario no pueda modificar la info del usuario actual
	if (emailFromToken.toLowerCase() !== targetMail.toLowerCase()) {
		// ...se avisa del error
		console.log(
			`Authorization failed: Token email (${emailFromToken}) does not match target email (${targetMail}).`
		);
		return res
			.status(403)
			.json({ error: "Forbidden: You can only update your own profile." });
	}
	next();
};

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
router.put(
	"/:mail",
	authenticateToken,
	authorizeUserModification,
	function (req, res, next) {
		console.log(`PUT /users/${req.params["mail"]} - Request received.`); // Log start
		try {
			// Obtenemos el correo del usuario a modificar
			const targetMail = req.params["mail"];
			console.log("Route Handler: Target user email from URL:", targetMail);
			// Buscamos el usuario a actualizar
			const currentUser = users.find(
				(user) => user.mail.toLowerCase() === targetMail.toLowerCase()
			);
			// Comprobamos si el usuario existe
			if (!currentUser) {
				console.log(`User with email ${targetMail} not found.`);
				return res.status(404).json({ error: "User not found." });
			}
			console.log("Found target user:", currentUser.mail);
			// Y si existe, actualizamos la info del usuario
			Object.assign(currentUser, req.body);
			return res.status(200).json(currentUser); // Se manda al cliente el usuario actualizado
		} catch (error) {
			console.error("Unexpected error in PUT /users/:mail:", error);
			return res.status(500).json({ error: "Internal Server Error occurred." });
		}
	}
);

/** PUT para actualizar la lista de excursiones a las que el usuario se ha apuntado */
router.put(
	"/:mail/excursions/:id",
	authenticateToken,
	authorizeUserModification,
	function (req, res, next) {
		console.log(`PUT /users/${req.params["mail"]} - Request received.`);
		try {
			// Obtenemos el correo del usuario a modificar desde la URL
			const targetMail = req.params["mail"];
			console.log("Route Handler: Target user email from URL:", targetMail);
			// Buscamos el usuario a actualizar
			const currentUser = users.find(
				(user) => user.mail.toLowerCase() == targetMail.toLowerCase()
			);
			// Comprobamos si el usuario existe
			if (!currentUser) {
				console.log(`User with email ${targetMail} not found.`);
				return res.status(404).json({ error: "User not found." });
			}
			console.log("Route Handler: Found target user:", currentUser.mail);
			// Se añade la excursión a su array de excursiones
			currentUser.excursions.push(parseInt(req.params["id"]));
			res.status(200).json(currentUser);
		} catch (error) {
			console.error(
				"Unexpected error in PUT /users/:mail/excursions/:id:",
				error
			);
			return res.status(500).json({ error: "Internal Server Error occurred." });
		}
	}
);

/** OPTIONS */
router.options("/", function (req, res) {
	res.status(200);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
	res.send();
});

module.exports = router;
