const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const { app } = require('../src/index');

chai.use(chaiHttp);
describe('dwp test app home', () => {

  describe('GET users/london', () => {
    it('returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London ', () => {
      // mock expected result
      const expected = JSON.parse(fs.readFileSync(`${__dirname}/json/cityofLondon.json`));
       chai.request(app)
        .get('/users/london')
        .end((err, res) => {
          // Assert
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.eql(expected);
          done();
        });
    });
  });
  // all users

  describe('GET /users', () => {
      it('returns all users', () => {
        // mock expected result
        const expected = JSON.parse(fs.readFileSync(`${__dirname}/json/allUsers.json`));
         chai.request(app)
          .get('/users')
          .end((err, res) => {
            // Assert
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.eql(expected);
            done();
          });
      });
    });

    // users in london city
    describe('GET /users', () => {
          it('returns all users by city', () => {
            // mock expected result
            const expected = JSON.parse(fs.readFileSync(`${__dirname}/json/cityUser.json`));
             chai.request(app)
              .get('/users/city/london')
              .end((err, res) => {
                // Assert
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.eql(expected);
                done();
              });
          });
        });


});