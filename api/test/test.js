const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Policy API', () => {
	/**
     * Test GET route
     */
	describe('GET /api/search', () => {
		it('It should GET list of carrier name', (done) => {
			chai.request(server).get('/api/search?name=state_apt&state=CA').end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('success').eq(true);
				response.body.should.have.property('body').be.a('array');
				done();
			});
		});
	});
});
