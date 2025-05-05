const tokens = require("../data/tokensData");

// Función que dice si el token es válido. Un token es válido cuando está en nuestra basde datos, en este caso en el array "tokens"
const validToken = (authorizationString) => {
	return authorizationString in tokens;
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
