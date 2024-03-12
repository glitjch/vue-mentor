const requestsActions = {
	async saveRequest(context, payload) {
		console.log('save request actions');

		const request = {
			userEmail: payload.email,
			message: payload.message,
			date: payload.date,
		};

		const response = await fetch(
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/requests/${payload.mentorId}.json`,
			{
				method: 'POST',
				body: JSON.stringify({
					...request,
				}),
			}
		);

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.error || 'failed to send request');
			throw error;
		}

    request.id = responseData.name;
    request.mentorId = payload.mentorId;

		context.commit('saveRequest', request);
	},
	async loadRequests(context) {
		const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

		const response = await fetch(
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
    );
    
    const responseData = await response.json();
    
    if (!response.ok) {
			const error = new Error(responseData.error || 'failed to fetch request');
			throw error;
		}
		const requests = [];
		for (const key in responseData) {
			const { date, message, userEmail } =
				responseData[key];
			const request = {
				id: key,
        mentorId: userId,
				date,
				message,
				userEmail,
			};
			requests.push(request);
		}

		context.commit('importRequest', requests);
		return requests;
	},
};

export default requestsActions;
