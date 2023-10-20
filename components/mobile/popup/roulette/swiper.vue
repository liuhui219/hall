<template>
	<div
		class="mb-[16px] mx-[16px] shrink-0 absolute h-[83px] flex-0 mt-[40px] font-medium z-[5] roulette-swiper"
		style="width: calc(100% - 32px)"
		:style="{ top }"
	>
		<div class="flex flex-col w-[50%] shrink-0 p-[16px] justify-center">
			<div class="text-[14px]">{{ $t('RO0016') }}</div>
			<BasePoint :value="rouletteStore.details.total_bonus" :is-converted="false" class="roulette-swiper-total" />
		</div>
		<swiper
			v-if="rouletteStore.details.bonus.length"
			:modules="modules"
			direction="vertical"
			:slides-per-view="`auto`"
			:speed="1200"
			:space-between="0"
			:slides-per-group="1"
			:loop="rouletteStore.details.bonus.length > 1"
			:allow-touch-move="false"
			:height="40"
			:autoplay="
				true
					? false
					: rouletteStore.details.bonus.length > 1
					? {
							delay: 3000,
							disableOnInteraction: false,
					  }
					: false
			"
			class="w-[50%] shrink-0 text-[12px] font-medium overflow-hidden my-bonus-content p-[6px] relative h-full"
		>
			<swiper-slide
				v-for="(item, index) in rouletteStore.details.bonus"
				id="current-swiper"
				:key="index"
				class="w-full p-[8px] h-full flex justify-between item-center"
				@click="rouletteStore.openBonusList()"
			>
				<div class="w-full h-full flex justify-center items-center">
					<BaseImg :src="useSysConfigStore().getAvatarSrc(item.avatar)" class="w-[22px] mr-[4px] shrink-0 self-start rounded-full" />
					<div class="flex flex-col h-full flex-1 break-all !justify-between self-start !items-start">
						<div>{{ item.nick_name }}</div>
						<!-- v-if="rouletteStore.swiper0.point" -->
						<p class="text-[12px] text-lowlight">
							{{ $t('RO0025') }}: <BasePoint class="warning" :value="item.point" :is-converted="false" :b-delete-zero-point="true" />
						</p>
						<p class="text-[12px] text-lowlight">
							{{ $t('RO0026') }} <span class="text-second">{{ $t(rouletteStore.keyMaps[item.key]?.title) }}</span>
						</p>
						<!-- v-else-if="rouletteStore.swiper0.item_type" -->
					</div>
					<div class="-rotate-[90deg] shrink-0 w-[22px]">
						<BaseArrowDown />
					</div>
				</div>
			</swiper-slide>
		</swiper>
		<div v-else class="flex-1" />
	</div>
</template>
<script setup lang="ts">
	const rouletteStore = useRouletteStore()
	const userStore = useUserStore()
	const top = computed(() => {
		return `max(92vw, 365px)`
	})
	const modules = reactive([SwiperAutoplay, SwiperEffectCoverflow])
</script>
<style scoped lang="scss">
	.roulette-swiper-total {
		margin-top: 5px;
		font-size: 18px;
		color: $main;
		font-weight: 600;
	}
</style>
