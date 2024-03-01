<template>
	<section>
		<base-card>
			<h3 @click="test">Requests received</h3>
			<!-- <base-spinner v-if="isLoading"></base-spinner> -->
			<ul v-if="hasRequests">
				<request-item
					v-for="request in filteredRequests"
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
// import BaseSpinner from '../../components/ui/BaseSpinner.vue';

export default {
	components: {
		RequestItem,
		// BaseSpinner,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	computed: {
		hasRequests() {
			return this.$store.getters['requests/hasRequests'];
		},
		filteredRequests() {
			const userId = this.$store.getters['userId'];
      const requests = this.loadRequests()
      const request = requests.filter((request) => {
				return request.mentorId === userId;
      });
      return request;
		},
	},
	methods: {
		loadRequests() {
			console.log('loadre');
			this.isLoading = true;
			return this.$store.getters['requests/currentUserRequests'];
		},
		test() {
			console.log('test');
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
