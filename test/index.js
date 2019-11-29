const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const { app } = require('../src/index');

chai.use(chaiHttp);
describe('dwp test app home', () => {
  describe('GET users/london', () => {
    it('Should respond with people who are listed as living in London', () => {
      // Arrange
      const expected = JSON.parse(fs.readFileSync(`${__dirname}/json/cityofLondon.json`));
      // Act
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
});