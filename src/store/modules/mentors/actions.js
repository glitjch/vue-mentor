const mentorsActions = {
	async registerMentor(context, payload) {
		const userId = context.rootGetters.userId;
		const mentor = {
			firstName: payload.first,
			lastName: payload.last,
			areas: payload.areas,
			description: payload.desc,
			hourlyRate: payload.rate,
		};

		const response = await fetch(
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/${userId}.json`,
			{
				method: 'PUT',
				body: JSON.stringify({
					...mentor,
					id: userId,
				}),
			}
		);

		if (!response.ok) {
			console.log('uh oh', response);
			return;
		}

		// const responseData = await response.json();

		context.commit('registerMentor', {
			...mentor,
			id: userId,
		});
	},
};

export default mentorsActions;
