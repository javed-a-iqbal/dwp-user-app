const express = require('express');
const util = require('../src/util');
const config = require('../src/app-config');



const app = express();
const port = 3000;
const location={ latitude: 51.50853, longitude: -0.12574 };;
const radius=50;

app.get('/users/london', async (req, res) => {
  const usersFromCityLondon = await util.getUsersByCityName('London');
  const allUsers = await util.getAllUsers();


    const matched = [];
    allUsers.forEach(async (user) => {
      const between = await util.getDistanceBetween(location, user);
      if (between <= radius) {
        matched.push(user);
      }
    });


  return res.json(allUsers);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports.app = app;
