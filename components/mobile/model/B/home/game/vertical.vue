<template>
	<section class="home-game">
		<div class="flex overflow-hidden gap-[10px] pb-[24px]">
			<div class="flex flex-1 game-list-scroll gap-[8px]">
				<div v-for="(item, index) in info.list" :key="`ranking-type-${index}`" class="nav-item">
					<button
						class="sys-btn btn-m shrink-0 flex items-center justify-center !text-[14px] home-game-btn relative"
						:class="{ 'btn-highlight home-menu-active': index == active, 'home-game-btn-focus': !!Number(item.focus) }"
						@click="changeActive(index)"
					>
						<span class="relative z-[1] flex items-center justify-center">
							<BaseIcon v-if="item.icon" :name="item.icon" class="mr-[8px] !text-[18px]" />{{ $pt(item.title) }}
						</span>
						<BaseBtnFocusSvg v-if="!!Number(item.focus)" :show="index == active" />
					</button>
				</div>
				<div v-for="(item, index) in configStore.gameGclassList" :key="`ranking-type-${index}`" class="nav-item">
					<button
						:key="`gclass-key-${index}`"
						class="sys-btn btn-m shrink-0 flex items-center justify-center !text-[14px] home-game-btn"
						:class="{ 'btn-highlight home-menu-active': info.list.length + index == active }"
						@click="changeActive(info.list.length + index)"
					>
						<BaseIcon v-if="showIcon" :name="item.icon" class="mr-[8px] !text-[18px]" />{{ $pt(item.name) }}
					</button>
				</div>
			</div>
		</div>
		<template v-if="currentItem.list && currentItem.list.length">
			<div v-for="(item, index) in currentItem.list" :key="index" class="pb-[50px]">
				<template v-if="!item.provider">
					<h3 v-if="item.title" class="section-title mb-[12px] home-game-category">
						<div class="flex items-center flex-1">
							<BaseIcon v-if="item.icon" :name="item.icon" class="home-game-icon" />
							<span class="text-home-white">{{ $pt(item.title) }}</span>
						</div>
						<div class="shrink-0">
							<button class="sys-btn btn-m btn-view-all" @click="handleClickViewAll(index)">{{ $t('NH0000') }}</button>
						</div>
					</h3>
					<div class="game-list flex flex-wrap justify-between home-game">
						<div v-for="count in getCurrentItemCount(index, item)" :key="`${index}-${count}`" class="game-item">
							<BaseGameComponent :show-detail="false" :game="configStore.getGameByGameId(item.list[count - 1].game_id)" />
						</div>
					</div>
					<div class="flex justify-center game-list mt-[20px]">
						<button
							class="sys-btn w-full flex items-center justify-center color-text-white home-view-all-bottom"
							@click="updateMoreMap(index, item)"
						>
							<span class="text-[16px]">{{ $t('G0007') }}</span>
							<BaseNumber
								class="rounded-[2px] text-[11px] py-[1px] px-[4px] ml-[4px]"
								style="background-color: #373a4a; color: #b0b5c8"
								:value="item.list.length - getCurrentItemCount(index, item)"
							/>
							<BaseArrowDown class="-rotate-[90deg] ml-[12px] placeholder-color" />
						</button>
					</div>
				</template>
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
	})
	const active = ref(0)
	const verticalNum = 2
	const gclassNum = 30
	const moreMap: any = reactive({})
	const handleClickViewAll = (index: number) => {
		useClassGameStore().toClassGame({ active: active.value, index: index })
	}
	const getItemLine = (item: any) => {
		if (!item) return 1
		return Number(item.line) || 1
	}
	const getCurrentItemCount = (index: number, item: any) => {
		let setup = item.gclass ? gclassNum : verticalNum
		let key = `${active.value}_${index}`
		let len = item.list?.length || 0
		return Math.min(moreMap[key] || getItemLine(item) * setup, len)
	}
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
	const showIcon = computed(() => {
		return propsConf.info.list.some((el: any) => el.icon)
	})
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
	onDeactivated(() => {
		for (let key in moreMap) {
			moreMap[key] = 0
		}
	})
</script>
<style lang="scss" scoped>
	.sys-btn.btn-view-all {
		background: #272d38;
		color: #fff;
		font-size: 12px;
		font-weight: 500;
		border-radius: 5px;
		border: none;
		height: 30px;
	}
	.sys-btn.btn-home-next {
		width: 30px;
		height: 30px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: unset;
		font-size: 12px;
		background-color: $block-bg-2;
		color: #8fa8aa;
		&:active {
			opacity: 0.6;
			i {
				color: $second;
			}
		}

		&.swiper-button-disabled {
			background: $home-block-bg-2;
			color: #8fa8aa;
			pointer-events: none;
		}
	}
</style>
