<template>
	<section v-if="info.list && info.list.length" class="home-rank">
		<h3 class="section-title mb-4 px-4">{{ $pt(info.title) }}</h3>
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
				class="winner-item"
				@click="gameStore.tryToGame(winner.game_id)"
			>
				<div class="game-cover">
					<BaseImg class="cover-img" :src="configStore.getGameByGameId(winner.game_id).src" :alt="`rank ${index}`" />
				</div>
				<div class="game-info">
					<h4 class="game-name">{{ configStore.getGameByGameId(winner.game_id).name }}</h4>
					<div class="game-provider">{{ configStore.getProviderNameByGameId(winner.game_id) }}</div>
				</div>
				<div class="dividing-line" />
				<div class="winner-info">
					<div class="winner-price">{{ configStore.currency_symbol }} {{ winner.price }}</div>
					<div class="winner-name">{{ winner.winner }}</div>
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
