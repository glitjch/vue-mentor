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
      return this.$store.getters['requests/currentUserRequests'];
		},
	},
	methods: {
		async loadRequests() {
      this.isLoading = true;
      console.log('loadreq ferom page')
      await this.$store.dispatch('requests/loadRequests');
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
		},
  },
  async created() {
		await this.loadRequests();
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
