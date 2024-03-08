export default {
		userId(state) {
			return state.userId;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
