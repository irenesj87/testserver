const express = require("express");
const router = express.Router();
const excursions = require("../data/excursionsData");

/**
 * Función auxiliar para aplicar filtros. Ahora maneja tanto un string como un array de valores.
 * @param {Array} data - El array de excursiones a filtrar.
 * @param {string | string[]} filterValue - El valor del parámetro de la query (ej: "Centro" o ["Centro", "Este"]).
 * @param {string} property - La propiedad del objeto excursión a comparar (ej: "area").
 * @returns {Array} - El array de excursiones filtrado.
 */
const applyListFilter = (data, filterValue, property) => {
	let filterItems;

	// Si `filterValue` es un array (ej. ?area=A&area=B), lo usamos directamente.
	// Si es un string (ej. ?area=A,B), lo dividimos por comas.
	if (Array.isArray(filterValue)) {
		filterItems = filterValue.map((item) => item.trim().toLowerCase());
	} else {
		filterItems = filterValue
			.toString()
			.split(",")
			.map((item) => item.trim().toLowerCase());
	}

	// Si no hay items de filtro válidos después de limpiar, no se aplica ningún filtro y se retornan los datos originales...
	if (filterItems.length === 0) {
		return data;
	}
	// ...y si los hay, se filtran los datos retornando sólo aquellos cuya propiedad coincide con los items del filtro.
	return data.filter((excursion) =>
		filterItems.includes(excursion[property].toLowerCase())
	);
};

/** GET */
router.get("/", function (req, res, next) {
	/* req.query: En Express.js, req representa la petición HTTP. Es una propiedad de este objeto que tiene cualquier
     parámetro enviado en la URL. Por ejemplo, si alguien accede a /excursions?q=hiking&difficulty=easy, entonces
     req.query será { q:'hiking', difficulty:'easy' }. Se utiliza la letra 'q' porque viene de query, normalmente los desarrolladores 
	 utilizan esa letra cuando se hacen búsquedas */
	/* Variable que guarda el valor del parámetro 'q' de la petición HTTP. Si 'q' existe, su valor se guarda en 'search'.
	 * Si el parámetro 'q' no existe, la variable guarda un string vacío. Esto previene errores y asegura que 'search' siempre tenga un
	 * string con el que trabajar
	 */
	// Se extrae el parámetro de búsqueda 'q' y el resto de filtros en un objeto 'filters'
	const { q: search, ...filters } = req.query;

	// Seteando las headers para poder mandar peticiones desde cualquier dominio
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Copy variable of the excursions array, we use this to not change the info in the excursions array
	let excursionsCopy = [...excursions];

	// Si el usuario ha buscado algo en la barra de búsqueda
	if (search) {
		const searchLower = search.toString().toLowerCase();
		excursionsCopy = excursionsCopy.filter((excursion) =>
			excursion.name.toLowerCase().includes(searchLower)
		);
	}

	// Lista de propiedades por las que se puede filtrar
	const filterableProperties = ["area", "difficulty", "time"];

	// Se aplican todos los filtros que el usuario haya enviado en la URL de forma dinámica recorriendo la lista
	// Esta línea inicia un bucle que va a recorrer los elementos del array filterableProperties. En cada pasada la variable property
	// tomará un valor
	filterableProperties.forEach((property) => {
		// Se comprueba si el filtro existe
		if (filters[property]) {
			// Si existe, se aplica el filtro
			excursionsCopy = applyListFilter(
				excursionsCopy,
				filters[property],
				property
			);
		}
	});

	res.status(200).json(excursionsCopy);
});

module.exports = router;
