export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
		state.tokenExpiration = payload.tokenExpiration;
		state.email = payload.email;
	},
	logOut(state) {
		state.token = null;
		state.userId = null;
		state.tokenExpiration = null;
		state.email = null;
	},
};
