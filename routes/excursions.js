const express = require("express");
const router = express.Router();
const excursions = require("../data/excursionsData");

/** GET */
router.get("/", function (req, res, next) {
	/* req.query: En Express.js, req representa la petición HTTP. Es una propiedad de este objeto que tiene cualquier
     parámetro enviado en la URL. Por ejemplo, si alguien accede a /excursions?q=hiking&difficulty=easy, entonces
     req.query será { q:'hiking', difficulty:'easy' }. Se utiliza la letra 'q' porque viene de query, normalmente los desarrolladores urilizan esa letra
	 cuando se hacen búsquedas */
	// || "" : Esto se utiliza para dar un valor por defecto
	/* Variable que guarda el valor del parámetro 'q' de la petición HTTP. Si 'q' existe, su valor se guarda en 'search'. 
    Si el parámetro 'q' no existe, la variable guarda un string vacío. Esto previene errores y asegura que 'search' siempre
    tenga un string con el que trabajar */
	const search = req.query["q"] || "";
	// Variable que tiene la info del filtro 'area'
	const area = req.query["area"] || "";
	// Variable que tiene la info del filtro 'difficulty'
	const difficulty = req.query["difficulty"] || "";
	// // Variable que tiene la info del filtro 'time'
	const time = req.query["time"] || "";

	// Seteando las headers para poder mandar peticiones desde cualquier dominio
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Copy variable of the excursions array, we use this to not change the info in the excursions array
	let excursionsCopy = [...excursions];

	// Si el usuario ha buscado algo en la barra de búsqueda
	if (search !== "") {
		const searchLower = search.toLowerCase();
		excursionsCopy = excursionsCopy.filter((excursion) =>
			excursion.name.toLowerCase().includes(searchLower)
		);
	}
	// Si el usuario ha buscado algo con el filtro 'area'
	if (area != "") {
		const areaFiltersResults = area
			/* Este método toma el string 'area' y los separa en un array de substrings cada vez que encuentra una coma.
			Por ejemplo, "beach, mountain, forest" resulta en el array ["beach", "mountain", "forest"]. */
			.split(",")
			.map((i) => i.trim().toLowerCase());
		// Se retorna un array copia con todas las excursiones que tengan ese area
		excursionsCopy = excursionsCopy.filter((excursion) =>
			areaFiltersResults.includes(excursion.area.toLowerCase())
		);
	}
	//  Si el usuario ha buscado algo con el filtro 'difficulty'
	if (difficulty != "") {
		const difficultyFiltersResults = difficulty
			.split(",")
			.map((i) => i.trim().toLowerCase());
		// Se retorna un array copia con todas las excursiones que tengan esa dificultad
		excursionsCopy = excursionsCopy.filter((excursion) =>
			difficultyFiltersResults.includes(excursion.difficulty.toLowerCase())
		);
	}
	//  Si el usuario ha buscado algo con el filtro 'time'
	if (time != "") {
		const timeFiltersResults = time
			.split(",")
			.map((i) => i.trim().toLowerCase());
		// Se retorna un array copia con todas las excursiones que tengan ese tiempo
		excursionsCopy = excursionsCopy.filter((excursion) =>
			timeFiltersResults.includes(excursion.time.toLowerCase())
		);
	}

	res.status(200).json(excursionsCopy);
});

/** POST 
router.post('/', function (req, res) {

    var name = req.body.name || '';

    if (excursions.includes(name)) {

        res.status(409).json({ error: 'Ya existe una excursión con ese nombre.' });

    }
    else {

        excursions.push(name);
        res.status(201).setHeader('Location', `http://localhost:3001/excursions/${name}`);
        res.json({ name });

    }
}

);*/

module.exports = router;
