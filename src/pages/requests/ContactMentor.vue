<template>
	<form @submit.prevent="submitRequest">
		<div class="form-control" :class="{ errors: !email.isValid }">
			<label for="email">Your Email</label>
			<input
				type="email"
				id="email"
				v-model.trim="email.val"
				@blur="clearValidity('email')"
			/>
			<p v-if="!email.isValid">Please provide a proper email.</p>
		</div>
		<div class="form-control" :class="{ errors: !message.isValid }">
			<label for="message">Your Message</label>
			<textarea
				rows="5"
				id="message"
				v-model.trim="message.val"
				@blur="clearValidity('message')"
			></textarea>
			<p v-if="!message.isValid">Message cannot be empty.</p>
		</div>
		<div class="actions">
			<base-button>Send Message</base-button>
		</div>
	</form>
</template>

<script>
export default {
	props: ['id'],
	data() {
		return {
			email: {
				val: '',
				isValid: true,
			},
			message: {
				val: '',
				isValid: true,
			},
			formIsValid: true,
		};
	},
	methods: {
		clearValidity(input) {
			this[input].isValid = true;
		},
		validateMessage() {
			this.formIsValid = true;
			if (this.email.val === '' || !this.email.val.includes('@')) {
				this.email.isValid = false;
				this.formIsValid = false;
			}
			if (this.message.val === '') {
				this.message.isValid = false;
				this.formIsValid = false;
			}
		},
		async submitRequest() {
			await this.validateMessage();
			if (!this.formIsValid) return;

      const mentorId = this.$route.params.id;

			const messageData = {
				mentorId: mentorId,
				email: this.email.val,
				message: this.message.val,
				date: new Date().toUTCString(),
			};

			this.$store.dispatch('requests/saveRequest', messageData);
			this.$router.replace('/requests');
			return;
		},
	},
};
</script>
<style scoped>
form {
	margin: 1rem;
	border: 1px solid #ccc;
	border-radius: 12px;
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

.errors {
	font-weight: bold;
	color: red;
}

.actions {
	text-align: center;
}
</style>
