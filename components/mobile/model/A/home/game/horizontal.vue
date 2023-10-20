<template>
	<section class="home-game">
		<div class="flex overflow-hidden gap-[10px] pb-[20px]">
			<div class="flex flex-1 game-list-scroll gap-[8px]">
				<button
					v-for="(item, index) in info.list"
					:key="`ranking-type-${index}`"
					class="sys-btn btn-m shrink-0 !text-[14px] home-game-btn relative"
					:class="{ 'btn-highlight btn-border-fix home-menu-active': index == active, 'home-game-btn-focus': !!Number(item.focus) }"
					@click="changeActive(index)"
				>
					<span class="relative z-[1] flex items-center justify-center">
						<BaseIcon v-if="item.icon" :name="item.icon" class="mr-[8px] !text-[18px]" />{{ $pt(item.title) }}
					</span>

					<BaseBtnFocusSvg v-if="!!Number(item.focus)" :show="index == active" />
				</button>
				<button
					v-for="(item, index) in configStore.gameGclassList"
					:key="`gclass-key-${index}`"
					class="sys-btn btn-m shrink-0 !text-[14px] home-game-btn"
					:class="{ 'btn-highlight btn-border-fix home-menu-active': info.list.length + index == active }"
					@click="changeActive(info.list.length + index)"
				>
					<BaseIcon v-if="showIcon" :name="item.icon" class="mr-[8px] !text-[18px]" />
					{{ $pt(item.name) }}
				</button>
			</div>
		</div>
		<template v-if="currentItem.list && currentItem.list.length">
			<div v-for="(item, index) in currentItem.list" :key="index" class="pb-[24px]">
				<div v-if="!item.provider">
					<template v-if="item.title">
						<h3 class="section-title mb-[12px] home-game-category">
							<div class="flex items-center flex-1">
								<BaseIcon v-if="item.icon" :name="item.icon" class="home-game-icon" />
								<span class="text-home-white">{{ $pt(item.title) }}</span>
							</div>
							<div class="shrink-0 flex items-center">
								<button class="sys-btn btn-m btn-view-all" @click="handleClickViewAll(index)">{{ $t('NH0000') }}</button>
								<div class="flex items-center gap-[4px] ml-[6px]">
									<button class="sys-btn btn-min btn-home-next" :class="`swiper-button-prev-${index}`">
										<BaseArrowDown class="rotate-90" />
									</button>
									<button class="sys-btn btn-min btn-home-next" :class="`swiper-button-next-${index}`">
										<BaseArrowDown class="rotate-[270deg] translate-x-[2px]" />
									</button>
								</div>
							</div>
						</h3>
						<swiper
							:slides-per-view="count"
							:space-between="12"
							:loop="false"
							:slides-per-group="parseInt(`${count}`)"
							:modules="modules"
							:navigation="{
								nextEl: `.swiper-button-next-${index}`,
								prevEl: `.swiper-button-prev-${index}`, // 下一页dom节点
							}"
							class="game-list-scroll home-game"
						>
							<swiper-slide
								v-for="count in Math.ceil(item.list.length / getItemLine(item))"
								:key="`${index}-${count}`"
								class="gap-[12px] flex flex-col"
							>
								<div v-for="tpl in getItemLine(item)" :key="`${index}_${count}_${tpl}`" class="game-item">
									<BaseGameComponent
										v-if="(count - 1) * getItemLine(item) + tpl - 1 < item.list.length"
										:provider="true"
										:game="configStore.getGameByGameId(item.list[(count - 1) * getItemLine(item) + tpl - 1].game_id)"
									/>
								</div>
							</swiper-slide>
						</swiper>
					</template>

					<div v-else class="px-[12px]">
						<MobileGameList :game-list="item.list" :num="30" />
					</div>
				</div>
				<SkinProvider v-else />
			</div>
		</template>
	</section>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
		count: {
			type: Number,
			default: 3,
		},
	})
	const verticalNum = 3
	const gclassNum = 30
	const moreMap: any = reactive({})
	const getCurrentItemCount = (index: number, item: any) => {
		let setup = item.gclass ? gclassNum : verticalNum
		let key = `${active.value}_${index}`
		let len = item.list?.length || 0
		return Math.min(moreMap[key] || getItemLine(item) * setup, len)
	}
	const showIcon = computed(() => {
		return propsConf.info.list.some((el: any) => el.icon)
	})
	const updateMoreMap = (index: number, item: any) => {
		let setup = item.gclass ? gclassNum : verticalNum
		let key = `${active.value}_${index}`
		if (!moreMap[key]) {
			moreMap[key] = getItemLine(item) * setup
		}
		let max = item.list?.length || 0
		moreMap[key] += getItemLine(item) * setup
		if (moreMap[key] > max) {
			moreMap[key] = max
		}

		useHomeStore().updateRecommendKey()
	}

	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const active = ref(0)
	const getItemLine = (item: any) => {
		if (!item) return 1
		return Number(item.line) || 1
	}
	const handleClickViewAll = (index: number) => {
		useClassGameStore().toClassGame({ active: active.value, index: index })
	}
	const currentItem = computed(() => {
		if (active.value < propsConf.info.list.length) {
			return propsConf.info.list[active.value]
		} else {
			let gclass = configStore.gameGclassList[active.value - propsConf.info.list.length].gclass
			let list = configStore.gameGclassMap[gclass] || []
			return { list: [{ list: list, gclass }] }
		}
	})
	const changeActive = (index: number) => {
		active.value = index
	}
	const configStore = useSysConfigStore()
</script>
<style lang="scss" scoped>
	// .sys-btn.btn-view-all {
	// 	background: #272d38;
	// 	color: #fff;
	// 	font-size: 12px;
	// 	font-weight: 500;
	// 	border-radius: 5px;
	// 	border: none;
	// 	height: 30px;
	// }
	// .sys-btn.btn-home-next {
	// 	width: 30px;
	// 	height: 30px;
	// 	padding: 0;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	min-width: unset;
	// 	font-size: 12px;
	// 	border: none;
	// 	background-color: #272d38;
	// 	color: #8f92aa;
	// 	&:active {
	// 		opacity: 0.6;
	// 		i {
	// 			color: $second;
	// 		}
	// 	}

	// 	&.swiper-button-disabled {
	// 		background: $home-block-bg-2;
	// 		color: #8fa8aa;
	// 		pointer-events: none;
	// 	}
	// }
</style>
