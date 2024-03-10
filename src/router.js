import { createRouter, createWebHistory } from 'vue-router';

import MentorDetail from './pages/mentors/MentorDetail.vue';
import MentorsList from './pages/mentors/MentorsList.vue';
import MentorRegistation from './pages/mentors/MentorRegistration.vue';
import ContactMentor from './pages/requests/ContactMentor.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/mentors' },
		{ path: '/home', redirect: '/mentors' },
		{ path: '/mentors', component: MentorsList },
		{
			path: '/mentors/:id',
			// name: 'mentor',
			props: true,
			component: MentorDetail,
			children: [
				{
					path: 'contact',
					component: ContactMentor,
				},
			],
		},
		{
			path: '/register',
			component: MentorRegistation,
			meta: { requiresAuth: true },
		},
		{
			path: '/requests',
			component: RequestsReceived,
			meta: { requiresAuth: true },
		},
		{
			path: '/auth',
			component: UserAuth,
			meta: { requiresUnauth: true },
		},
		{ path: '/:notFound(.*)', component: NotFound },
	],
});

router.beforeEach(function (to, from, next) {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/auth');
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/mentors');
	} else next();
});
export default router;
