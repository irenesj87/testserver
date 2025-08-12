const express = require("express");
const router = express.Router();
const tokens = require("../data/tokensData");
const { authenticateToken } = require("../authMiddleware");

/** LOGOUT */
// Usamos el middleware para validar el token antes de proceder.
router.delete("/", authenticateToken, function (req, res) {
	// Gracias al middleware, sabemos que req.token existe y es válido.
	delete tokens[req.token];
	// Es una buena práctica responder con 204 No Content a un DELETE exitoso.
	res.status(204).send();
});

module.exports = router;
