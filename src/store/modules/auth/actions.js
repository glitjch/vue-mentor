let timer;

export default {
	async login(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'login',
		});
	},
	async signup(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'signup',
		});
	},
	async auth(context, payload) {
		const mode = payload.mode;
		const key = process.env.VUE_APP_FIREBASE_API;
		let url =
			mode === 'signup'
				? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
				: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
		const { email, password } = payload;

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
		});
		const responseData = await response.json();

		if (!response.ok) {
			const defaultErrorMessage =
				mode === 'signup' ? 'Failed to sign up' : 'Failed to log in';
			const error = new Error(
				responseData.error.message || defaultErrorMessage
			);
			throw error;
		}


		// const expiresIn = +responseData.expiresIn * 1000;
		const expiresIn = +5000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('tokenExpiration', expirationDate);

		timer = setTimeout(function() {
			context.dispatch('autoLogout')
		}, expiresIn);

		const returningUser = {
			email: responseData.email,
			userId: responseData.localId,
			token: responseData.idToken,
		};

		context.commit('setUser', returningUser);
	},
	tryLogin(context) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 10000) return;

		timer = setTimeout(() => {
			context.dispatch('logout');
		}, expiresIn);

		if (token && userId)
			context.commit('setUser', {
				userId,
				token,
				tokenExpiration: null,
			});
	},
	async logout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

		await context.commit('logout');
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setDidLogout');
  },
};
