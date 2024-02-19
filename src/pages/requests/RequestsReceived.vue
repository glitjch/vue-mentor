
<template>
	<section>
		<base-card>
			<h3>Requests received</h3>
			<ul v-if="!hasRequests">
				<request-item
					v-for="request in currentUserRequests"
					:key="request.id"
          :date="request.date"
          :email="request.userEmail"
          :message="request.message"
				></request-item>
			</ul>
			<p v-else>You don't have any received requests. Loner!</p>
		</base-card>
	</section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem';
export default {
	components: {
		RequestItem,
  },
	computed: {
		currentUserRequests() {
			return this.$store.getters['requests/currentUserRequests'];
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
