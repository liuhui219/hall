<template>
	<div v-if="info.list && info.list.length" class="flex flex-col">
		<section class="horizontal-select">
			<swiper :slides-per-view="'auto'" :slides-per-group="1" :space-between="15" :modules="modules">
				<swiper-slide
					v-for="(item, index) in info.list"
					:key="`horizontal-game-${index}`"
					class="horizontal-select-item"
					@click="changeActive(index)"
				>
					<button
						class="sys-btn btn-m shrink-0 w-full flex items-center justify-center relative"
						:class="{ active: index == active, 'home-game-btn-focus': !!Number(item.focus) }"
					>
						<span class="relative z-[1] flex items-center justify-center"
							><BaseIcon v-if="item.icon" :name="item.icon" /> {{ $pt(item.title) }}</span
						>
						<BaseBtnFocusSvg v-if="!!Number(item.focus)" :show="index == active" />
					</button>
				</swiper-slide>
				<swiper-slide v-for="(item, index) in configStore.gameGclassList" :key="`gclass-key-${index}`" class="horizontal-select-item">
					<button
						class="sys-btn btn-m shrink-0 w-full flex items-center justify-center"
						:class="{ active: info.list.length + index == active }"
						@click="changeActive(info.list.length + index)"
					>
						<BaseIcon v-if="showIcon" :name="item.icon" />
						{{ $pt(item.name) }}
					</button>
				</swiper-slide>
			</swiper>
			<DesktopModelAHomeSearch
				v-if="!configStore.pageConfig?.index?.search?.hide"
				class="ml-[24px] max-w-[320px] w-[25%]"
				:info="configStore.pageConfig?.index?.search"
			/>
		</section>
		<section class="home-rank w-full gap-y-[40px] flex flex-col">
			<section v-for="(item, index) in renderList" :key="`gc_${active}_${index}`" class="home-game">
				<template v-if="!item.provider">
					<template v-if="item.title">
						<div class="flex justify-between w-full section-title">
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
						</div>

						<swiper
							class="game-list-swiper"
							:slides-per-view="6"
							:space-between="24"
							:slides-per-group="6"
							:navigation="{
								nextEl: `.swiper-button-next-${index}`,
								prevEl: `.swiper-button-prev-${index}`, // 下一页dom节点
							}"
							:grab-cursor="true"
							:modules="modules"
						>
							<swiper-slide v-for="count in item.line_count" :key="`${index}-${count}`">
								<div class="flex flex-col gap-y-[24px]">
									<div v-for="tpl in item.line" :key="`${index}_${count}_${tpl}`" class="game-item">
										<BaseGameComponent
											v-if="(count - 1) * item.line + tpl - 1 < item.list.length"
											:show-mask="true"
											:provider="true"
											:game="configStore.getGameByGameId(item.list[(count - 1) * item.line + tpl - 1].game_id)"
										/>
									</div>
								</div>
							</swiper-slide>
						</swiper>
					</template>
					<template v-else>
						<!-- <div class="game-list flex flex-wrap home-game">
							<div
								v-for="count in getCurrentItemCount(index, item)"
								:key="`${index}-${item.list[count - 1].game_id}`"
								class="game-item"
							>
								<BaseGameComponent :provider="true" :game="item.list[count - 1]" />
							</div>
						</div>
						<div class="flex justify-center">
							<button v-show="getCurrentItemCount(index, item) < item.list.length" class="sys-btn" @click="updateMoreMap(index, item)">
								{{ $t('G0007') }}
							</button>
						</div> -->
						<DesktopGameList :game-list="item.list" :num="30" />
					</template>
				</template>
				<SkinProvider v-else />
			</section>
		</section>
	</div>
</template>
<script setup lang="ts">
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
	const active = ref(0)

	const moreMap: any = reactive({})
	const getItemLine = (item: any) => {
		if (!item) return 1
		return Number(item.line) || 1
	}
	const showIcon = computed(() => {
		return propsConf.info.list.some((el: any) => el.icon)
	})
	const handleClickViewAll = (index: number) => {
		useClassGameStore().toClassGame({ active: active.value, index: index })
	}
	const renderList = computed(() => {
		const result = currentItem.value.list.map((el: any) => {
			const list = configStore.getGameListFilter(el.list)
			const line = getItemLine(el)
			return {
				title: el.title,
				list: list,
				line: line,
				provider: el.provider,
				icon: el.icon,
				focus: el.focus,
				line_count: Math.ceil(list.length / line),
			}
		})
		return result || []
	})
	const currentItem = computed(() => {
		if (active.value < propsConf.info.list.length) {
			return propsConf.info.list[active.value]
		} else {
			let gclass = configStore.gameGclassList[active.value - propsConf.info.list.length].gclass
			let list = configStore.gameGclassMap[gclass] || []

			return { list: [{ list: list }], gclass }
		}
	})

	const changeActive = (index: number) => {
		active.value = index
	}

	const configStore = useSysConfigStore()
</script>
<style lang="scss" scoped>
	:deep(.game-items-wrap-pc) {
		margin-top: 0;
	}
	.horizontal-select {
		border-radius: 6px;
		background: $home-block-bg-2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70px;
		overflow: hidden;
		padding: 0 13px 0 10px;
		margin-bottom: 30px;

		.swiper {
			height: 100%;
			flex: 1;
			.swiper-slide {
				width: auto;
			}
		}

		.horizontal-select-item {
			display: flex;
			align-items: center;

			button {
				border: none;
				border-radius: $border-radius;
				font-size: 14px;
				flex-shrink: 0;
				min-width: 110px;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 10px;

				i {
					font-size: 20px;
					margin-right: 8px;
				}
				&.active {
					background: $home-second;
					color: $home-text-button;
					font-weight: 700;
				}
				&.home-game-btn-focus {
					color: $home-main;
					&.active {
						background: $home-main;
						color: $home-text-button;
					}
				}
				&:not(.active, .home-game-btn-focus):hover {
					color: $home-white;
				}
			}
		}
	}
</style>
