const db = require('../models/index');
const PolicyRepository = require('../repository/PolicyRepository');

class PostService {
	constructor() {
		this.repo = new PolicyRepository();
	}

	async searchByPolicy(query) {
		try {
			const { name, state } = query;
			if (name === 'both') {
				const firePolicyCollection = await this.repo.findByName('fire');
				const autoPolicyCollection = await this.repo.findByName('auto');
				const fireCarrierList = firePolicyCollection.state_carrier[state];
				const autoCarrierList = autoPolicyCollection.state_carrier[state];
				const carrierList = fireCarrierList.filter((value) => autoCarrierList.includes(value));
				return { success: true, body: carrierList };
			}
			const policyCollection = await this.repo.findByName(name);
			const carrierList = policyCollection.state_carrier[state];
			return { success: true, body: carrierList };
		} catch (err) {
			return { success: false, error: err };
		}
	}
}

module.exports = PostService;
