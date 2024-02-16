const mentorsActions = {
	registerMentor(context, payload) {
		const mentor = {
      id: context.rootGetters.userId,
			firstName: payload.first,
			lastName: payload.last,
			areas: payload.areas,
			description: payload.desc,
			hourlyRate: payload.rate,
		};
		context.commit('registerMentor', mentor);
	},
};

export default mentorsActions;
