const fs = require('fs');
const geojson = JSON.parse(fs.readFileSync('./metrolines.geojson','utf-8'));
const result = geojson.features.map(feature=>{
    return {
        coordinates: feature.geometry.coordinates[0],
        name: feature.properties.name
    }
});

fs.writeFileSync('metrolines.js','var metrolines = '+JSON.stringify(result))