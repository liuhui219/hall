<template>
	<!-- <div class="loading-default" :style="sizeStyle">
		<div v-for="item in 8" :key="item" :style="{ background: childColor }" />
	</div> -->
	<BaseImg class="loading-base-img" :src="getResConfigImage('loading_s', ImageKeyEnum.home)" />
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		size: {
			type: Number,
			default: 80,
		},
		childColor: {
			type: String,
			default: '$second',
		},
	})
	const sizeStyle = computed(() => {
		return { transform: `scale(${propsConf.size / 80})` }
	})
</script>
<style scoped lang="scss">
	.loading-base-img {
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		animation: list-loading-spinner 0.8s linear infinite;
	}
</style>
