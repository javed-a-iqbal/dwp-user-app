const axios = require('axios');
const GeoPoint = require('geopoint');
const config = require('../app-config');



module.exports.findDistanceBetween = async (l1, l2) => {
try{
  const p1 = new GeoPoint(l1.latitude, l1.longitude);
  const p2 = new GeoPoint(l2.latitude, l2.longitude);

  return p1.distanceTo(p2, false);
  } catch(e) {
      console.log('Error caught'+e);
    }
};


module.exports.getUsersByCityName = async (cityName) => new Promise((resolve, reject) => {
  axios.get(`${config.url}/city/${cityName}/users`).then((response) => {
    resolve(response.data);
  })
    .catch((error) => {
      reject(error);
    });
});


module.exports.getAllUsers = async () => new Promise((resolve, reject) => {
  axios.get(`${config.url}/users`).then((response) => {
    resolve(response.data);
  })
    .catch((error) => {
      reject(error);
    });
});

module.exports.getUsersCoordinatesIn50miles = async (location, radius) => {
  const urs = await this.getAllUsers();
  const usersWithInRadius = [];

  urs.forEach(async (u) => {
    const d = await this.findDistanceBetween(location, u);
    if (d <= radius) {
      usersWithInRadius.push(u);
    }
  });

  return new Promise((resolve) => {
    resolve(usersWithInRadius);
  });
};