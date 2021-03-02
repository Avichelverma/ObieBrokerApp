const PolicyService = require('../services/PolicyService');

const policyServiceInst = new PolicyService();

exports.searchPolicy = async function(req, res) {
	try {
		console.log(req.query);
		const result = await policyServiceInst.searchByPolicy(req.query);
		return res.status(200).send(result);
	} catch (err) {
		res.status(400).send(err);
	}
};
