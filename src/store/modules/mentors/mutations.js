const mentorMutations = {
	registerMentor(state, mentor) {
		return state.mentors.push(mentor);
	},
  setMentors(state, payload) {
		state.mentors = payload;
	},
  setFetchTimeStamp(state) {
		state.lastFetch = new Date().getTime();
	},
};

export default mentorMutations;
