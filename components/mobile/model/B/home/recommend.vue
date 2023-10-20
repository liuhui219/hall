<template>
	<section v-if="!configStore.gameDisabled" :key="useHomeStore().recommendKey" class="home-random-recommend">
		<div class="main-container">
			<!-- <h3 class="section-title">{{ $pt(info.title) }}</h3> -->
			<swiper
				class="random-recommend-swiper"
				:effect="'coverflow'"
				:loop="true"
				:grab-cursor="true"
				:centered-slides="true"
				:slides-per-view="2.17"
				:slides-per-group="changeNum"
				:loop-additional-slides="2"
				:loop-prevents-slide="true"
				:coverflow-effect="coverflowEffect"
				:navigation="{
					nextEl: '.btn-random', // 下一页dom节点
				}"
				:modules="modules"
				@slide-change="onSlideChange"
				@slide-change-transition-end="slideChangeTransitionEnd"
			>
				<swiper-slide
					v-for="game in info.list"
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
			<button class="sys-btn btn-m btn-random btn-highlight" @click="slideChange()">
				{{ $pt(info.btn_text) }}
				<i class="sysicon-refresh" />
			</button>
		</div>
	</section>
</template>
<script setup lang="ts">
	import { useWindowSize } from '@vueuse/core'

	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const coverflowEffect = ref({
		rotate: 0,
		stretch: 80 * (useWindowSize().width.value / 375),
		depth: 10,
		modifier: 1,
		scale: 0.7,
		slideShadows: true,
	})
	const changeNum = ref(1)
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const randomRecommendActiveName = ref('')
	const randomRecommendActiveViews = ref(0)
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const onSlideChange = (swiper: any) => {
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
