<template>
	<section>Requests received</section>
	<p>{{ this.requestsList }}</p>
</template>

<script>
export default {
	computed: {
    requestsList() {
      const requests = this.$store.getters['requests/requests']
			return requests;
		},
	},
};
</script>
