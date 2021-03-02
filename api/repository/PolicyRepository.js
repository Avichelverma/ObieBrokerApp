const db = require('../models/index');

class PolicyRepository {
	constructor() {}

	findByName(name) {
		return db.Policy.findOne({ name: name });
	}
}

module.exports = PolicyRepository;
