<template>
	<div class="w-full h-full flex items-center roulette-render-container">
		<BaseImg
			class="relative rotate-[90deg] -left-[36px] w-[30px]"
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
<style scoped lang="scss">
	.roulette-render-container {
		img {
			transform: translateX(30px) rotate(-90deg);
			margin-right: -10px;
		}
	}
	.roulette-render-number {
		color: $color-white;
		font-size: 12px;
		font-weight: 500;
		transform: rotate(180deg) scale(0.9);

		// @apply w-[55px] -translate-x-[12px] font-bold text-center inline-block -rotate-[90deg];
	}
</style>
