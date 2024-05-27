const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const data = (fs.readFileSync('./resources/cymbalsLatest.json')).toString();
const jsonData = JSON.parse(data);
const cymbalData = [...jsonData.cymbals];

app.use(express.static(__dirname));
app.use(express.json());


app.post('/filter', (req, res) => {
    const { brightness, dryness, definition, sustain, thickness, bellWidth, complexity, holes, effect, size} = req.body;

    const filteredData = applyFilters({brightness, dryness, definition, sustain, thickness,
        bellWidth, complexity, holes, effect, size});
    res.json(filteredData);
});

function applyFilters(filters) {

    const { brightness, dryness, definition, sustain, thickness, bellWidth, complexity, holes, effect, size} = filters;

    const filteredData = cymbalData.filter(item => {
        const matchesBrightness = (item.Brightness !== undefined && item.Brightness === brightness) || brightness === 0;
        const matchesDryness = (item.Dryness !== undefined && item.Dryness === dryness) || dryness === 0;
        const matchesDefinition = (item.Definitie !== undefined && item.Definitie === definition) || definition === 0;
        const matchesSustain = (item.Sustain !== undefined && item.Sustain === sustain) || sustain === 0;
        const matchesThickness = (item.Dikte !== undefined && item.Dikte === thickness) || thickness === 0;
        const matchesBellWidth = (item.Belbreedte !== undefined && item.Belbreedte === bellWidth) || bellWidth === 0;
        const matchesComplexity = (item.Complexiteit !== undefined && item.Complexiteit === complexity) || complexity === 0;
        const matchesHoles = (item.Gaten !== undefined && item.Gaten === holes);
        const matchesEffect = (item.Effectcymbaal !== undefined && item.Effectcymbaal === effect);
        const matchesSize = (item.hasOwnProperty(size)) || size === "0";

        return matchesBrightness && matchesDryness && matchesDefinition &&
            matchesSustain && matchesThickness && matchesBellWidth &&
            matchesComplexity && matchesHoles && matchesEffect && matchesSize;
    });

    return filteredData;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});