import { Router, createRouter, createWebHistory } from 'vue-router';
import MentorDetail from './pages/mentors/MentorDetail.vue';
import MentorList from './pages/mentors/MentorList.vue';
import MentorRegistration from './pages/mentors/MentorRegistration.vue';
import ContactMentor from './pages/requests/ContactMentor.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';


const router: Router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: './', redirect: 'mentors' },
		{ path: './mentors', component: MentorList, name: 'mentors' },
		{
			path: './mentors/:id',
			component: MentorDetail,
			children: [{ path: 'contact', component: ContactMentor }],
		},
		{ path: './register', component: MentorRegistration },
		{ path: './requests', component: RequestsReceived },
		{ path: './:notFound(.*)', component: NotFound },
	],
});

export default router;
