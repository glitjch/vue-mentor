<template>
	<base-dialog :show="!!error" title="An error occured" @close="handleError">
		{{ error }}
	</base-dialog>
	<section>
		<mentor-filter @change-filter="setFilters"></mentor-filter>
		<div>{{ activeFilters }}</div>
	</section>
	<section>
		<base-card>
			<div class="controls">
				<base-button mode="outline" @click="loadMentors(true)"
					>Refresh</base-button
				>
				<base-button v-if="!isMentor && !isLoading" link to="/register"
					>Register as a Mentor</base-button
				>
			</div>
			<base-spinner v-if="isLoading"></base-spinner>
			<ul v-else-if="loadMentors">
				<mentor-item
					v-for="mentor in filteredMentors"
					:key="mentor.id"
					:id="mentor.id"
					:first-name="mentor.firstName"
					:last-name="mentor.lastName"
					:areas="mentor.areas"
					:description="mentor.description"
					:rate="mentor.hourlyRate"
				>
				</mentor-item>
			</ul>
			<h3 v-else>No mentors found: {error}</h3>
		</base-card>
	</section>
</template>

<script>
import MentorItem from '../../components/mentors/MentorItem.vue';
import MentorFilter from '../../components/mentors/MentorFilter.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		MentorItem,
		MentorFilter,
		BaseSpinner,
		BaseDialog,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				frontend: true,
				backend: true,
				career: true,
			},
		};
	},
	provide: [],
	computed: {
		isMentor() {
			return this.$store.getters['mentors/isMentor'];
		},
		filteredMentors() {
			const mentors = this.$store.getters['mentors/mentors'];
			return mentors.filter((mentor) => {
				if (this.activeFilters.frontend && mentor.areas.includes('frontend'))
					return true;
				if (this.activeFilters.backend && mentor.areas.includes('backend'))
					return true;
				if (this.activeFilters.career && mentor.areas.includes('career'))
					return true;
			});
		},
		hasMentors() {
			return this.$store.getters['mentors/hasMentors'];
		},
		...mapGetters({
			lastFetch: 'mentors/lastFetch',
		}),
	},
	async created() {
		console.log('created');
		this.loadMentors();
	},
	methods: {
		setFilters(updatedFilter) {
			return (this.activeFilters = updatedFilter);
		},
		async loadMentors(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('mentors/loadMentors', {
					forceRefresh: refresh,
				});
			} catch (error) {
				this.error = error.message || 'Failed to fetch mentor list!';
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
}
</style>
