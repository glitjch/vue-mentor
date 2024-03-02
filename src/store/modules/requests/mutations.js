const requestsMutations = {
	saveRequest(state, payload) {
		return state.requests.push(payload);
	},
  importRequest(state, payload) {
    console.log('mutat')
		for (const request of payload) {
			state.requests.unshift(request);
		}
	},
};

export default requestsMutations;
