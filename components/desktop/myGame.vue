<template>
	<div class="wrap">
		<div class="my-[76px]">
			<h1 class="text-[48px] font-bold text-center">{{ $t('H0053') }}</h1>

			<div v-if="mygameStore.recentlyData.length" class="props pb-[48px]">
				<h2 class="text-[24px] font-bold">{{ $t('H0024') }}</h2>
				<div class="mt-[24px] game-item-box game-items-list-wrap-pc">
					<BaseGameComponent
						v-for="game in mygameStore.recentlyData"
						:key="'pragmatic-game-' + game"
						class="w-[192px] game-item"
						:game="configStore.getGameByGameId(game)"
						:show-detail="configStore.modelConfig.game_detail"
						:show-mask="true"
					/>
				</div>
				<div class="mt-[48px] text-center text-[16px] font-medium">
					<p class="text-lowlight" v-html="$t('RE0001', { count: `<span class='color-text'>${mygameStore.recentlyData.length}</span>` })" />
				</div>
			</div>
			<div v-if="mygameStore.favoriteData.length" class="mt-[48px] rewards pb-[48px]">
				<h2 class="text-[24px] font-bold">{{ $t('H0025') }}</h2>
				<div class="mt-[24px] game-item-box game-items-list-wrap-pc">
					<BaseGameComponent
						v-for="game in mygameStore.favoriteData"
						:key="'pragmatic-game-' + game"
						class="w-[192px] game-item"
						:game="configStore.getGameByGameId(game)"
						:show-detail="configStore.modelConfig.game_detail"
						:show-mask="true"
					/>
				</div>
			</div>
			<template v-if="!mygameStore.recentlyData.length && !mygameStore.favoriteData.length">
				<p class="mt-[80px] mb-[64px] text-[16px] text-center gray font-medium">{{ $t('RE0002') }}</p>
				<h3 class="font-bold text-[24px]">{{ $t('D0002') }}</h3>
				<div class="mt-[24px] game-item-box game-items-list-wrap-pc">
					<BaseGameComponent
						v-for="game in configStore.pageConfig.index.search.list"
						:key="'pragmatic-game-' + game.game_id"
						class="w-[192px] game-item"
						:game="configStore.getGameByGameId(game.game_id)"
						:show-detail="configStore.modelConfig.game_detail"
						:show-mask="true"
					/>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const mygameStore = useMygameStore()
</script>
