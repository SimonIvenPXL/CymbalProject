const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const data = (fs.readFileSync('./resources/cymbals.json')).toString();
const jsonData = JSON.parse(data);
const cymbalData = [...jsonData.cymbals];
console.log(cymbalData);

app.post('/filter', (req, res) => {
    const { brightness, dryness, definition, sustain, thickness, bellWidth } = req.body;

    const filteredData = applyFilters({brightness, dryness, definition, sustain, thickness, bellWidth});
    res.json(filteredData);
});

function applyFilters(filters) {
    let filteredData = cymbalData;

    if (filters.brightness) {
        filteredData = filteredData.filter(item => item.Brightness >= filters.brightness[0] && item.Brightness <= filters.brightness[1]);
    }
    if (filters.dryness) {
        filteredData = filteredData.filter(item => item.Dryness >= filters.dryness[0] && item.Dryness <= filters.dryness[1]);
    }
    if (filters.definition) {
        filteredData = filteredData.filter(item => item.Definitie >= filters.definition[0] && item.Definitie <= filters.definition[1]);
    }
    if (filters.sustain) {
        filteredData = filteredData.filter(item => item.Sustain >= filters.sustain[0] && item.Sustain <= filters.sustain[1]);
    }
    if (filters.thickness) {
        filteredData = filteredData.filter(item => item.Dikte >= filters.thickness[0] && item.Dikte <= filters.thickness[1]);
    }
    if (filters.bellWidth) {
        filteredData = filteredData.filter(item => item.Belbreedte >= filters.bellWidth[0] && item.Belbreedte <= filters.bellWidth[1]);
    }
    return filteredData;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});