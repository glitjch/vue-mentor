const requestsActions = {
  saveRequest(context, payload) {
    const request = {
      id: new Date().toISOString(),
      mentorId: payload.mentorId,
      userEmail: payload.email,
      message: payload.message,
      date: payload.date,
    };

    context.commit('saveRequest', request)
  },
};

export default requestsActions;
