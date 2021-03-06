const axios = require('axios');
const config = require('../app-config');

// calculate distance using custom function instead of GeoPoint
module.exports.distance= async (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

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
    const d = await this.distance(location.latitude, location.longitude, u.latitude, u.longitude, 'M');
    if (d <= radius) {
        usersWithInRadius.push(u);
    }
  });

  return new Promise((resolve) => {
    resolve(usersWithInRadius);
  });
};