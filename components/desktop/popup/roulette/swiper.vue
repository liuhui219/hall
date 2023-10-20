<template>
	<div class="m-auto shrink-0 text-[14px] h-[100px] gap-[6px] flex justify-center mt-[70px] font-medium z-[5] roulette-swiper w-[600px]">
		<div class="flex-1 overflow-hidden">
			<div class="py-[16px] px-[20px] flex flex-col justify-center h-full w-full">
				<div>{{ $t('RO0016') }}</div>
				<BasePoint :value="rouletteStore.details.total_bonus" :is-converted="false" class="roulette-swiper-total" />
			</div>
		</div>
		<div class="flex-1">
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
				:height="96"
				:autoplay="
					rouletteStore.details.bonus.length > 1
						? {
								delay: 3000,
								disableOnInteraction: false,
						  }
						: false
				"
				class="font-medium overflow-hidden relative h-full my-bonus-content"
			>
				<swiper-slide
					v-for="(item, index) in rouletteStore.details.bonus"
					:key="index"
					class="w-full px-[20px] py-[16px] !h-full flex justify-between item-center pointer"
					@click="rouletteStore.openBonusList()"
				>
					<div class="w-full h-full flex justify-center items-center">
						<BaseImg :src="useSysConfigStore().getAvatarSrc(item.avatar)" class="w-[24px] mr-[4px] shrink-0 self-start rounded-full" />
						<div class="flex flex-col h-full flex-1 !justify-between self-start !items-start">
							<div>{{ item.nick_name }}</div>
							<!-- v-if="rouletteStore.swiper0.point" -->
							<p class="text-lowlight">
								{{ $t('RO0025') }}:
								<BasePoint class="warning" :value="item.point" :is-converted="false" />
							</p>
							<p>
								<span class="text-lowlight">{{ $t('RO0026') }}&nbsp;</span>
								<span class="text-second">{{ $t(rouletteStore.keyMaps[item.key]?.title) }}</span>
							</p>
							<!-- v-else-if="rouletteStore.swiper0.item_type" -->
						</div>
						<div class="-rotate-[90deg] shrink-0 w-[22px] roulette-swiper-arrow">
							<BaseArrowDown />
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>
<script setup lang="ts">
	const rouletteStore = useRouletteStore()
	const configStore = useSysConfigStore()
	const userStore = useUserStore()

	const modules = reactive([SwiperAutoplay, SwiperEffectCoverflow])
</script>
<style scoped lang="scss">
	.roulette-swiper {
		position: absolute;
		left: 30px;
		bottom: 30px;
		z-index: 4;
		& > div {
			background: $dark-bg-03;
		}
		& > div:first-child {
			border-top-left-radius: inherit;
			border-bottom-left-radius: inherit;
		}
		& > div:last-child {
			border-top-right-radius: inherit;
			border-bottom-right-radius: inherit;
		}
		.roulette-swiper-arrow {
			color: $gray;
		}
	}
	.roulette-swiper-total {
		margin-top: 5px;
		font-size: 18px;
		color: $main;
		font-weight: 600;
	}
</style>
