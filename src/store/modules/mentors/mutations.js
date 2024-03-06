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
  changeTest(state, payload) {
    state.someValue = payload;
    return state.testData;
	},
};

export default mentorMutations;
