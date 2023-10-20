<template>
	<section class="home-jackpot mb-[36px]" :style="{ backgroundImage: `url(${getResConfigImage('home-jackpot-bg', ImageKeyEnum.home)})` }">
		<div class="jackpot-title text-center text-[24px] pt-[24px] font-bold">
			<h3>{{ $pt(info.title) }}</h3>
		</div>

		<div class="jackpot-main flex flex-col items-center">
			<div class="prize flex items-center text-[48px]">
				<div>{{ configStore.currency_symbol }}</div>
				<BaseCountTo
					:style="{ width: jackpotlen * 23 + 'px' }"
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
			<button class="sys-btn btn-m-pc btn-highlight mb-[30px]" @click="toProvider(119)" v-html="renderJackpotBtn" />
			<swiper
				class="jackpot-game-swiper"
				:slides-per-view="9"
				:space-between="0"
				:centered-slides="true"
				:loop="true"
				:autoplay="{
					delay: 2000,
					disableOnInteraction: false,
				}"
				:free-mode="true"
				:modules="modules"
				:navigation="{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}"
			>
				<swiper-slide v-for="game in configStore.getGameListFilter(info.list)" :key="game.game_id" class="game-item">
					<BaseGameComponent :game="configStore.getGameByGameId(game.game_id)" :show-detail="false" :image-radius="true" />
				</swiper-slide>
			</swiper>
			<div class="swiper-button-prev" />
			<div class="swiper-button-next" />
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
	const app = useNuxtApp()
	const renderJackpotBtn = computed(() => {
		return app
			.$pt(propsConf.info.btn_text)
			.replace(app.$pt(propsConf.info.title)?.toLocaleUpperCase(), `<span class="font-bold uppercase">${app.$pt(propsConf.info.title)}</span>`)
	})
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
