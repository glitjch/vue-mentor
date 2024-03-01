<template>
	<base-card>
		<section>
			<div>
				From: <a :href="emailLink">{{ email }} </a>
			</div>
			<div>Date: {{ date }}</div>
			<div>Message: {{ message }}</div>
		</section>
	</base-card>
</template>

<script>
export default {
	props: ['date', 'email', 'message'],
	computed: {
		emailLink() {
			return 'mailTo:' + this.email;
		},
	},
};
</script>

<style scoped>
li {
	margin: 1rem 0;
	border: 1px solid #ccc;
	padding: 1rem;
}

a {
	color: #3d008d;
	text-decoration: none;
	font-weight: bold;
}

a:hover,
a:active {
	color: #8d007a;
}

p {
	margin: 0.5rem 0 0 0;
}
</style>
