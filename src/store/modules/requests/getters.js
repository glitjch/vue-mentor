const requestsGetters = {
  requests(state) {
    return state.requests;
  },
  hasRequests(state, mentorId) {
    const requests = state.requests.filter(request => request.mentorId === mentorId);
    return requests && requests.length > 0;
  },
  currentUserRequests(state, _getters, _rootState, rootGetters) {
    const userId = rootGetters.userId; 
    return state.requests.filter(request => request.mentorId === userId);
  },
}

export default requestsGetters;