const requestsActions = {
	async saveRequest(context, payload) {
		const requestId = Math.floor(Math.random() * 100)    ;
		const request = {
			id: requestId,
			mentorId: payload.mentorId,
			userEmail: payload.email,
			message: payload.message,
			date: payload.date,
		};

		const response = await fetch(
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/mentors/${payload.mentorId}/requests/${requestId}.json`,
			{
				method: 'PUT',
				body: JSON.stringify({
					...request,
				}),
			}
    );
    
    if (response.ok) {
      console.log('it is okay')
    }
		context.commit('saveRequest', request);
	},
  async loadRequests(context) {
      const userId = context.rootGetters['userId'];
    const response = await fetch(`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/mentors/${userId}/requests/.json`);

    if (!response.ok) {
      console.log(response)
    }

    const responseData = await response.json();
    const requests = [];
    for (const requestId in responseData) {
      const { date, id, mentorId, message, userEmail } = responseData[requestId];
      const requestDto = {
        id,
        date,
        mentorId,
        message,
        userEmail,
      }
      requests.push(requestDto)
    }

    context.commit('importRequest', requests)
    return requests;
  },
};

export default requestsActions;
