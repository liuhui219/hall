<template>
	<section
		:class="{ 'search-active': homeStore.showSearchResult }"
		class="search-result-pc top-[100%] invisible h-full fixed z-[3]"
		:style="styles"
		@click="homeStore.closeSearch()"
	>
		<div class="wrap px-[30px] flex flex-col min-h-[360px] max-h-[80%] overflow-hidden">
			<div
				class="w-full shrink-0 pb-[40px] items-center search-result-content overflow-hidden flex flex-col gap-[20px]"
				style="flex: 1"
				@click.stop="() => {}"
			>
				<div class="px-[27px] flex shrink-0 items-center w-full mt-[2px] py-[25PX] overflow-hidden gap-[20px]">
					<BaseInput
						v-if="!homeStore.focusInput"
						v-model:value="homeStore.searchText"
						:readonly="true"
						:placeholder="$t('L1043')"
						class="flex-1 shrink-0 z-[1] relative overflow-hidden search-result-input mt-[1px]"
						:input-ref-bol="homeStore.showSearchResult"
						:maxlength="30"
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
						:autofocus="true"
						:placeholder="$t('L1043')"
						class="flex-1 shrink-0 z-[1] relative overflow-hidden search-result-input mt-[1px]"
						:input-ref-bol="homeStore.showSearchResult"
						:maxlength="30"
						@focus="homeStore.changeShowSearch(true)"
						@keyup="handleKeyUp"
					>
						<template #prepend>
							<BaseIcon name="search" class="pl-[12px]" />
						</template>
					</BaseInput>
					<button class="sys-btn shrink-0 min-w-[140px] bg-block-bg color-text-white !h-[50px]" @click="homeStore.closeSearch()">
						{{ $t('T0004') }}
					</button>
				</div>
				<BaseLoading v-if="timer" class="!top-[0] !relative !m-[60px] !left-0 !right-0" />
				<template v-else>
					<div v-if="list && list.length" class="w-full flex-1 flex flex-col px-[27px] overflow-auto show-scroll-bar">
						<CompGameHorizontal
							:show-detail="false"
							:provider="false"
							class="w-full"
							:info="{
								list: list,
								title: $t('NH0001', { value: 3 }),
							}"
							:lang="0"
							:num="8"
						>
							<template #right>
								<p class="text-second text-[14px]" v-html="$t('NH0006', { value: configStore.renderVHtmlNumber(list.length) })" />
							</template>
						</CompGameHorizontal>
					</div>
					<template v-else>
						<div
							v-if="homeStore.searchText.length < 3"
							class="shrink-0 px-[27px] h-[42px] text-lowlight flex items-center justify-center text-[14px]"
						>
							{{ $t('NH0001', { value: 3 }) }}
						</div>
						<div v-else class="px-[27px] flex w-full shrink-0 flex-col items-center justify-center">
							<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[93px]" />
							<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
						</div>
						<div v-if="searchHistoryList.length" class="flex px-[27px] w-full flex-col shrink-0 items-start justify-start">
							<div class="flex justify-between w-full items-center mb-[10px]">
								<p class="text-[16px] font-bold self-start">{{ $t('NH0003') }}</p>
								<BaseIcon name="delete" style="color: #565d5e; font-size: 20px" @click="clearHistory()" />
							</div>
							<div class="flex shrink-0 gap-[8px] h-[37px] w-full overflow-hidden flex-wrap">
								<button
									v-for="(item, index) in searchHistoryList"
									:key="index"
									class="bg-bg text-lowlight text-[14px] h-[36px] px-[8px] flex items-center justify-center rounded-[4px] max-w-[99%]"
									@click="homeStore.updateSeachText(item)"
								>
									<p class="truncate flex-1 mr-[12px] text-[#B2BABB]">{{ item }}</p>
									<BaseIcon name="close" class="shrink-0" style="color: #565d5e" @click.stop="clearHistoryItem(index)" />
								</button>
							</div>
						</div>
						<CompGameHorizontal
							:show-detail="false"
							:provider="false"
							class="w-full shrink-0 flex-1 px-[27px]"
							:info="{ ...info, title: 'NH0002' }"
							:lang="1"
							:num="7"
						/>
					</template>
				</template>
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
	const navigationStore = useNavigationStore()
	const styles = computed(() => {
		const left = navigationStore.mobileNavShow ? '281px' : '64px'
		return {
			left: left,
			width: `calc(100% - ${left})`,
		}
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

	.search-result-pc {
		backdrop-filter: blur(5px);
		background: rgba(0, 0, 0, 0.5);

		.search-result-content {
			margin-top: 30px;
			border: 1px solid #323c3c;
			background: $home-block-bg-2;
			border-radius: 6px;
			box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
		}
		&.search-active {
			transition: all 0.3s;
			top: $pc-header-height;
			visibility: visible;
		}
	}
</style>
