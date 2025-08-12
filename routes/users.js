const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const excursions = require("../data/excursionsData");
const { authenticateToken } = require("../authMiddleware");

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
	// Se excluye la contraseña de la respuesta por seguridad.
	const response = users.map(({ password, ...user }) => user);
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
		// IMPORTANTE: Aquí se debería hashear la contraseña antes de guardarla.
		// Ejemplo con una librería como bcrypt:
		// const hashedPassword = await bcrypt.hash(req.body.password, 10);
		// Si no lo hay, creamos un usuario con la info mandada en la petición, un array vacío de excursiones y un id
		const user = {
			...req.body,
			// password: hashedPassword, // Se guardaría la contraseña hasheada
			excursions: [],
			id: counter,
		};
		// Y después se añade al array de usuarios
		users.push(user);
		// Se prepara la respuesta sin la contraseña por seguridad
		const { password, ...userResponse } = user;
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
		res.json(userResponse);
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
			// Se manda al cliente el usuario actualizado (sin la contraseña)
			const { password, ...userResponse } = currentUser;
			return res.status(200).json(userResponse);
		} catch (error) {
			console.error("Unexpected error in PUT /users/:mail:", error);
			return res.status(500).json({ error: "Internal Server Error occurred." });
		}
	}
);

/** GET para obtener las excursiones a las que un usuario se ha apuntado */
router.get(
	"/:mail/excursions",
	authenticateToken,
	authorizeUserModification,
	function (req, res, next) {
		// El correo del usuario ya ha sido validado por los middlewares
		const userMail = req.params.mail;
		// Se busca al usuario por su correo electrónico
		const user = users.find(
			(u) => u.mail.toLowerCase() === userMail.toLowerCase()
		);

		// Aunque el middleware ya protege, esta es una comprobación de seguridad adicional
		if (!user) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}

		// Si el usuario no tiene excursiones, se devuelve un array vacío para evitar trabajo innecesario
		if (!user.excursions || user.excursions.length === 0) {
			return res.json([]);
		}

		// Se filtran las excursiones para obtener solo aquellas a las que el usuario está apuntado
		const userExcursions = excursions.filter((excursion) =>
			user.excursions.includes(excursion.id)
		);

		// Se retornan las excursiones del usuario en formato JSON
		res.json(userExcursions);
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
			// Se retorna el usuario actualizado sin la contraseña
			const { password, ...userResponse } = currentUser;
			res.status(200).json(userResponse);
		} catch (error) {
			console.error(
				"Unexpected error in PUT /users/:mail/excursions/:id:",
				error
			);
			return res.status(500).json({ error: "Internal Server Error occurred." });
		}
	}
);

module.exports = router;
