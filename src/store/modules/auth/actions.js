export default {
	login() {
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

    const responseData = await response.json()
    console.log(responseData.message)
    console.log(responseData)
    if (!response.ok) {
			const error = new Error(responseData.error.message || 'Failed to sign up');
			throw error;
    }

 
    const newUser = {
      email: responseData.email,
      userId: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
    };

    context.commit('setUser', newUser)
		return;
	},
};
