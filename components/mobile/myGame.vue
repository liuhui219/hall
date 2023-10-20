<template>
	<div class="mygame-view-mobile">
		<div class="px-[15px] pb-[36px]">
			<div class="mt-[16px] mx-[16px] flex tabs-wrap">
				<h2 class="tab" :class="{ active: mygameStore.tabId === 1 }" @click="mygameStore.changeData(1)">
					{{ $t('H0024') }}
				</h2>
				<h2 class="tab" :class="{ active: mygameStore.tabId === 0 }" @click="mygameStore.changeData(0)">
					{{ $t('H0025') }}
				</h2>
			</div>
			<div v-show="mygameStore.tabId == 0">
				<div v-if="mygameStore.favoriteData.length" class="mt-[12px] game-item-box game-items-list-wrap-mobile">
					<BaseGameComponent
						v-for="game in mygameStore.favoriteData"
						:key="'my-favorite-game-' + game"
						class="game-item"
						:show-detail="configStore.modelConfig.game_detail"
						:game="configStore.getGameByGameId(game)"
					/>
				</div>
				<p v-else class="mt-[32px] mb-[64px] text-center gray font-medium">{{ $t('RE0002') }}</p>
			</div>
			<div v-show="mygameStore.tabId == 1">
				<div v-if="mygameStore.recentlyData.length">
					<div class="mt-[12px] game-item-box game-items-list-wrap-mobile">
						<BaseGameComponent
							v-for="game in mygameStore.recentlyData"
							:key="'my-recent-game-' + game"
							class="game-item"
							:show-detail="configStore.modelConfig.game_detail"
							:game="configStore.getGameByGameId(game)"
						/>
					</div>
					<div class="mt-[32px] text-center text-[16px] font-medium">
						<p
							class="text-lowlight"
							v-html="$t('RE0001', { count: `<span class='color-text'>${mygameStore.recentlyData.length}</span>` })"
						/>
					</div>
				</div>
				<p v-else class="mt-[32px] mb-[64px] text-center gray font-medium">{{ $t('RE0002') }}</p>
			</div>

			<div v-show="mygameStore.recommendShow">
				<h3 class="font-bold text-[20px]">{{ $t('D0002') }}</h3>
				<MobileGameList class="mt-[16px]" :game-list="configStore.pageConfig.index.search.list" :show-tip="false" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const mygameStore = useMygameStore()
</script>
<style scoped lang="scss">
	.mygame-view-mobile {
		.tabs-wrap {
			.tab {
				color: $text-lowlight;
				border-bottom: 1px solid $block-bg;
				@apply p-[8px] text-[16px] font-bold w-1/2 text-center;

				&.active {
					color: $color-white;
					border-bottom: 3px solid $second;
				}
			}
		}
	}
</style>
