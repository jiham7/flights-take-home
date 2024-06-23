const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());


function findFlightPath(flights) {
    let flightMap = new Map();
    let start = null;
    let end = null;
    flights.forEach(flight => {
        if (flightMap.has(flight[0])) {
            flightMap.set(flight[0], flightMap.get(flight[0]) + 1);
        } else {
            flightMap.set(flight[0], 1);
        }

        if (flightMap.has(flight[1])) {
            flightMap.set(flight[1], flightMap.get(flight[1]) - 1);
        } else {
            flightMap.set(flight[1], -1);
        }
    });

    // check to see which airports have +1 and -1, which are start and end points
    for (let key of flightMap.keys()) {
        if (flightMap.get(key) === 1) {
            if (start !== null) {
                return []
                //{ error: 'Invalid input format. Expected only one starting airport.' };
            }
            else {
                start = key;
            }
        } else if (flightMap.get(key) === -1) {
            if (end !== null) {
                return []
                //{ error: 'Invalid input format. Expected only one destination airport.' };
            }
            else {
                end = key;
            }
        }
    }

    if (start === null || end === null) {
        return []
        //{ error: 'Invalid input format. Expected one starting and one destination airport.' };
    }
    return [start, end];
}

app.post('/calculate', (req, res) => {
    const flights = req.body.flights;
    
    if (!Array.isArray(flights)) {
        return res.status(400).json({ error: 'Invalid input format. Expected an array of flights.' });
    }

    const flightPath = findFlightPath(flights);
    if (flightPath == []) {
        return res.status(400).json(flightPath);
    }
    
    res.json({ flightPath });
});

app.listen(port, () => {
    console.log(`Flight path tracker microservice listening on port ${port}`);
});
