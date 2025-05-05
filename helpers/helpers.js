const tokens = require("../data/tokensData");

// Función que valida un token. Retorna el token string si es válido (existe en tokensData), o null si no es válido.
const validToken = (authorizationString) => {
	if (authorizationString && authorizationString in tokens) {
		return authorizationString;
	}
	return null;
};

// Función que genera un token con 40 letras y números aleatorios
const generateToken = () => {
	const avalaibleChars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const length = 40;
	let token = "";

	for (let i = 0; i < length; i++) {
		token += avalaibleChars.charAt(
			Math.floor(Math.random() * avalaibleChars.length)
		);
	}
	return token;
};

module.exports = {
	validToken,
	generateToken,
};
