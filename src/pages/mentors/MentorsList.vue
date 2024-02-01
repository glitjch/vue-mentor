<template>
	<section>Filter</section>
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
export default {
	components: {
		MentorItem,
	},
	provide: [],
	computed: {
		filteredMentors() {
			return this.$store.getters['mentors/mentors'];
		},
		hasMentors() {
			return this.$store.getters['mentors/hasMentors'];
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
