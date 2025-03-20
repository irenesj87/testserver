const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const excursions = require('../data/excursionsData');

/** GET */
router.get('/', function (req, res, next) {

    // Variable that has the search info from the searchbar
    const search = req.query["q"] || "";
    // Variable that has the search info from the area filter
    const area = req.query["area"] || "";
    // Variable that has the search info from difficulty
    const difficulty = req.query["difficulty"] || "";
    // Variable that has the search info from the time filter
    const time = req.query["time"] || "";

    // Setting the headers to be able to send petitions from any domain
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Copy variable of the excursions array, we use this to not change the info in the excursions array 
    let excursionsCopy = [...excursions];

    // If the user has searched something on the search bar
    if (search !== "") {

        excursionsCopy = excursionsCopy.filter(excursion => (excursion.name).toLowerCase() == search.toLowerCase());

    }
    // If the user has searched something with the area filter
    if (area != "") {

        const areaFiltersResults = area.split(',').map(i => i.trim().toLowerCase());
        excursionsCopy = excursionsCopy.filter(excursion => areaFiltersResults.includes(excursion.area.toLowerCase()))

    }
    // If the user has searched something with the difficulty filter
    if (difficulty != "") {

        const difficultyFiltersResults = difficulty.split(',').map(i => i.trim().toLowerCase());
        excursionsCopy = excursionsCopy.filter(excursion => difficultyFiltersResults.includes(excursion.difficulty.toLowerCase()))

    }
    // If the user has searched something with the time filter
    if (time != "") {

        const timeFiltersResults = time.split(',').map(i => i.trim().toLowerCase());
        excursionsCopy = excursionsCopy.filter(excursion => timeFiltersResults.includes(excursion.time.toLowerCase()))

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