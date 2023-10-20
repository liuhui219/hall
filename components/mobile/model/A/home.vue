<template>
	<div class="home-view">
		<div class="relative flex flex-col gap-[15px] pt-[10px]">
			<Component :is="componentsMap[item.key]" v-for="item in list" :key="item.key" :info="item" />
			<SkinFooter />
			<!-- <div v-show="homeStore.showSearchResult" class="search-mask" @click="homeStore.changeShowSearchResult()" /> -->
		</div>
	</div>
</template>
<script setup lang="ts">
	import { componentFace, urlConfig } from '~~/apis/types'
	const propsConf = defineProps({
		list: {
			type: Array<urlConfig>,
			default: () => [],
		},
	})

	const homeStore = useHomeStore()
	// const configStore = useSysConfigStore()
	// const liveChatReady = useLiveChatReady() //live-chat的状态
	const Carousel = resolveComponent('skin/carousel')
	const Marquee = resolveComponent('skin/marquee')
	const Jackpot = resolveComponent('skin/jackpot')
	const Search = resolveComponent('skin/search')
	const GameModule = resolveComponent('skin/gameModule')
	const Recommend = resolveComponent('skin/recommend')
	const Rank = resolveComponent('skin/rank')
	const Provider = resolveComponent('skin/provider')
	const Promote = resolveComponent('skin/promote')
	const Recent = resolveComponent('skin/recent')
	const componentsMap: componentFace = {
		banner: Carousel,
		marquee: Marquee,
		jackpot: Jackpot,
		search: Search,
		game: GameModule,
		pickgame: Recommend,
		ranklist: Rank,
		provider: Provider,
		promote: Promote,
		recent: Recent,
	}
</script>
