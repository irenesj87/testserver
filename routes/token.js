const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const tokens = require("../data/tokensData");
const { validToken } = require("../helpers/helpers");

/**
 * @fileoverview Rutas para la gestión de tokens de autenticación.
 * Proporciona un endpoint para verificar la validez de un token y obtener los datos del usuario asociado.
 */
const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader?.startsWith("Bearer ")) {
			return res.status(401).json({
				message: "Cabecera de autorización no encontrada o inválida.",
			});
		}

		const tokenString = authHeader.substring("Bearer ".length);
		const currentToken = validToken(tokenString);

		if (!currentToken) {
			return res.status(401).json({ message: "Token inválido o expirado." });
		}

		req.token = currentToken;
		req.tokenEmail = tokens[currentToken];
		next();
	} catch (error) {
		console.error("Error en el middleware de autenticación:", error);
		return res
			.status(500)
			.json({ message: "Error del servidor durante la autenticación." });
	}
};

/**
 * GET /token/verify
 * Verifica el token proporcionado en la cabecera y retorna los datos del usuario.
 * Utiliza el middleware `authenticateToken` para validar el token antes de procesar la solicitud.
 */
router.get("/verify", authenticateToken, (req, res) => {
	// Si el middleware 'authenticateToken' pasa, el token es válido.
	// El correo del usuario ya está en req.tokenEmail.
	const userMail = req.tokenEmail;
	const user = users.find(
		(u) => u.mail.toLowerCase() === userMail.toLowerCase()
	);

	if (!user) {
		return res
			.status(404)
			.json({ message: "Usuario asociado al token no encontrado." });
	}

	const { password, ...userResponse } = user;
	res.status(200).json({ user: userResponse, token: req.token });
});

/**
 * OPTIONS /
 * Maneja las solicitudes OPTIONS para pre-vuelo CORS.
 */
router.options("/", function (req, res) {
	res.status(200);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
	res.send();
});

module.exports = router;
