<template>
	<div class="game-view wrap">
		<div class="my-[48px]">
			<div class="mt-[48px] flex gap-[16px] game-type-list">
				<div
					v-for="item in configStore.gameGclassList"
					:key="item.key"
					class="game-type-item"
					:class="{ active: item.gclass == casinoStore.active }"
					@click="casinoStore.toCasino(item)"
				>
					<BaseIcon :name="item.icon" />
					<p>{{ $pt(item.name) }}</p>
				</div>
			</div>

			<div class="mt-[48px] flex gap-[24px]">
				<BaseInput
					v-model:value="casinoStore.searchText"
					class="flex-shrink-0 transition-all duration-300 text-[14px]"
					:class="casinoStore.showSearchResult || !casinoStore.showGplatList ? 'w-full' : 'w-[410px]'"
					:placeholder="$t('T0001')"
					:clear="true"
					@click="casinoStore.showSearchResult = true"
				>
					<template #prepend>
						<BaseIcon name="search" class="pl-[12px]" />
					</template>
				</BaseInput>
				<section
					v-if="casinoStore.showSearchResult"
					class="absolute z-[2] mt-[52px] mb-[24px] border-radius w-[1280px] card-block search-result"
				>
					<div class="fixed z-[1] w-screen h-screen top-0 left-0" @click="casinoStore.hideSearch()" />
					<div class="relative z-[1] px-[12px]">
						<DesktopSearchpanel class="mt-[12px]" :list="casinoStore.searchList" :text="casinoStore.searchText" />
					</div>
				</section>
				<div v-if="!casinoStore.showSearchResult && casinoStore.showGplatList" class="relative w-full">
					<div class="sys-select sys-select-pc">
						<BaseArrowDown :class="{ 'rotate-180': casinoStore.showFilter1 }" class="white" />
						<select v-model="casinoStore.gplat" class="color-text-white">
							<option :key="casinoStore.gplat" :value="casinoStore.gplat">
								{{ configStore.getProviderByPlat(casinoStore.gplat).name }}
							</option>
						</select>
					</div>
					<div class="absolute top-0 left-0 w-full h-full cursor-pointer" @click="casinoStore.changeShowFilter1(true)" />
					<div v-if="casinoStore.showFilter1" class="absolute w-full z-[2] mt-[12px] pb-[12px] border-radius">
						<div class="fixed z-[1] w-screen h-screen top-0 left-0" @click="casinoStore.changeShowFilter1(false)" />
						<div class="filter-list">
							<div
								v-for="(plat, key) in casinoStore.casinoGplatList"
								:key="key"
								class="filter-item"
								@click="casinoStore.filterSel(plat)"
							>
								<p class="filter-item-title">{{ configStore.getProviderByPlat(plat).name }}</p>
								<p class="filter-item-number">{{ casinoStore.casinoGplatGameLen(plat) }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<DesktopGameList v-if="!casinoStore.showSearchResult" class="mt-[32px]" :game-list="casinoStore.casinoGameListFilterGplat" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const casinoStore = useCasinoStore()
</script>
<style scoped lang="scss">
	.game-view {
		.game-type-item {
			@apply w-full cursor-pointer;
			i {
				font-size: 36px;
			}
			p {
				@apply text-[16px] font-medium;
			}
		}
		.filter-list {
			@apply py-[16px];
			.filter-item {
				@apply py-[8px] px-[24px] text-[16px] cursor-pointer;
				&:hover {
					background: $block-bg;
				}
			}
		}
	}
</style>
