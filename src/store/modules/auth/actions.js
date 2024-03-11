export default {
	async login(context, payload) {
		const { email, password } = payload;
		const key = process.env.VUE_APP_FIREBASE_API;
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
			{
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			}
		);
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.error.message || 'Failed to log in');
			throw error;
		}

		const returningUser = {
			email: responseData.email,
			userId: responseData.localId,
			tokenExpiration: responseData.expiresIn,
			token: responseData.idToken,
		};

		context.commit('setUser', returningUser);

		return;
	},
	async signup(context, payload) {
		const { email, password } = payload;
		const key = process.env.VUE_APP_FIREBASE_API;
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
			{
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			}
		);

		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(
				responseData.error.message || 'Failed to sign up'
			);
			throw error;
		}

		const newUser = {
			email: responseData.email,
			userId: responseData.idToken,
			tokenExpiration: responseData.expiresIn,
		};

		context.commit('setUser', newUser);
		return;
	},
	async auth(context, payload) {
		const mode = payload.mode;
    let url =
      mode === 'signup'
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
		const { email, password } = payload;
		const key = process.env.VUE_APP_FIREBASE_API;
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
			const error = new Error(responseData.error.message || 'Failed to log in');
			throw error;
		}

		const returningUser = {
			email: responseData.email,
			userId: responseData.localId,
			tokenExpiration: responseData.expiresIn,
			token: responseData.idToken,
		};

		context.commit('setUser', returningUser);

		return;
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
