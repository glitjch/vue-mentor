const requestsGetters = {
  requests(state) {
    return state.requests;
  },
  hasRequests(state, mentorId) {
    const requests = state.requests.filter(request => request.mentorId === mentorId);
    return requests && requests.length > 0;
  }
}

export default requestsGetters;