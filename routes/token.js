const express = require("express");
const router = express.Router();
const users = require("../data/usersData");
const { authenticateToken } = require("../authMiddleware");

/**
 * @fileoverview Rutas para la gestión de tokens de autenticación.
 * Proporciona un endpoint para verificar la validez de un token y obtener los datos del usuario asociado.
 */

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

module.exports = router;
