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

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

		const returningUser = {
			email: responseData.email,
			userId: responseData.localId,
			tokenExpiration: responseData.expiresIn,
			token: responseData.idToken,
		};

		context.commit('setUser', returningUser);
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) context.commit('setUser', {
      userId,
      token,
      tokenExpiration: null,
    })
  },
	async logOut(context) {
		const payload = {
			token: null,
			userId: null,
			tokenExpiration: null,
		};
		context.commit('logOut', payload);
	},
};
