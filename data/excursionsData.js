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
	},
	{
		id: 1,
		name: "Picos de Europa",
		area: "Este",
		difficulty: "Media",
		time: "2 días",
	},
	{
		id: 2,
		name: "Picos de Europa",
		area: "Este",
		difficulty: "Alta",
		time: "3 días",
	},
	{
		id: 3,
		name: "Picos de Europa",
		area: "Centro",
		difficulty: "Alta",
		time: "3 días",
	},
	{
		id: 4,
		name: "Excursión",
		area: "Este",
		difficulty: "Alta",
		time: "1 día",
	},
];

module.exports = excursions;
