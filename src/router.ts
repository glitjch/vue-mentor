import { Router, createRouter, createWebHistory } from 'vue-router';

const router: Router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: './', redirect: 'coaches' },
		{ path: './coaches', component: null, name: 'coaches' },
		{
			path: './coaches/:id',
			component: null,
			children: [{ path: 'contact', component: null }],
		},
		{ path: './register', component: null },
		{ path: './requests', component: null },
		{ path: './:notFound(.*)', component: null },
	],
});

export default router;
