<template>
	<div class="down-tip">
		<p class="tips">{{ $t('H0001') }}</p>
		<div class="flex">
			<div class="download" @click="navigationStore.openDownload">DOWNLOAD</div>
			<BaseIcon name="close" class="close-icon text-[18px] ml-[12px]" @click="configStore.clickDownloadTipClose()" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const navigationStore = useNavigationStore()
</script>
<style scoped lang="scss">
	.down-tip {
		position: fixed;
		left: 0;
		top: 0;
		z-index: zIndex('header');
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
		width: 100%;
		height: $app-download-height;

		background-color: $main;

		padding: 0 16px;

		font-size: 12px;
		white-space: pre-wrap;

		.tips {
			width: 212px;
			font-weight: 500;
			// line-height: 14px;
			color: $block-bg;
		}

		.download {
			display: flex;
			align-items: center;
			font-weight: 600;
			// line-height: 14px;
			text-decoration-line: underline;
			color: $down-03;
		}

		.close-icon {
			color: $block-bg;
			filter: drop-shadow(20px 4px 4px rgba(0, 0, 0, 0.25));
		}
	}
</style>
