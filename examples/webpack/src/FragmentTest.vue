<template>
	<template v-if="!isParentInDom">
		<div>
			Hello
		</div>
		<div>
			Fragments
		</div>
	</template>
</template>

<script>
export default {
	data() {
		return {
			isParentInDom: undefined,
		};
	},

	mounted() {
		this.isParentInDom = this.$el.isConnected;
	},
};
</script>
