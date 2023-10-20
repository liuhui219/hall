<template>
	<SkinHeader :is-home="false" :title="`${$t('H0021')}`" class="roulette-header" />
	<Vue3Lottie
		v-show="rouletteStore.isEnd && rouletteStore.resultValue.reward_type"
		ref="animationRef"
		class="absolute left-0 right-0 top-[10px] m-auto z-[10] scale-150"
		:animation-link="getResConfigImage('qf_json', ImageKeyEnum.roulette)"
		:assets-path="getResConfigImage('qf_path', ImageKeyEnum.roulette)"
		:loop="false"
		:auto-play="false"
		@on-complete="rouletteStore.animationComplete"
		@on-animation-loaded="rouletteStore.animationCreate"
	/>
	<div class="flex flex-col shrink-0 overflow-x-hidden overflow-y-auto flex-1 pt-[10px] roulette-content">
		<MobilePopupRouletteTab />
		<MobilePopupRouletteTable />
	</div>
	<audio v-show="false" id="roulette-play">
		<source :src="getResConfigImage('play', ImageKeyEnum.roulette)" type="audio/mp3" />
	</audio>
	<audio v-show="false" id="roulette-win">
		<source :src="getResConfigImage('win', ImageKeyEnum.roulette)" type="audio/mp3" />
	</audio>
	<audio v-show="false" id="roulette-click">
		<source :src="getResConfigImage('click', ImageKeyEnum.roulette)" type="audio/mp3" />
	</audio>
	<MobilePopupRouletteReward />
	<MobilePopupRouletteRule />
	<MobilePopupRouletteBonus />
</template>
<script lang="ts" setup>
	import { Vue3Lottie } from 'vue3-lottie'
	import 'vue3-lottie/dist/style.css'

	const animationRef = ref()
	const configStore = useSysConfigStore()

	const rouletteStore = useRouletteStore()
	rouletteStore.timer = useTimeExecutor({
		second: 0.5,
		func: rouletteStore.updateCurrentTime,
	})
	onMounted(() => rouletteStore.mounted(animationRef))
	onBeforeUnmount(rouletteStore.unmounted)
</script>
