# DWP-user-app

### Overview of the App
An API which calls https://bpdts-test-app.herokuapp.com/, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.


## Dependencies
 - Express
 - Nodemon (installed globally)
 - Mocha
 - Chai
 - Chai-http
 - Nock
 - Axios

## How to Run  app Locally

clone the app

Setup
```
npm install
```
Run
```
node src/index.js
```

### How to Call API

```
localhost:3000/users/london

returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

```
localhost:3000/users        (for all users)
```

localhost:3000/users/city/london

return user in london city only
```

## Testing
Run
```
npm test
```
