<template>
	<div>
		<base-dialog
			title="An error has occured"
			:show="!!error"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog :show="isLoading" title="Authenticating..." fixed>
			<base-spinner></base-spinner>
		</base-dialog>
		<base-card>
			<form @submit.prevent="submitForm">
				<div class="form-control">
					<label for="email">E-mail</label>
					<input type="email" id="email" v-model.trim="email" />
				</div>
				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" v-model.trim="password" />
				</div>
				<p v-if="!formIsValid">
					Please enter a valid email and password that must be at least 6
					characters long.
				</p>
				<base-button>{{ submitButtonCaption }}</base-button>
				<base-button type="button" mode="flat" @click="switchAuthMode">{{
					switchModeButtonCaption
				}}</base-button>
			</form>
			{{ user }}
		</base-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			formIsValid: true,
			mode: 'login',
			isLoading: false,
			error: null,
			user: null,
		};
	},
	computed: {
		submitButtonCaption() {
			return this.mode === 'login' ? 'login' : 'signup';
		},
		switchModeButtonCaption() {
			return this.mode === 'login' ? 'sign up instead' : 'log in instead';
		},
	},
	methods: {
		async submitForm() {
			this.formIsValid = true;
			if (
				this.email === '' ||
				!this.email.includes('@') ||
				this.password.length < 6
			) {
				this.formIsValid = false;
				return;
			}
			this.isLoading = true;

			const payload = {
				email: this.email,
				password: this.password,
			};

			try {
				if (this.mode === 'signup') {
					await this.$store.dispatch('signup', payload);
				} else {
					await this.$store.dispatch('login', payload);
				}
				const redirectUrl = '/' + (this.$route.query.redirect || 'mentors');
				this.$router.replace(redirectUrl);
			} catch (error) {
				this.error = error.message || 'Failed to authenticate.';
			}

			const loggedInUser = await this.$store.getters['userId'];
			this.user = loggedInUser;

			this.isLoading = false;
		},
		switchAuthMode() {
			this.mode === 'login' ? (this.mode = 'signup') : (this.mode = 'login');
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped>
form {
	margin: 1rem;
	padding: 1rem;
}

.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}

input,
textarea {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;
}

input:focus,
textarea:focus {
	border-color: #3d008d;
	background-color: #faf6ff;
	outline: none;
}
</style>
