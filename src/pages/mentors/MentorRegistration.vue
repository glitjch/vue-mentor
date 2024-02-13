<template>
	<base-card>
		<h2>Register as a Mentor</h2>
		<mentor-form></mentor-form>
	</base-card>
</template>

<script>
import MentorForm from '../../components/mentors/MentorForm.vue';
export default {
	components: {
		MentorForm,
	},
};

// Add actions
// add submit button
// make sure to redirect to home page (list of mentors)
</script>

<style scoped>
h2 {
	margin: 0.5rem 0;
}

.filter-option {
	margin-right: 1rem;
}

.filter-option label,
.filter-option input {
	vertical-align: middle;
}

.filter-option label {
	margin-left: 0.25rem;
}

.filter-option.active label {
	font-weight: bold;
}
</style>
