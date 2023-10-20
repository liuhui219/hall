<template>
	<div class="download-modal" :class="{ active: downloadStore.show }">
		<BaseImg :src="getResConfigImage('download', ImageKeyEnum.home)" alt="download" />
		<button class="btn-close" @click="downloadStore.close()" />
	</div>
</template>
<script setup lang="ts">
	const downloadStore = useDownloadStore()
	onMounted(downloadStore.mounted)
	onBeforeMount(downloadStore.unmounted)
</script>
<style scoped lang="scss">
	.download-modal {
		margin: auto;
		z-index: zIndex('loginModal');
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: $border-radius;
		transform: translateY(20%);
		transition: 0.3s ease;
		pointer-events: none;
		opacity: 0;
		padding: 0 22px;
		&.active {
			opacity: 1;
			pointer-events: auto;
			transform: translateY(0);
		}
		.btn-close {
			position: absolute;
			top: 15%;
			right: 7.5%;
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $text-lowlight;
			font-size: 18px;
		}
	}
</style>
