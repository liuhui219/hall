<template>
	<div class="w-full h-full flex items-center roulette-render-container">
		<BaseImg
			class="relative -rotate-[90deg] -left-[14px] w-[40px]"
			:src="getResConfigImage(`rt${item.reward_type || 0}`, ImageKeyEnum.roulette)"
			alt=""
		/>
		<span class="roulette-render-number">
			{{ item.name }}
		</span>
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		item: {
			type: Object,
			default: () => ({}),
		},
	})
	const rouletteStore = useRouletteStore()
</script>
<style lang="scss" scoped>
	.roulette-render-container {
		img {
			margin-right: -14px;
		}
	}
	.roulette-render-number {
		font-size: 14px;
		font-weight: bold;
		color: #fff;
		transform: rotate(180deg);
		// @apply w-[55px] -translate-x-[12px] font-bold text-center inline-block -rotate-[90deg];
	}
</style>
