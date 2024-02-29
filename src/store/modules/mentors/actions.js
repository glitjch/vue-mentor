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
  async loadMentors(context) {
    console.log('loadaction')
    
		const response = await fetch(
			`https://vue-http-demo-40cf5-default-rtdb.firebaseio.com/mentors.json`
		);

		const responseData = await response.json();
    if (!responseData.ok) {
      const error = new Error(responseData.message || 'Failed to fetch mentor list')
      throw error;
    }

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

		return;
	},
};

export default mentorsActions;
