<template>
	<div v-if="!configStore.gameDisabled">
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

		<swiper
			class="game-list-swiper"
			:slides-per-view="4.5"
			:space-between="14"
			:slides-per-group="4"
			:modules="modules"
			:navigation="{
				nextEl: `.swiper-button-next-provider`,
				prevEl: `.swiper-button-prev-provider`, // 下一页dom节点
			}"
		>
			<swiper-slide
				v-for="item in configStore.gplatValidSortList"
				:key="`${item.PlatId}`"
				class="game-item provider-game-item"
				@click="gamedetailStore.gotoprovider(item.PlatId)"
			>
				<BaseImg class="provider-image" :src="item.logo" :alt="item.name" />
			</swiper-slide>
		</swiper>
	</div>
</template>
<script setup lang="ts">
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const configStore = useSysConfigStore()
	const gamedetailStore = useGamedetailStore()
	const showIcon = computed(() => {
		return configStore.pageConfig?.index?.game.list.find((el: any) => el.list.some((el: any) => el.icon))
	})
</script>
