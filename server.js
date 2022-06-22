const express = require("express");

const { animals } = require("./data/animals.json");
console.log(animals);

const app = express();

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // Save peronalityTraits as a dedicated array
        // If personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filteredResults array
            // Remember, it is initially a copy of the animals array
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
        });
    }

    if (query.diet) {
        filteredResults = fileterdResults.filter(animal => animal.diet === query.diet);
    }

    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    return filteredResults;
}

app.get("/api/animals", (req, res) => {
    
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    //console.log(req.query)
    res.json(results);

});

app.listen(3001, () => {
    console.log("API Server now on port 3001");
});