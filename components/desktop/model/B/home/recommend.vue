<template>
	<section v-if="!configStore.gameDisabled" class="home-random-recommend mt-[50px] flex items-center">
		<div class="main-container">
			<swiper
				class="random-recommend-swiper"
				:effect="'coverflow'"
				:loop="true"
				:grab-cursor="true"
				:centered-slides="true"
				:slides-per-view="3.1"
				:slides-per-group="changeNum"
				:loop-additional-slides="2"
				:loop-prevents-slide="true"
				:navigation="{
					nextEl: '.btn-random', // 下一页dom节点
				}"
				:coverflow-effect="coverflowEffect"
				:modules="modules"
				@slide-change="onSlideChange"
				@slide-change-transition-end="slideChangeTransitionEnd"
			>
				<swiper-slide
					v-for="game in configStore.getGameListFilter(info.list)"
					:key="`random-recommend-${game.game_id}`"
					class="game-item"
					:data-count="game.count"
					:data-name="configStore.getGameByGameId(game.game_id).name"
				>
					<BaseGameComponent :game="configStore.getGameByGameId(game.game_id)" :show-detail="false" />
				</swiper-slide>
			</swiper>
			<h4 class="active-game-name">{{ randomRecommendActiveName }}</h4>
			<!-- <div class="active-game-view">{{ randomRecommendActiveViews }} {{ $t("H0038") }}</div> -->
		</div>
		<div class="flex flex-col justify-center flex-1">
			<h3 class="section-title text-center">{{ $pt(info.title) }}</h3>
			<button class="sys-btn btn-highlight btn-random" @click="slideChange()">
				{{ $pt(info.btn_text) }}
				<BaseIcon name="refresh" />
			</button>
		</div>
	</section>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const coverflowEffect = reactive({
		rotate: 0,
		stretch: 70,
		depth: 150,
		modifier: 1.1,
		scale: 0.8,
		slideShadows: true,
	})
	const changeNum = ref(2)
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const randomRecommendActiveName = ref('')
	const randomRecommendActiveViews = ref(0)
	const gameStore = useGameStore()
	const onSlideChange = (swiper: any) => {
		// changeNum.value = 1;
		let activeSlide = swiper.slides[swiper.activeIndex]
		if (activeSlide) {
			randomRecommendActiveName.value = activeSlide.getAttribute('data-name')
			randomRecommendActiveViews.value = activeSlide.getAttribute('data-count')
		}
	}
	const slideChange = () => {
		changeNum.value = Math.floor(Math.random() * (10 - 1) + 1)
	}

	const slideChangeTransitionEnd = () => {
		changeNum.value = 1
	}
</script>
