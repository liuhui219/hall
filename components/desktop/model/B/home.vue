<template>
	<div class="home-view-pc wrap pb-[48px]">
		<Component :is="componentsMap[item.key]" v-for="item in list" :key="item.key" :info="item" />
	</div>
	<SkinFooter />
</template>
<script setup lang="ts">
	import { componentFace, mapFace } from '~~/apis/types'
	defineProps({
		list: {
			type: Array<mapFace>,
			default: [],
		},
	})

	const Carousel = resolveComponent('skin/carousel')
	const Marquee = resolveComponent('skin/marquee')
	const Jackpot = resolveComponent('skin/jackpot')
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
		game: GameModule,
		pickgame: Recommend,
		ranklist: Rank,
		provider: Provider,
		promote: Promote,
		recent: Recent,
	}
</script>
