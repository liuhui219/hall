<template>
	<section v-if="!configStore.gameDisabled && homeStore.recent && homeStore.recent.length" :key="homeStore.recentKey" class="mx-[16px]">
		<div class="section-title mb-[12px] p-[0!important] flex items-center text-home-white">
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
							<div class="game-info bg-block-bg-2 text-left">
								<h4 class="game-name !text-[20px] scale-50 -mt-[10px] text-left !w-[200%]">{{ game.user }}</h4>
								<div class="recent-point !text-[18px] scale-50 -mt-[12px] text-left !w-[200%] -translate-x-[1px]">
									<span class="warning mr-[4px]">{{ configStore.currency_symbol }}</span>
									<BasePoint :value="game.point" :show-symbol="false" />
								</div>
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
