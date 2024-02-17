const requestsMutations = {
  saveRequest(state, payload) {
    return state.requests.push(payload);
  }
}

export default requestsMutations;