const PolicyService = require('../services/PolicyService');

const policyServiceInst = new PolicyService();

/**
 * @description Search the Policy collection and returns list of carriers
 * @param req {Object} request params holds query object with properties of name and state
 * @param res {Object} response returns object with property of success and carrier
 */

exports.searchPolicy = async function(req, res) {
	try {
		// We only pass the request query object
		const result = await policyServiceInst.searchByPolicy(req.query);
		return res.status(200).send(result);
	} catch (err) {
		res.status(400).send(err);
	}
};
