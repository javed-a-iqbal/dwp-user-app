const express = require('express');
const util = require('../src/util');
const config = require('../src/app-config');



const app = express();
const port = 3000;
const location={ latitude: 51.50853, longitude: -0.12574 };;
const radius=50;

app.get('/users/london', async (req, res) => {
  const usersFromCityLondon = await util.getUsersByCityName('London');
  const coordinatesLondon = await users.getUsersNearLocation(location, radius);
  const result = _.union(usersFromCityLondon, coordinatesLondon);

  return res.json(result);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports.app = app;
