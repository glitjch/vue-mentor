<template>
	<base-card>
		<section>
			<h2>Register as a Mentor</h2>
		</section>
		<section>
			<span>
				<label for="firstName">First Name</label>
				<input id="firstName" />
			</span>
			<span>
				<label for="lastName">Last Name</label>
				<input id="lastName" />
			</span>
			<div>
				<h3>Areas of Expertise</h3>
				<p>Select all that apply</p>
				<p>{{ this.areas }}</p>
				<span class="filter-option">
					<input
						type="checkbox"
						id="frontend"
						value="frontend"
						v-model="areas"
					/>
					<label for="frontend">Front end</label>
				</span>
				<span class="filter-option">
					<input type="checkbox" id="backend" value="backend" v-model="areas" />
					<label for="backend">Back end</label>
				</span>
				<span class="filter-option">
					<input type="checkbox" id="career" value="career" v-model="areas" />
					<label for="career">Career</label>
				</span>
			</div>
		</section>
	</base-card>
</template>

<script>
export default {
	data() {
		return {
      areas: [],
      description: "",
      hourlyRate: 0,
		};
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
