<template>
	<div>
		<h3 class="game-container-title">
			<div>
				<BaseIcon v-if="info.icon" :name="info.icon" class="home-game-icon" />
				<span>{{ lang == 2 ? $pt(info.title) : lang == 1 ? $t(info.title) : info.title }}</span>
			</div>
			<slot name="right">
				<div class="flex items-center gap-[4px]">
					<button class="sys-btn btn-min btn-home-next" :class="buttonClass.prev">
						<BaseArrowDown class="rotate-90" />
					</button>
					<button class="sys-btn btn-min btn-home-next" :class="buttonClass.next">
						<BaseArrowDown class="rotate-[270deg] translate-x-[2px]" />
					</button>
				</div>
			</slot>
		</h3>
		<swiper
			v-if="!$slots.right"
			:slides-per-view="num"
			:slides-per-group="num"
			:space-between="12"
			:loop="false"
			:modules="modules"
			:navigation="{
				nextEl: '.' + buttonClass.next,
				prevEl: '.' + buttonClass.prev, // 下一页dom节点
			}"
			class="game-list-container !mx-[0] gap-[12px]"
			:class="[`grid-cols-${num}`]"
		>
			<swiper-slide v-for="count in Math.ceil(gameList.length / line)" :key="`${count}`" class="gap-[12px] flex flex-col">
				<div v-for="tpl in line" :key="`${count}_${tpl}`" class="game-item">
					<BaseGameComponent
						v-if="(count - 1) * line + tpl - 1 < gameList.length"
						class="relative"
						:provider="provider"
						:show-detail="showDetail"
						:game="configStore.getGameByGameId(gameList[(count - 1) * line + tpl - 1].game_id)"
					/>
				</div>
			</swiper-slide>
		</swiper>
		<div v-else class="!mx-[0] gap-[12px] game-list-grid" :style="gridClass">
			<div v-for="count in Math.ceil(gameList.length / line)" :key="`${count}`" class="gap-[12px] flex flex-col">
				<div v-for="tpl in line" :key="`${count}_${tpl}`" class="game-item">
					<BaseGameComponent
						v-if="(count - 1) * line + tpl - 1 < gameList.length"
						class="relative"
						:provider="provider"
						:show-detail="showDetail"
						:game="configStore.getGameByGameId(gameList[(count - 1) * line + tpl - 1].game_id)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { uuid } from 'vue3-uuid'

	interface game {
		game_id: number | string
	}
	interface HomeGameHorizontalData {
		list: Array<game>
		title: string
		icon?: string
	}
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const configStore = useSysConfigStore()
	const propsConf = defineProps({
		info: {
			type: Object,
			default: (): HomeGameHorizontalData => {
				return {
					list: [],
					title: '',
					icon: '',
				}
			},
		},
		keys: {
			type: String,
			default: uuid.v1(),
		},
		lang: {
			type: Number,
			//0不翻译 1 $t { en-us: es-us: } 2 $pt {1: 11:}
			default: 1,
		},
		viewAll: {
			type: Boolean,
			default: true,
		},
		num: {
			type: Number,
			default: 3,
		},
		provider: {
			type: Boolean,
			default: true,
		},
		showDetail: {
			type: Boolean,
			default: true,
		},
	})
	const gridClass = computed(() => {
		return {
			display: 'grid',
			'grid-template-columns': 'repeat(8, 1fr)',
		}
	})
	const buttonClass = computed(() => {
		return { prev: `swiper-button-prev-${propsConf.keys}`, next: `swiper-button-next-${propsConf.keys}` }
	})
	const gameList = computed(() => {
		return propsConf.info?.list
	})
	const line = computed(() => {
		if (!propsConf.info || !Number(propsConf.info.line)) {
			return 1
		}
		return Number(propsConf.info.line)
	})
</script>

<style scoped lang="scss">
	.game-list-container {
		margin-top: 12px;
		.game-item {
			border-radius: $border-game-radius;
			overflow: hidden;
		}
	}
	.game-container-title {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 12px;
		// line-height: 1;
		width: 100%;
		display: flex;
		height: 36px;
		justify-content: space-between;
		align-items: center;
		color: $color-white;
	}
	#root-p {
		.game-container-title {
			font-size: 20px;
		}
		.game-list-container {
			margin-top: 24px;
		}
		.game-list-grid {
			margin-top: 40px;
		}
	}
	// .sys-btn.btn-home-next {
	// 	width: 30px;
	// 	height: 36px;
	// 	padding: 0;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	min-width: unset;
	// 	font-size: 16px;
	// 	background-color: $block-bg-2;
	// 	color: #8fa8aa;
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
	.home-search-input {
		height: 36px;
		.input-wrap {
			height: 36px;
			border: none;
		}
	}
</style>
