import { createStore } from 'vuex';
import MentorsModule from './modules/mentors/index.js';
import RequestsModule from './modules/requests/index.js';

const store = createStore({
	modules: {
    mentors: MentorsModule,
    requests: RequestsModule,
	},
	state() {
		return {
			userId: 'm3',
		};
	},
	getters: {
		userId(state) {
			return state.userId;
		},
	},
});

export default store;
