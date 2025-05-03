const express = require("express");
const router = express.Router();
const filtersData = require("../data/excursionsData");

/** GET */
// http://localhost:3001/filters?type=area
// http://localhost:3001/filters?type=difficulty
// http://localhost:3001/filters?type=time
router.get("/", function (req, res, next) {
	// Array que guarda la info de los filtros
	let arrayResult = [];
	// Copia de arrayResult que se usa para copiar la información de arrayResult
	let arrayResultCopy = [];
	// Variable que tiene el tipo de filtro que se necesita en ese momento
	const filter = req.query["type"] || "";

	// Si el filtro es area, difficulty o time entonces
	if (["area", "difficulty", "time"].includes(filter)) {
		// Se guardan los filtros correctos en arrayResult
		arrayResult = filtersData.map(function (excursion) {
			switch (filter) {
				case "area":
					if (!arrayResult.includes(excursion.area))
						arrayResult.push(excursion.area);
					break;
				case "difficulty":
					if (!arrayResult.includes(excursion.difficulty))
						arrayResult.push(excursion.difficulty);
					break;
				case "time":
					if (!arrayResult.includes(excursion.time))
						arrayResult.push(excursion.time);
			}
			// Después esto se copia en arrayResultCopy para no perder la información que arrayResult tenía
			arrayResultCopy = arrayResult.valueOf();
		});

		res.status(200).json(arrayResultCopy);
	} else {
		res.status(400).json({ error: "Petición incorrecta al servidor" });
	}
});

/** OPTIONS */
router.options("/", function (req, res) {
	res.status(200);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
	res.send();
});

module.exports = router;
