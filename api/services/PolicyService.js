const db = require('../models/index');
const PolicyRepository = require('../repository/PolicyRepository');

class PostService {
	/**
	 * @description Creates an instance of Data Access layer using the desired repository
	 */
	constructor() {
		this.repo = new PolicyRepository();
	}

	/**
	 * @description Attempts to fetch the carrier list with the provided query object
	 * @param {*} query Object containing the policy name and stateAbbv to search the collection
	 * @returns {Object{success: boolean, carrier:[]} || Object{success: boolean, message:*}}
	 */
	async searchByPolicy(query) {
		try {
			const { name, state } = query;
			if (name === 'fire' || name === 'auto' || name === 'both' || name === 'state_apt') {
				if (name === 'both') {
					const firePolicyCollection = await this.repo.findByName('fire');
					const autoPolicyCollection = await this.repo.findByName('auto');
					const fireCarrierList = firePolicyCollection.state_carrier[state];
					const autoCarrierList = autoPolicyCollection.state_carrier[state];
					const carrierList = fireCarrierList.filter((value) => autoCarrierList.includes(value));
					return { success: true, carriers: carrierList };
				}
				const policyCollection = await this.repo.findByName(name);
				if (state in policyCollection.state_carrier) {
					const carrierList = policyCollection.state_carrier[state];
					return { success: true, carriers: carrierList };
				} else {
					throw 'Invalid State';
				}
			} else {
				throw 'Invalid Policy Type';
			}
		} catch (err) {
			throw { success: false, message: err };
		}
	}
}

module.exports = PostService;
