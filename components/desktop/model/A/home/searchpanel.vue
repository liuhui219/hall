<template>
	<div class="py-[48px] pl-[40px] pr-[16px] border-radius mb-[8px] max-h-[820px] min-h-[354px] home-search-wrap">
		<section class="home-nav">
			<swiper class="home-nav-swiper" :slides-per-view="'auto'" :space-between="8" :modules="modules">
				<swiper-slide v-for="(menu, index) in navlist" :key="`menu-${index}`" class="nav-item">
					<button class="sys-btn btn-m-pc" :class="{ 'btn-highlight btn-border-fix': active == index }" @click="changeActive(index)">
						{{ menu == -1 ? $t('AF0013') : $pt(configStore.getGclassName(menu)) }}
					</button>
				</swiper-slide>
			</swiper>
		</section>
		<section class="home-search-result">
			<div v-if="showlist && showlist.length" ref="gameBox" class="gameBox">
				<p class="text-[16px] font-medium text-lowlight" v-html="renderSeachResult()" />
				<div ref="gameBoxGapY" class="mt-[24px] flex flex-wrap gap-y-[24px]">
					<div
						v-for="game in showlist"
						:key="game.game_id"
						class="w-[180px] mr-[24px] game-item"
						@click="gameStore.tryToGame(game.game_id)"
					>
						<BaseGameComponent :show-mask="true" :show-detail="true" :game="game" />
					</div>
				</div>
			</div>

			<div v-else class="gameBox">
				<p v-if="text" class="text-[16px] font-medium text-lowlight">{{ $t('H0050') }}</p>
				<h3 class="font-bold text-[24px]">{{ $t('D0002') }}</h3>

				<div class="mt-[24px] flex flex-wrap gap-y-[24px]">
					<div
						v-for="game in recommendList"
						:key="game.game_id"
						class="w-[180px] mr-[24px] game-item"
						@click="gameStore.tryToGame(game.game_id)"
					>
						<BaseGameComponent :show-mask="true" :show-detail="true" :game="configStore.getGameByGameId(game.game_id)" />
					</div>
				</div>
			</div>
		</section>
		<!-- {{ clickNum + 1 }} -->
		<div v-if="listGame.length > showlist.length" class="mt-[24px] flex justify-center centerBtn">
			<button class="sys-btn btn-highlight w-[300px]" @click="showMore()">{{ $t('G0007') }}</button>
		</div>
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		text: {
			type: String,
			default: '',
		},
		list: {
			type: Array,
			default: () => [],
		},
	})
	const app = useNuxtApp() as any
	// const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow]);//测试服有报错
	const modules = reactive([])
	const active = ref(0)
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const gameBox = ref()
	const gameBoxGapY = ref()
	const clickNum = Number(configStore.pageConfig.sysConfig.pc_game_num)
	const showGameNum = ref(clickNum)
	const changeActive = (index: number) => {
		active.value = index
		showGameNum.value = navIndexList.value[index]
	}
	const list = computed(() => {
		return configStore.searchGameByText(propsConf.text)
	})

	const listGame = computed(() => {
		if (active.value == 0) {
			return list.value
		} else {
			return list.value.filter((el: any) => (el.gclass ?? 0) == navlist.value[active.value])
		}
	})

	const showlist = computed(() => {
		if (listGame.value.length > navIndexList.value[active.value]) {
			return listGame.value.slice(0, showGameNum.value)
		} else {
			return listGame.value
		}
	})

	const navlist = computed(() => {
		let result = Array.from(new Set(list.value?.map((el: any) => el.gclass ?? 0)))
		result.sort((a: any, b: any) => {
			let f = configStore.game_type_map[a]
			let m = configStore.game_type_map[b]
			return f > m ? -1 : 1
		})
		if (result.length) {
			result.unshift(-1)
		}
		return result
	})

	const navIndexList = computed(() => {
		let anvNumList = new Array(navlist.value.length).fill(clickNum)
		return anvNumList
	})
	const showMore = () => {
		if (listGame.value.length > showlist.value.length) {
			navIndexList.value[active.value] += clickNum
			showGameNum.value = navIndexList.value[active.value]
			gameBox.value.scrollTop = gameBoxGapY.value.clientHeight //修改scrolldiv的scrollTop

			// setTimeout(() => {
			// 	gameBoxGapY.value?.scrollIntoView({
			// 		behavior: "auto",
			// 		block: "end",
			// 	});
			// });
		}
	}
	const recommendList = computed(() => {
		return configStore.pageConfig.index.search.list || []
	})
	const renderSeachResult = () => {
		return app.$t('H0051', { count: listGame.value.length, search: `<span class="color-text-white">${propsConf.text}</span>` })
	}
</script>
