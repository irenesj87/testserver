/* Array de usuarios */
const users = [
	{
		id: 0,
		name: "usuario1",
		surname: "apellidosUsuario1",
		phone: "678956453",
		mail: "usuario1@mail.com",
		// Este hash corresponde a la contraseña 123456qw. hasheada con bcrypt
		password: "$2b$10$CaPSYdsYoByY0Xt.AUozOeNGPwpY2PPPBO3BFhRVfbXKhv7OZYNCS",
		excursions: [],
	},
	{
		id: 1,
		name: "usuario2",
		surname: "apellidosUsuario2",
		phone: "680152657",
		mail: "usuario2@mail.com",
		// Este hash corresponde a la contraseña 123456qr. hasheada con bcrypt
		password: "$2b$10$JW1bDPLP1/F6kkz84wxKWulWXlPfL6bywYRxwhQSnyZpBl7FM16zm",
		excursions: [],
	},
];

module.exports = users;
