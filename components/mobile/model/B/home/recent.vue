<template>
	<section v-if="!configStore.gameDisabled && homeStore.recent && homeStore.recent.length" :key="homeStore.recentKey" class="mx-[16px] mt-[15px]">
		<div class="section-title mb-[12px] p-[0!important] flex items-center">
			<BaseIcon v-if="info.icon" :name="info.icon" class="home-game-icon" />{{ $pt(info.title) }}
		</div>
		<swiper
			class="game-list-swiper recent-swiper"
			:loop="true"
			:autoplay="{
				delay: 2000,
				disableOnInteraction: false,
			}"
			:slides-per-view="4"
			:space-between="12"
			:slides-per-group="1"
			:modules="modules"
		>
			<swiper-slide v-for="(game, index) in homeStore.recent" :key="`photo-${index}`">
				<div class="game-item recent-game-item">
					<BaseGameComponent :game="configStore.getGameByGameId(game.game_id)" :image-radius="true" :show-detail="false">
						<template #detail>
							<div class="game-info">
								<h4 class="game-name text-center">{{ game.user }}</h4>
								<div class="recent-point mt-[1.5px]"><BasePoint :value="game.point" /></div>
							</div>
						</template>
					</BaseGameComponent>
				</div>
			</swiper-slide>
		</swiper>
	</section>
</template>
<script setup>
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
	const homeStore = useHomeStore()
	const modules = reactive([SwiperAutoplay])
	const configStore = useSysConfigStore()
</script>
