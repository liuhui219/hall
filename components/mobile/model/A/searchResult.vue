<template>
	<section
		:class="[homeStore.showSearchResult ? 'top-[0]' : ' top-[100%]  invisible']"
		class="flex flex-col gap-[20px] px-[12px] pt-[10px] overflow-x-hidden overflow-y-auto w-full h-full items-center transition-all duration-300 fixed z-[360] left-0 bg-bg"
	>
		<div class="flex shrink-0 items-center w-full py-[10px] overflow-hidden gap-[5px]">
			<BaseInput
				v-if="!homeStore.focusInput"
				v-model:value="homeStore.searchText"
				:readonly="true"
				:placeholder="$t('L1043')"
				class="flex-1 shrink-0 z-[1] relative overflow-hidden search-input"
				:input-ref-bol="homeStore.showSearchResult"
				:maxlength="30"
				:autofocus="true"
				@focus="homeStore.changeShowSearch(true)"
				@keyup="handleKeyUp"
			>
				<template #prepend>
					<BaseIcon name="search" class="pl-[12px]" />
				</template>
			</BaseInput>
			<BaseInput
				v-else
				v-model:value="homeStore.searchText"
				:placeholder="$t('L1043')"
				class="flex-1 shrink-0 z-[1] relative overflow-hidden search-input"
				:input-ref-bol="homeStore.showSearchResult"
				:maxlength="30"
				:autofocus="true"
				@focus="homeStore.changeShowSearch(true)"
				@keyup="handleKeyUp"
			>
				<template #prepend>
					<BaseIcon name="search" class="pl-[12px]" />
				</template>
			</BaseInput>
			<button class="sys-btn shrink-0 !px-[15px] bg-block-bg color-text-white" @click="homeStore.closeSearch()">{{ $t('T0004') }}</button>
		</div>
		<BaseLoading v-if="timer" class="!top-[20px] !relative !m-0 !left-0 !right-0" />
		<template v-else>
			<div v-if="list && list.length" class="w-full">
				<div class="flex justify-between items-center">
					<p class="text-[14px]">{{ $t('NH0005') }}</p>
					<p class="text-second text-[12px]" v-html="$t('NH0006', { value: configStore.renderVHtmlNumber(list.length) })" />
				</div>
				<MobileGameList class="mt-[10px]" :game-list="list" :show-all="true" />
			</div>
			<template v-else>
				<div v-if="homeStore.searchText.length < 3" class="h-[42px] text-lowlight flex items-center justify-center text-[14px]">
					{{ $t('NH0001', { value: 3 }) }}
				</div>
				<div v-else class="flex w-full flex-col items-center justify-center">
					<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[25%]" />
					<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
				</div>
				<div v-if="searchHistoryList.length" class="flex w-full flex-col items-start justify-start">
					<div class="flex justify-between w-full items-center mb-[10px]">
						<p class="text-[16px] font-bold self-start">{{ $t('NH0003') }}</p>
						<BaseIcon name="delete" style="color: #565d5e; font-size: 18px" @click="clearHistory()" />
					</div>
					<div class="flex flex-wrap gap-[8px] w-full overflow-hidden h-[37px]">
						<button
							v-for="(item, index) in searchHistoryList"
							:key="index"
							class="bg-block-bg-2 text-lowlight text-[14px] h-[36px] px-[8px] flex items-center justify-center rounded-[2px] max-w-[99%]"
							@click="homeStore.updateSeachText(item)"
						>
							<p class="truncate flex-1 mr-[12px] text-[#B2BABB]">{{ item }}</p>
							<BaseIcon name="close" class="shrink-0" style="color: #565d5e" @click.stop="clearHistoryItem(index)" />
						</button>
					</div>
				</div>
				<CompGameHorizontal class="w-full" :info="{ ...info, title: 'NH0002' }" :lang="1" />
			</template>
		</template>
	</section>
</template>

<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})

	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const homeStore = useHomeStore()
	const timer: any = ref(0)
	const searchHistory = vueStorage('u_s_g_t', '')
	const searchHistoryList = computed(() => {
		return searchHistory.value.split(',').filter((el: any) => el && el.length > 3)
	})
	const clearHistory = () => {
		searchHistory.value = ''
	}
	const clearHistoryItem = (index: number) => {
		const copy = [...searchHistoryList.value]
		copy.splice(index, 1)
		searchHistory.value = copy.join(',')
	}
	// const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow]);//测试服有报错
	const list = ref([])
	watch(
		() => homeStore.searchText,
		() => {
			clearInterval(timer.value)
			timer.value = 0
			if (homeStore.searchText.length < 3) {
				list.value = []
			} else {
				timer.value = setTimeout(() => {
					const text = homeStore.searchText
					list.value = configStore.searchGameByText(text)
					if (searchHistory.value) {
						const copy = [...searchHistoryList.value]
						let index = copy.findIndex((el: any) => el == text)
						if (index > -1) {
							copy.splice(index, 1)
						}
						copy.unshift(text)
						searchHistory.value = copy.join(',')
					} else {
						searchHistory.value = homeStore.searchText
					}

					timer.value = 0
				}, 1000)
			}
		}
	)

	const handleKeyUp = (el: any) => {
		if (getSysOsNumber() == 4) {
			if (el.keyCode === 13) {
				const doc = document.activeElement as HTMLElement
				doc?.blur()
			}
		}
	}
</script>

<style scoped lang="scss">
	:deep(.input-focus) {
		background: $block-bg-2 !important;
		.input-wrap {
			border-color: $second !important;
		}
	}
</style>
