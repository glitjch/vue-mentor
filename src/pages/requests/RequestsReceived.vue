<template>
	<div>
		<base-dialog :show="!!error" title="An error occured" @close="handleError">
		</base-dialog>
		<section>
			<base-card>
				<h3 @click="test">Requests received</h3>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasRequests && !isLoading">
					<request-item
						v-for="request in filteredRequests"
						:key="request.id"
						:date="request.date"
						:email="request.userEmail"
						:message="request.message"
					></request-item>
				</ul>
				<p v-else>You don't have any received requests!</p>
			</base-card>
		</section>
	</div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
	components: {
		RequestItem,
		BaseSpinner,
		BaseDialog,
	},
	data() {
		return {
			isLoading: false,
			error: null,
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
			try {
				await this.$store.dispatch('requests/loadRequests');
			} catch (error) {
				this.error = error.message || 'Something failed';
			}
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
		},
		handleError() {
			this.error = null;
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
