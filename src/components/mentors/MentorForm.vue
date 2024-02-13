<template>
	<form class="form-control" @submit.prevent="submitForm">
		<div>
			<label for="firstName">First Name</label>
			<input type="text" id="firstName" v-model="firstName" />
		</div>
		<div>
			<label for="lastName">Last Name</label>
			<input type="text" id="lastName" v-model="lastName" />
		</div>
		<div>
			<label for="description">Description</label>
			<textarea id="lastName" rows="5" v-model="description"></textarea>
		</div>
		<div>
			<label for="rate">Hourly Rate</label>
			<input type="number" id="rate" v-model.number="rate" />
		</div>
		<div>
			<h3>Areas of Expertise</h3>
			<div class="filter-option">
				<input type="checkbox" id="frontend" value="frontend" v-model="areas" />
				<label for="frontend">Front end</label>
			</div>
			<div class="filter-option">
				<input type="checkbox" id="backend" value="backend" v-model="areas" />
				<label for="backend">Back end</label>
			</div>
			<div class="filter-option">
				<input type="checkbox" id="career" value="career" v-model="areas" />
				<label for="career">Career</label>
			</div>
		</div>
		<p>
			{{ this.areas }}
		</p>
		<base-button>Submit</base-button>
	</form>
</template>

<script>
export default {
  emits: ['saveData'],
	data() {
		return {
			firstName: '',
			lastName: '',
			description: '',
			rate: null,
			areas: [],
		};
	},
	methods: {
    submitForm() {
			const formData = {
				first: this.firstName,
				last: this.lastName,
				desc: this.description,
				rate: this.rate,
				areas: this.areas,
			};

			this.$emit('saveData', formData);
		},
	},
};
</script>
<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
}

input:focus,
textarea:focus {
	background-color: #f0e6fd;
	outline: none;
	border-color: #3d008d;
}

input[type='checkbox'] {
	display: inline;
	width: auto;
	border: none;
}

input[type='checkbox']:focus {
	outline: #3d008d solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: red;
}

.invalid input,
.invalid textarea {
	border: 1px solid red;
}
</style>
