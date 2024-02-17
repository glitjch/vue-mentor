import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const requestsModule = {
	namespaced: true,
	state() {
		return {
			requests: [
				{
					id: 'demoId',
					mentorId: 'm3',
					userEmail: 'test@icles.com',
					message: 'Give me your everything.',
					date: 'today',
				},
			],
		};
	},
	getters,
	mutations,
	actions,
};

export default requestsModule;
