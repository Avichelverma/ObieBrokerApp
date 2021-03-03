const db = require('../models/index');

/**
 * @description Data Access layer to Policy Model
 */
class PolicyRepository {
	constructor() {}

	findByName(name) {
		return db.Policy.findOne({ name: name });
	}
}

module.exports = PolicyRepository;
