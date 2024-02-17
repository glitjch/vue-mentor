
<template>
	<section>
		<base-card>
			<h3>Requests received</h3>
			<ul v-if="!hasRequests">
				<request-item
					v-for="request in requests"
					:key="request.id"
				></request-item>
			</ul>
			<p v-else>You don't have any received requests. Loner!</p>
		</base-card>
	</section>
	<p>{{ this.requests }}</p>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem';
export default {
	components: {
		RequestItem,
  },
  // TODO need props to pass down to request item
	computed: {
		requests() {
			return this.$store.getters['requests/requests'];
		},
		hasRequests() {
			return this.$store.getters['requests/hasRequests'];
		},
	},
};
</script>

<style scoped>
header {
	text-align: center;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>
