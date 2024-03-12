export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
		state.email = payload.email;
	},
	logout(state) {
		state.token = null;
		state.userId = null;
		state.email = null;
	},
};
