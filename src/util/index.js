const axios = require('axios');
const GeoPoint = require('geopoint');
const config = require('../app-config');



module.exports.getDistanceBetween = async (l1, l2) => {
  const p1 = new GeoPoint(l1.latitude, l1.longitude);
  const p2 = new GeoPoint(l2.latitude, l2.longitude);

  return p1.distanceTo(p1, false);
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