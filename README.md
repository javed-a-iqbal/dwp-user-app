# dwp-user-app

I have defined following three routes.
1 http://localhost:3000/users/   for all users.
2 http://localhost:3000/users/london   users in the london city or 50 miles in london.
3 http://localhost:3000/users/city/london  for city london only users.

I used the following dependencies with globally installed nodemon.
    "axios": "^0.19.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "express": "^4.17.1",
    "geopoint": "^1.0.1",
    "mocha": "^6.2.2"


npm test

nodemon src/index.js
