<template>
	<section>
		<mentor-filter @change-filter="setFilters"></mentor-filter>
		<div>{{ activeFilters }}</div>
	</section>
	<section>
		<base-card>
			<div class="controls">
				<base-button mode="outline" @click="loadMentors">Refresh</base-button>
				<base-button v-if="!isMentor" link to="/register"
					>Register as a Mentor</base-button
				>
			</div>
			<base-spinner v-if="isLoading"></base-spinner>
			<ul v-else-if="hasMentors">
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
			<h3 v-else>No mentors found</h3>
		</base-card>
	</section>
</template>

<script>
import MentorItem from '../../components/mentors/MentorItem.vue';
import MentorFilter from '../../components/mentors/MentorFilter.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';

export default {
	components: {
		MentorItem,
		MentorFilter,
		BaseSpinner,
	},
	data() {
		return {
			isLoading: false,
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
	},
	async created() {
		this.loadMentors();
	},
	methods: {
		setFilters(updatedFilter) {
			return (this.activeFilters = updatedFilter);
		},
		async loadMentors() {
			this.isLoading = true;
			await this.$store.dispatch('mentors/loadMentors');
			setTimeout(() => (this.isLoading = false), 1000);
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
