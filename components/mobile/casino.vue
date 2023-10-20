<template>
	<div class="game-view game-view-mobile">
		<div class="px-[15px] pb-[36px] mt-[16px] relative">
			<div ref="gameTypelist" class="flex gap-[8px] game-type-list">
				<div
					v-for="item in configStore.gameGclassList"
					:key="item.key"
					:ref="setRefMap(item.gclass)"
					class="game-type-item"
					:class="{ active: item.gclass == casinoStore.active }"
					@click="casinoStore.toCasino(item)"
				>
					<i :class="[`sysicon-${item.icon}`]" />
					<p>{{ $pt(item.name) }}</p>
				</div>
			</div>
			<div class="mt-[24px] flex items-start relative z-[11]">
				<div
					v-if="casinoStore.showGplatList"
					class="relative transition-all duration-300 flex items-center"
					:class="{
						'w-full': !casinoStore.showSearchResult,
						'w-0': casinoStore.showSearchResult,
						'overflow-hidden': casinoStore.showSearchResult,
					}"
				>
					<div class="sys-select sys-select-mobile flex-1 relative">
						<div class="absolute z-[1] top-0 left-0 w-full h-full cursor-pointer" @click="casinoStore.changeShowFilter1(true)" />
						<BaseArrowDown :class="{ 'rotate-180': casinoStore.showFilter1 }" class="white" />
						<select v-model="casinoStore.gplat" class="color-text-white">
							<option :key="casinoStore.gplat" :value="casinoStore.gplat">
								{{ configStore.getProviderByPlat(casinoStore.gplat).name }}
							</option>
						</select>
						<div v-if="casinoStore.showFilter1" class="absolute top-[30px] left-0 w-full z-[2] mt-[12px] pb-[12px] border-radius">
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
					<BaseIcon name="search" class="text-[20px] gray ml-[16px]" @click="casinoStore.changeShowSearch(true)" />
				</div>

				<div
					:class="[
						casinoStore.showSearchResult ? 'w-full opacity-100 z-[2] justify-end ' : 'w-0 opacity-0 z-[0] overflow-hidden',
						casinoStore.showGplatList ? 'transition-all duration-300' : 'w-full opacity-100 z-[2] justify-end',
					]"
					class="flex flex-col items-center relative right-0 top-0"
				>
					<BaseInput
						v-model:value="casinoStore.searchText"
						class="flex-shrink-0 w-full text-[14px] absolute z-[2]"
						:placeholder="$t('T0001')"
						:clear="true"
						:input-ref-bol="casinoStore.showSearchResult && casinoStore.showGplatList"
						@focus="casinoStore.changeShowSearch(true, $event)"
						@keyup="handleKeyUp"
					>
						<template #prepend>
							<BaseIcon name="search" class="pl-[12px]" />
						</template>
					</BaseInput>
					<section
						v-show="casinoStore.showSearchResult"
						class="relative w-full top-[10px] pb-[12px] border-radius overflow-x-hidden search-result"
						@mousedown.prevent
					>
						<div class="relative px-[12px]">
							<swiper class="search-nav-swiper mt-[4px] mb-[12px]" :slides-per-view="'auto'" :space-between="24" :modules="modules">
								<swiper-slide v-for="(menu, index) in navlist" :key="`menu-${index}`" class="nav-item">
									<button
										class="py-[8px] text-[14px] tab"
										:data-text="menu == -1 ? $t('AF0013') : $pt(configStore.getGclassName(menu))"
										:class="{ active: active === index }"
										@click="changeActive(index)"
									>
										{{ menu == -1 ? $t('AF0013') : $pt(configStore.getGclassName(menu)) }}
									</button>
								</swiper-slide>
							</swiper>
							<!-- default -->
							<div v-if="!list.length">
								<p v-if="casinoStore.searchText" class="text-[12px] font-medium text-lowlight">{{ $t('H0050') }}</p>
								<p class="text-[12px] font-medium">{{ $t('D0002') }}</p>
								<div class="search-game-list-wrap show-scroll-bar">
									<div
										v-for="game in casinoStore.searchList"
										:key="`search-default-${game.game_id}`"
										class="search-game-wrap"
										@click="gotoGame(game.game_id)"
									>
										<BaseImg class="search-game-img-wrap" :src="configStore.getGameByGameId(game.game_id).src" alt="" />
										<div class="search-game-text-wrap">
											<h4 class="search-game-name">
												{{ configStore.getGameByGameId(game.game_id).name }}
											</h4>
											<p class="search-game-provider">
												{{ configStore.getProviderNameByGameId(game.game_id) }}
											</p>
										</div>
									</div>
								</div>
							</div>
							<!-- searched -->
							<div v-else>
								<template v-if="list && list.length">
									<p class="text-[12px] font-medium text-lowlight" v-html="renderSeachResult()" />
									<div class="search-game-list-wrap show-scroll-bar">
										<div
											v-for="game in showlist"
											:key="`search-result-${game.game_id}`"
											class="search-game-wrap"
											@click="gotoGame(game.game_id)"
										>
											<BaseImg class="search-game-img-wrap" :src="game.src" alt="" />
											<div class="search-game-text-wrap">
												<h4 class="search-game-name">{{ game.name }}</h4>
												<p class="search-game-provider">
													{{ configStore.getProviderByPlat(game.gplat).name }}
												</p>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</section>
				</div>
			</div>

			<MobileGameList class="mt-[24px]" :game-list="casinoStore.casinoGameListFilterGplat" />
			<div v-show="casinoStore.showSearchResult" class="search-mask" @click="casinoStore.hideSearch()" @mousedown.prevent />
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const casinoStore = useCasinoStore()
	const gameStore = useGameStore()
	const { $t } = useNuxtApp() as any
	const modules = reactive([])
	const active = ref(0)
	const gameTypelist = ref(null)
	const renderSeachResult = () => {
		return $t('H0051', { count: showlist.value.length, search: `<span class="color-text-white">${casinoStore.searchText}</span>` })
	}
	const list = computed(() => {
		return configStore.searchGameByText(casinoStore.searchText)
	})
	const changeActive = (index: number) => {
		active.value = index
		const doc = document.activeElement as HTMLElement
		doc?.blur()
	}
	const showlist = computed(() => {
		if (active.value == 0) {
			return list.value
		} else {
			return list.value.filter((el: any) => (el.gclass ?? 0) == navlist.value[active.value])
		}
	})
	const navlist = computed((): any => {
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

	const setRefMap = (gclass: String) => {
		if (gclass == casinoStore.active) {
			return 'activeleft'
		} else {
			return
		}
	}
	const handleKeyUp = (el: any) => {
		if (getSysOsNumber() == 4) {
			if (el.keyCode === 13) {
				let doc = document.activeElement as HTMLElement
				doc && doc.blur()
			}
		}
	}
	const gotoGame = (id: Number) => {
		casinoStore.searchval()
		gameStore.tryToGame(id)
	}
</script>
<style scoped lang="scss">
	.game-view.game-view-mobile {
		.game-type-list {
			overflow-x: scroll;
			scroll-behavior: smooth;
		}
		.game-type-list::-webkit-scrollbar {
			display: none;
		}
		.game-type-item {
			@apply w-[70px] shrink-0;
			i {
				font-size: 18px;
			}
			p {
				font-size: 12px;
				text-align: center;
			}
		}
		.filter-list {
			@apply py-[8px];
			max-height: 150px;
			overflow-y: scroll;
			.filter-item {
				@apply py-[4px] px-[12px] text-[12px];
			}
		}

		.search-game-list-wrap {
			max-height: min(50vh, 240px);
			overflow-x: hidden;
			overflow-y: auto;
			@apply mt-[12px] flex flex-col gap-[12px];
			.search-game-wrap {
				@apply flex gap-[24px];
			}
			.search-game-img-wrap {
				border-radius: $border-radius;
				@apply w-[36px] overflow-hidden;
			}
			.search-game-text-wrap {
				@apply flex flex-col;
			}
			.search-game-name {
				@apply text-[14px] font-medium;
				color: $color-white;
			}
			.search-game-provider {
				color: $text-lowlight;
				@apply text-[12px] font-medium;
			}
		}
	}
</style>
