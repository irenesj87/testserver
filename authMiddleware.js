const tokens = require("./data/tokensData");
const { validToken } = require("./helpers/helpers");

/**
 * Middleware para validar el token de autenticación.
 * Este middleware asegura que la petición tiene una cabecera de autorización válida
 * y que el token existe en nuestra base de datos de tokens.
 * Si es válido, adjunta el token y el email del usuario a la request.
 */
const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader?.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ error: "Cabecera de autorización no encontrada o inválida." });
		}

		const tokenString = authHeader.substring("Bearer ".length);
		const currentToken = validToken(tokenString);

		if (!currentToken) {
			return res.status(401).json({ error: "Token inválido o expirado." });
		}

		req.token = currentToken;
		// Adjuntamos también el email asociado para que esté disponible en las rutas.
		req.tokenEmail = tokens[currentToken];
		next();
	} catch (error) {
		console.error("Error en el middleware de autenticación:", error);
		return res
			.status(500)
			.json({ error: "Error del servidor durante la autenticación." });
	}
};

module.exports = { authenticateToken };