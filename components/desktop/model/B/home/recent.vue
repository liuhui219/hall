<template>
	<section
		v-if="!configStore.gameDisabled && homeStore.recent && homeStore.recent.length"
		:key="homeStore.recentKey"
		class="mb-[24px] overflow-hidden"
	>
		<div class="section-title mb-[12px] p-[0!important] flex justify-between">
			<div class="flex items-center"><BaseIcon v-if="info.icon" :name="info.icon" class="home-game-icon" />{{ $pt(info.title) }}</div>
			<div class="flex">
				<button class="sys-btn btn-icon btn-min btn-card mr-[12px] btn-home-next swiper-button-recent-prev">
					<BaseArrowDown class="rotate-90" />
				</button>
				<button class="sys-btn btn-icon btn-min btn-card btn-next btn-home-next swiper-button-recent-next">
					<BaseArrowDown class="rotate-[270deg]" />
				</button>
			</div>
		</div>
		<swiper
			class="game-list-swiper recent-swiper mb-[16px]"
			:slides-per-view="7.9"
			:space-between="24"
			:slides-per-group="1"
			:autoplay="{
				delay: 2000,
				disableOnInteraction: false,
			}"
			:loop="true"
			:modules="modules"
			:navigation="{
				nextEl: `.swiper-button-recent-next`,
				prevEl: `.swiper-button-recent-prev`, // 下一页dom节点
			}"
		>
			<swiper-slide v-for="(game, index) in homeStore.recent" :key="`photo-${index}`">
				<div class="border-radius game-item recent-game-item">
					<BaseGameComponent :game="configStore.getGameByGameId(game.game_id)" :image-radius="true" :show-detail="false">
						<template #detail>
							<div class="game-info">
								<h4 class="game-name text-center">{{ game.user }}</h4>
								<div class="recent-point">
									<BasePoint :value="game.point" />
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
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const configStore = useSysConfigStore()
</script>
