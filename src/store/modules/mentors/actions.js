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
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/mentors/${userId}.json`,
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
  async loadMentors(context, payload) {
		const currentTimeStamp = new Date().getTime();
		const lastFetch = context.getters.lastFetch;
		const shouldUpdate = (currentTimeStamp - lastFetch) / 1000 > 60;
		// console.log('lastFetch', lastFetch)
		// console.log('shouldUpdate', shouldUpdate)
		if (!payload.forceRefresh && lastFetch && !shouldUpdate) {
			return;
		}

		const response = await fetch(
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/mentors.json`
		);

		if (!response.ok) {
			const error = new Error(response.status || 'Failed to fetch mentor list');
			throw error;
		}

		const responseData = await response.json();

		const mentors = [];
		for (const key in responseData) {
			const { firstName, lastName, description, areas, hourlyRate, id } =
				responseData[key];
			const mentor = {
				id,
				firstName,
				lastName,
				description,
				areas,
				hourlyRate,
			};
			mentors.push(mentor);
		}

		context.commit('setMentors', mentors);

		context.commit('setFetchTimeStamp');

		return;
  },
  async changeTest(context, payload) {
    const mutation = await context.commit('changeTest', payload)
    return mutation;
  },
};

export default mentorsActions;
