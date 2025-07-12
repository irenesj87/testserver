/* Array de excursiones */
// const con arrays (u objetos) significa que la referencia al array no puede cambiar, pero el contenido del array sí puede
// cambiar. Puedes añadir, eliminar o modificar elementos dentro de un array declarado con const.
const excursions = [
	{
		id: 0,
		name: "Cangas de Onís",
		area: "Centro-Este",
		difficulty: "Baja",
		time: "6 horas",
		description:
			"En Cangas, iremos a ver el puente romano y haremos una ruta por sus iglesias.",
	},
	{
		id: 1,
		name: "Picos de Europa",
		area: "Este",
		difficulty: "Media",
		time: "2 días",
		description:
			"Los Picos de Europa son un parque muy extenso, así que en esta visita iremos a Los Lagos (llevando el itineriario corto) y también pasaremos a ver algo de la ruta del Cares.",
	},
	{
		id: 2,
		name: "Picos de Europa",
		area: "Este",
		difficulty: "Alta",
		time: "3 días",
		description: "De nuevo volvemos hasta este bonito paraje con la excursión más larga que se ha hecho hasta este momento. En esta excursión iremos hasta la hermosa zona de Vegarredonda.",
	},
	{
		id: 3,
		name: "Picos de Europa",
		area: "Centro",
		difficulty: "Alta",
		time: "3 días",
		description:"Descripción de la excursión."
	},
];

module.exports = excursions;
