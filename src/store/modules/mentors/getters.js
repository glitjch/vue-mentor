const mentorsGetters = {
  mentors(state) {
    return state.mentors;
  },
  hasMentors(state) {
    return state.mentors && state.mentors.length > 0;
  }
}

export default mentorsGetters;