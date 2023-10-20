<template>
	<section v-if="info.list && info.list.length" class="home-rank">
		<h3 class="section-title">{{ $pt(info.title) }}</h3>
		<swiper
			v-if="info.list[0] && $pt(info.list[0].title)"
			class="home-rank-swiper"
			:slides-per-view="'auto'"
			:space-between="8"
			:modules="modules"
		>
			<swiper-slide v-for="(item, index) in info.list" :key="`ranking-type-${index}`" class="nav-item">
				<button class="sys-btn btn-m" :class="{ 'btn-highlight btn-border-fix': index == active }" @click="changeActive(index)">
					{{ $pt(item.title) }}
				</button>
			</swiper-slide>
		</swiper>

		<div class="winner-list">
			<div
				v-for="(winner, index) in configStore.getGameListFilter(info.list[active].list)"
				:key="`ranking-winner-${index}`"
				class="winner-item pointer"
				@click="gameStore.tryToGame(winner.game_id)"
			>
				<div class="game-cover">
					<BaseImg class="cover-img" :src="configStore.getGameByGameId(winner.game_id).src" :alt="`rank ${index}`" />
				</div>
				<div class="game-info">
					<p class="game-name">{{ configStore.getGameByGameId(winner.game_id).name }}</p>
					<p class="text-lowlight">{{ configStore.getProviderNameByGameId(winner.game_id) }}</p>
					<p class="text-lowlight">{{ winner.winner }}</p>
					<p class="text-right text-second">{{ configStore.currency_symbol }} {{ winner.price }}</p>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})

	const active = ref(0)
	const changeActive = (index: number) => {
		active.value = index
	}
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
</script>
