<template>
	<section v-if="!configStore.gameDisabled && configStore.gplatValidSortList && configStore.gplatValidSortList.length">
		<div class="flex justify-between w-full section-title">
			<div class="flex items-center flex-1">
				<BaseIcon v-if="showIcon" name="marker" class="home-game-icon" /><span class="text-home-white">{{ $t('H0004') }}</span>
			</div>
			<div class="shrink-0 flex items-center">
				<button class="sys-btn btn-m btn-view-all" @click="navigateTo('providers')">{{ $t('NH0000') }}</button>
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
		<div class="mx-[12px] mt-[16px]">
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
								class="provider-item flex items-center justify-center h-[60px] rounded-[2px] overflow-hidden"
								@click="toProvider(getPlatItem(count, index).PlatId)"
							>
								<BaseImg class="w-[70%]" :src="getPlatItem(count, index).logo" :alt="getPlatItem(count, index).name" />
							</div>
						</template>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<!-- <h3 class="section-title mb-[12px] home-game-category p-[0!important]">
			<BaseIcon v-if="info.icon" :name="info.icon" class="home-game-icon" />{{ $t('H0004') }}
		</h3> -->
		<!-- <div class="partner-list">
			
			<div v-for="n in Math.ceil(configStore.gplatValidSortList.length / 2)" :key="n" class="partner-item">
				<BaseImg
					:src="configStore.gplatValidSortList[(n - 1) * 2].logo"
					:alt="configStore.gplatValidSortList[(n - 1) * 2].name"
					@click="toProvider(configStore.gplatValidSortList[(n - 1) * 2].PlatId)"
				/>
				<BaseImg
					v-if="configStore.gplatValidSortList[n * 2 - 1]"
					:src="configStore.gplatValidSortList[n * 2 - 1].logo"
					:alt="configStore.gplatValidSortList[n * 2 - 1].name"
					@click="toProvider(configStore.gplatValidSortList[n * 2 - 1].PlatId)"
				/>
			</div>
		</div> -->
	</section>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
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
