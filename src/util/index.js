const axios = require('axios');
const GeoPoint = require('geopoint');
const config = require('../app-config');


// calculate distance using GeoPoint
module.exports.findDistanceBetween = async (l1, l2) => {
try{
  const p1 = new GeoPoint(l1.latitude, l1.longitude);
  const p2 = new GeoPoint(l2.latitude, l2.longitude);

  return p1.distanceTo(p2, false);
  } catch(e) {
      console.log('Error caught'+e);
    }
};

// calculate distance using custom function, we will use this function in our final solution
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
        //console.log(" d< 50***********************"+d)
        usersWithInRadius.push(u);
    }
  });

  return new Promise((resolve) => {
    resolve(usersWithInRadius);
  });
};