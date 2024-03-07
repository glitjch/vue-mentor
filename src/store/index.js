import { createStore } from 'vuex';
import MentorsModule from './modules/mentors/index.js';
import RequestsModule from './modules/requests/index.js';
import AuthModule from './modules/auth/index.js';

const store = createStore({
	modules: {
    mentors: MentorsModule,
    requests: RequestsModule,
    auth: AuthModule,
	},
});

export default store;
