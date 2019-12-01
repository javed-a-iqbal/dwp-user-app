const express = require('express');
const util = require('../src/util');
const config = require('../src/app-config');

const app = express();

app.get('/users/london', async (req, res) => {
   const usersFromCityLondon = await util.getUsersByCityName('London');
   const coordinatesLondon = await util.getUsersCoordinatesIn50miles(config.coordinateRange, config.radius);

   //  remove duplicate after combining two arrays
   var c = usersFromCityLondon.concat(coordinatesLondon)
   var result = c.filter((item, pos) => c.indexOf(item) === pos)

  return res.json(result);
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}!!`));

module.exports.app = app;
