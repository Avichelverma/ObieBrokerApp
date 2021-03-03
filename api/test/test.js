const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Policy API', () => {
	/**
     * Test GET search route with one success and two error scenarios
     */
	describe('GET /api/search', () => {
		it('It should GET list of carrier name', (done) => {
			chai.request(server).get('/api/search?name=fire&state=IL').end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('success').eq(true);
				response.body.should.have.property('carriers').be.a('array');
				done();
			});
		});

		it('GET Bad Request, Invalid Policy', (done) => {
			chai.request(server).get('/api/search?name=xyz&state=CA').end((err, response) => {
				response.should.have.status(400);
				response.body.should.be.a('object');
				response.body.should.have.property('success').eq(false);
				response.body.should.have.property('message').be.eq('Invalid Policy Type');
				done();
			});
		});

		it('GET Bad Request, Invalid State', (done) => {
			chai.request(server).get('/api/search?name=fire&state=ZX').end((err, response) => {
				response.should.have.status(400);
				response.body.should.be.a('object');
				response.body.should.have.property('success').eq(false);
				response.body.should.have.property('message').be.eq('Invalid State');
				done();
			});
		});
	});
});
