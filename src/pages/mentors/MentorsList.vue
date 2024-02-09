<template>
	<section>
		<mentor-filter @change-filter="setFilters"></mentor-filter>
    <div>{{ activeFilters }}</div>
	</section>
	<section>
		<base-card>
			<div class="controls">
				<base-button mode="outline">Refresh</base-button>
				<base-button link to="/register">Register as a Mentor</base-button>
			</div>
			<ul v-if="hasMentors">
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

export default {
	components: {
		MentorItem,
		MentorFilter,
	},
	data() {
		return {
			activeFilters: {
				frontend: true,
				backend: true,
				career: true,
			},
		};
	},
	provide: [],
	computed: {
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
	methods: {
		setFilters(updatedFilter) {
			return (this.activeFilters = updatedFilter);
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
