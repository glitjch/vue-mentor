const mentorMutations = {
	registerMentor(state, mentor) {
    return state.mentors.push(mentor);
	},
};

export default mentorMutations;
