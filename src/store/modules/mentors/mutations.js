const mentorMutations = {
	registerMentor(state, mentor) {
    return state.mentors.push(mentor);
  },
  setMentors(state, payload) {
    state.mentors = payload;
  } 
};

export default mentorMutations;
