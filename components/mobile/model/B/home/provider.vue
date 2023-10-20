<template>
	<section v-if="!configStore.gameDisabled && configStore.gplatValidSortList && configStore.gplatValidSortList.length && !type">
		<div class="flex justify-between w-full section-title !px-[15px]">
			<div class="flex items-center flex-1">
				<BaseIcon v-if="showIcon" name="marker" class="home-game-icon" /><span class="text-home-white">{{ $t('H0004') }}</span>
			</div>
			<div class="shrink-0 flex items-center">
				<div class="flex items-center gap-[4px] ml-[6px]">
					<button class="sys-btn btn-min btn-home-next swiper-button-prev-provider">
						<BaseArrowDown class="rotate-90" />
					</button>
					<button class="sys-btn btn-min btn-home-next swiper-button-next-provider">
						<BaseArrowDown class="rotate-[270deg] translate-x-[2px]" />
					</button>
				</div>
			</div>
		</div>
		<div class="mx-[15px] mt-[16px]">
			<swiper
				:navigation="{
					nextEl: `.swiper-button-next-provider`,
					prevEl: `.swiper-button-prev-provider`, // 下一页dom节点
				}"
				:modules="modules"
			>
				<swiper-slide v-for="count in Math.ceil(configStore.gplatValidSortList.length / 4)" :key="count">
					<div class="grid grid-cols-2 gap-[10px]">
						<template v-for="index in [0, 1, 2, 3]">
							<div
								v-if="getPlatItem(count, index).PlatId != null"
								:key="index"
								:data-index="index"
								:data-count="count"
								class="provider-item flex items-center justify-center h-[60px] rounded-[10px] overflow-hidden"
								@click="toProvider(getPlatItem(count, index).PlatId)"
							>
								<BaseImg class="w-[70%]" :src="getPlatItem(count, index).logo" :alt="getPlatItem(count, index).name" />
							</div>
						</template>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<div class="mx-[15px]">
			<button
				class="sys-btn w-full flex items-center justify-center mt-[20px] color-text-white home-view-all-bottom"
				@click="navigateTo('providers')"
			>
				<span class="text-[16px]">{{ $t('NH0000') }}</span>
			</button>
		</div>
	</section>
	<section v-if="!configStore.gameDisabled && configStore.gplatValidSortList && configStore.gplatValidSortList.length && type">
		<div class="flex justify-between w-full section-title">
			<div class="flex items-center flex-1">
				<BaseIcon v-if="showIcon" name="marker" class="home-game-icon" /><span class="text-home-white">{{ $t('H0004') }}</span>
			</div>
			<div class="shrink-0 flex items-center">
				<button class="sys-btn btn-m btn-view-all" @click="navigateTo('providers')">{{ $t('NH0000') }}</button>
			</div>
		</div>
		<div class="mx-[15px] mt-[16px]">
			<swiper
				:navigation="{
					nextEl: `.swiper-button-next-provider`,
					prevEl: `.swiper-button-prev-provider`, // 下一页dom节点
				}"
				:modules="modules"
			>
				<swiper-slide v-for="count in Math.ceil(configStore.gplatValidSortList.length / 4)" :key="count">
					<div class="grid grid-cols-2 gap-[10px]">
						<template v-for="index in [0, 1, 2, 3]">
							<div
								v-if="getPlatItem(count, index).PlatId != null"
								:key="index"
								:data-index="index"
								:data-count="count"
								class="provider-item flex items-center justify-center h-[60px] rounded-[10px] overflow-hidden"
								@click="toProvider(getPlatItem(count, index).PlatId)"
							>
								<BaseImg class="w-[70%]" :src="getPlatItem(count, index).logo" :alt="getPlatItem(count, index).name" />
							</div>
						</template>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<!-- <div class="mx-[15px]">
			<button
				v-show="showCount < configStore.gplatValidSortList.length"
				class="sys-btn w-full flex items-center justify-center mt-[20px] color-text-white home-view-all-bottom"
				@click="showMore"
			>
				<span class="text-[16px]">{{ $t('G0007') }}</span>
				<BaseNumber class="rounded-[10px] text-[11px] py-[1px] px-[4px] ml-[4px]" :value="configStore.gplatValidSortList.length" />
				<BaseArrowDown class="-rotate-[90deg] ml-[12px] placeholder-color" />
			</button>
		</div> -->
	</section>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()

	// const baseCount = 2
	// const baseLine = 3
	// const showCount = ref(6)
	// const showMore = () => {
	// 	let newCount = Math.min(configStore.gplatValidSortList.length, showCount.value + baseCount * baseLine)
	// 	showCount.value = newCount
	// }
	defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
	const type = computed(() => {
		return !!configStore.pageConfig?.index?.game?.type
	})
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const showIcon = computed(() => {
		return configStore.pageConfig?.index?.game.list.find((el: any) => el.list.some((el: any) => el.icon))
	})
	const getPlatItem = (count: number, index: number) => {
		const target = (count - 1) * 4 + index
		return configStore.gplatValidSortList[target] || {}
	}
</script>
<style lang="scss" scoped>
	.provider-item {
		background: $home-block-bg-2;
	}
</style>
