import { createStore } from 'vuex';
import MentorsModule from './modules/mentors/index.js';

const store = createStore({
	modules: {
		mentors: MentorsModule,
	},
});

export default store;
