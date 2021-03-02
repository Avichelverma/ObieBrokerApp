import http from './http-common';

class PolicyAPI {
	searchPolicy(data) {
		return http.get('/search', { params: data });
	}
}

export default new PolicyAPI();
