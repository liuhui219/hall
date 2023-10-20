<template>
	<section v-if="!configStore.gameDisabled && homeStore.recent && homeStore.recent.length" :key="homeStore.recentKey" class="float-hidden">
		<div class="section-title mb-[12px] p-[0!important] flex justify-between">
			<div class="flex items-center justify-start">
				<BaseIcon v-if="info.icon" :name="info.icon" class="home-game-icon" />{{ $pt(info.title) }}
			</div>
			<div class="shrink-0 flex items-center">
				<div class="flex items-center gap-[4px] ml-[6px]">
					<button class="sys-btn btn-min btn-home-next swiper-button-recent-prev">
						<BaseArrowDown class="rotate-90" />
					</button>
					<button class="sys-btn btn-min btn-home-next swiper-button-recent-next">
						<BaseArrowDown class="rotate-[270deg] translate-x-[2px]" />
					</button>
				</div>
			</div>
		</div>
		<swiper
			class="game-list-swiper recent-swiper"
			:slides-per-view="6.7"
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
							<div class="game-info bg-block-bg-2 text-left !items-start !pt-[12px]">
								<h4 class="game-name !text-[14px] text-left">{{ game.user }}</h4>
								<div class="recent-point !text-[16px] mb-[8px] text-left -translate-x-[2px]">
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
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const configStore = useSysConfigStore()
</script>
<style lang="scss" scoped>
	// .sys-btn.btn-view-all {
	// 	background: #262828;
	// 	color: #b2babb;
	// 	font-size: 12px;
	// 	font-weight: 500;
	// 	border-radius: 5px;
	// 	border: none;
	// 	height: 36px;
	// }
	// .sys-btn.btn-home-next {
	// 	width: 36px;
	// 	height: 36px;
	// 	padding: 0;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	min-width: unset;
	// 	font-size: 14.4px;
	// 	border: none;
	// 	border-radius: 3px;
	// 	background: #262828;
	// 	color: #b2babb;
	// 	&:active {
	// 		scale: 0.7;
	// 		i {
	// 			color: $second;
	// 		}
	// 	}
	// 	&:hover {
	// 		opacity: 0.6;
	// 		i {
	// 			color: #fff;
	// 		}
	// 	}

	// 	&.swiper-button-disabled {
	// 		background: $home-block-bg-2;
	// 		color: #8fa8aa;
	// 		pointer-events: none;
	// 	}
	// }
</style>
