const mentorsGetters = {
	mentors(state) {
		return state.mentors;
	},
	hasMentors(state) {
		return state.mentors && state.mentors.length > 0;
	},
	isMentor(_state, getters, _rootState, rootGetters) {
		const mentors = getters.mentors;
		const userId = rootGetters.userId;
		return mentors.some((mentor) => mentor.id === userId);
	},
  lastFetch(state) {
    return state.lastFetch;
  },
};

export default mentorsGetters;
