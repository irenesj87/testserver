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
		difficulty: "Media",
		time: "3 días",
		description:
			"En esta excursión iremos hasta Vegarredonda y el mirador de Ordiales.",
	},
];

module.exports = excursions;
