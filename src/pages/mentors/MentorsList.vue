<template>
	<section>Filter</section>
	<section>
		<div>
			<button>Refresh</button>
			<router-link to="/register">Register as a Mentor</router-link>
		</div>
		<ul v-if="hasMentors">
			<mentor-item
				v-for="mentor in filteredMentors"
				:key="mentor.id"
				:id="mentor.id"
				:firstName="mentor.firstName"
				:lastName="mentor.lastName"
				:areas="mentor.areas"
				:description="mentor.description"
				:hourlyRate="mentor.hourlyRate"
			>
				{{ mentor.firstName }}
        <router-link :to="{ name: 'mentor', params: { id: mentor.id }}"> </router-link>
			</mentor-item>
		</ul>
		<h3 v-else>No mentors found</h3>
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