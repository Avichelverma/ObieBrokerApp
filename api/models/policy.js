const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	state_carrier: {}
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;
