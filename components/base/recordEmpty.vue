<template>
	<BaseImg :src="getResConfigImage('record_empty', 'home')" :style="{ width: width + 'px', height: width + 'px' }" />
</template>

<script setup lang="ts">
	defineProps({
		width: {
			type: Number,
			default: 162,
		},
	})
</script>

<style scoped lang="scss"></style>
