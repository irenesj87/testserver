const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const filtersData = require('../data/excursionsData');


/** GET */
// http://localhost:3001/filters?type=area
// http://localhost:3001/filters?type=difficulty
// http://localhost:3001/filters?type=time
router.get('/', function (req, res, next) {

    // Array that saves the filters info
    let arrayResult = [];
    // Copy array of arrayResult that is used to copy the information that arrayResult
    let arrayResultCopy = [];
    // Variable that has the type of filter that is needed in that moment
    const filter = req.query["type"] || "";

    // If filter is area, difficulty or time then
    if (["area", "difficulty", "time"].includes(filter)) {

        // We save the correct filters in the arrayResult
        arrayResult = filtersData.map(function (excursion) {
 
            switch (filter) {

                case 'area':
                    if (!arrayResult.includes(excursion.area))
                        arrayResult.push(excursion.area);
                    break;
                case 'difficulty':
                    if (!arrayResult.includes(excursion.difficulty))
                        arrayResult.push(excursion.difficulty);
                    break;
                case 'time':
                    if (!arrayResult.includes(excursion.time))
                        arrayResult.push(excursion.time);

            }
            // Then we copy the array to arrayResultCopy to not lose the info that arrayResult had
            arrayResultCopy = arrayResult.valueOf();
        });

        res.status(200).json(arrayResultCopy);

    }
    else {

        res.status(400).json({ error: "Petición incorrecta al servidor" });

    }
})

/** OPTIONS */
router.options('/', function (req, res) {

    res.status(200);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
    res.send();

}
);

module.exports = router;