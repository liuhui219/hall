<template>
	<section class="home-jackpot" :style="{ backgroundImage: `url(${getResConfigImage('jackpot', ImageKeyEnum.home)})` }">
		<div class="jackpot-title text-center text-[14px] pt-[24px] font-bold white">
			<h3>{{ $pt(info.title) }}</h3>
		</div>
		<div class="jackpot-main px-[40px]">
			<div class="prize my-[4px] font-bold">
				<div class="curren">{{ configStore.currency_symbol }}</div>
				<BaseCountTo
					:style="{ width: jackpotlen * 14 + 'px' }"
					:start-amount="jackpotValue"
					:end-amount="configStore.jackpot"
					:duration="1"
					prefix=""
					suffix=""
					separator="."
					decimal-separator=","
					:decimals="2"
					@finished="countFinished"
				/>
			</div>
			<button class="sys-btn btn-m btn-highlight mb-[24px]" @click="toProvider(119)">
				{{ $pt(info.btn_text) }}
			</button>
			<swiper
				class="jackpot-game-swiper"
				:slides-per-view="4"
				:space-between="0"
				:centered-slides="false"
				:loop="true"
				:autoplay="{
					delay: 2000,
					disableOnInteraction: false,
				}"
				:modules="modules"
			>
				<swiper-slide v-for="game in configStore.getGameListFilter(info.list)" :key="game.game_id" class="game-item">
					<BaseGameComponent :game="configStore.getGameByGameId(game.game_id)" :show-detail="false" />
				</swiper-slide>
			</swiper>
			<!-- <button @click="slideChange()" class="opacity-30 absolute left-[10px] bottom-[15px] rotate-90 swiper-button-prev">
				<BaseArrowDown></BaseArrowDown>
			</button>
			<button @click="slideChange()" class="opacity-30 absolute right-[10px] bottom-[15px] rotate-[270deg] swiper-button-next">
				<BaseArrowDown></BaseArrowDown>
			</button> -->
		</div>
	</section>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const slideChange = () => {}
	const app = useNuxtApp()
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const jackpotValue = ref(0)
	const countFinished = () => {
		jackpotValue.value = configStore.jackpot
	}
	const jackpotlen = computed(() => {
		return configStore.jackpot.toFixed(3).length
	})
</script>
