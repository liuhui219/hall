<template>
	<section class="modal-header relative z-[6]">
		<h3 class="modal__title section-title text-center relative mx-[32px] pt-[44px]">
			{{ $t('H0021') }}
			<button class="modal__close absolute -right-[15px] top-[10px] m-auto z-[5] !w-[50px] !h-[50px]" @click="closePopup()">
				<i class="sysicon-close text-lowlight text-[18px]" />
			</button>
		</h3>
	</section>
	<div class="modal-roulette w-full cursor-auto h-full overflow-hidden flex flex-col">
		<Vue3Lottie
			v-show="rouletteStore.isEnd && rouletteStore.resultValue.reward_type"
			ref="animationRef"
			class="absolute -top-[480px] -left-[265px] right-0 m-auto z-[10]"
			:animation-link="getResConfigImage('qf_json', ImageKeyEnum.roulette)"
			:assets-path="getResConfigImage('qf_path', ImageKeyEnum.roulette)"
			:height="2000"
			:width="1200"
			:loop="false"
			:auto-play="false"
			@on-complete="rouletteStore.animationComplete"
			@on-animation-loaded="rouletteStore.animationCreate"
		/>
		<div class="modal__content overflow-y-auto relative">
			<DesktopPopupRouletteTab />
			<DesktopPopupRouletteTable />
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
		<DesktopPopupRouletteReward />
		<DesktopPopupRouletteRule />
		<DesktopPopupRouletteBonus />
	</div>
</template>
<script setup lang="ts">
	import { Vue3Lottie } from 'vue3-lottie'
	import 'vue3-lottie/dist/style.css'
	const configStore = useSysConfigStore()
	const rouletteStore = useRouletteStore()
	const animationRef = ref()
	onMounted(() => rouletteStore.mounted(animationRef))
	onBeforeUnmount(rouletteStore.unmounted)
</script>
