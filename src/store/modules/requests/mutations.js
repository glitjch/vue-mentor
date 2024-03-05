const requestsMutations = {
	saveRequest(state, payload) {
		return state.requests.push(payload);
	},
  importRequest(state, payload) {
			state.requests = payload;
	},
};

export default requestsMutations;
