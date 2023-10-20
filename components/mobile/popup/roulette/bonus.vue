<template>
	<div class="modal-roulette-my-bonus modal-roulette-my-bonus-mobile" :style="{ height: showModal ? '100%' : '0' }">
		<VueFinalModal v-model="showModal" classes="modal-rule" content-class="roulette-bonus-content" name="ModalRouletteMyBonus">
			<SkinHeader :is-home="false" :title="$t('RO0019')" :back="closed" />
			<div class="modal__content flex-1 overflow-hidden flex flex-col text-[12px] font-medium color-text roulette-bonus-swiper">
				<div class="mt-[20px] flex-1 flex flex-col overflow-hidden">
					<div class="card-block flex-1 px-[16px] pb-[12px] flex flex-col overflow-hidden">
						<div class="px-[10px] py-[12px] gap-[8px] flex justify-between shrink-0 font-bold color-text-white">
							<p class="w-[110px]">{{ $t('RO0020') }}</p>
							<p class="w-[100px] shrink-0 text-center">{{ $t('RO0021') }}</p>
							<p class="flex-1 text-right">{{ $t('RO0022') }}</p>
						</div>
						<swiper
							v-if="rouletteStore.details.bonus.length && showModal"
							:key="`roulette_bonus_${rouletteStore.details.bonus.length}`"
							:modules="modules"
							direction="vertical"
							class="w-full"
							:loop="rouletteStore.details.bonus.length > 30"
							:allow-touch-move="false"
							:height="40"
							:speed="600"
							:autoplay="
								rouletteStore.details.bonus.length > 30
									? {
											delay: 1200,
											disableOnInteraction: false,
									  }
									: false
							"
							:slides-per-view="`auto`"
							:space-between="0"
							:slides-per-group="1"
						>
							<swiper-slide v-for="(bonus, index) in rouletteStore.details.bonus" :key="index" class="roulette-bonus-slide">
								<div class="px-[10px] gap-[8px] h-[40px] flex justify-between items-center">
									<p class="w-[110px] shrink-0 truncate whitespace-nowrap">{{ bonus.nick_name }}</p>
									<div class="w-[100px] shrink-0 flex items-center justify-center gap-[4px]">
										<!-- <p class="w-[16px] shrink-0">
										<BaseImg
											:src="getResConfigImage(rouletteStore.keyMaps[bonus.key].fixed + '_icon', ImageKeyEnum.roulette)"
											alt=""
										/>
									</p>
									 -->
										{{ $t(rouletteStore.keyMaps[bonus.key].title) }}
									</div>
									<div class="flex-1 text-right text-second whitespace-nowrap truncate">
										+ <BasePoint :value="bonus.point" :is-converted="false" />
									</div>
								</div>
							</swiper-slide>
						</swiper>
					</div>
				</div>
			</div>
		</VueFinalModal>
	</div>
</template>
<script lang="ts" setup>
	const rouletteStore = useRouletteStore()
	const showModal = ref(false)
	function closed() {
		showModal.value = false
	}

	const modules = reactive([SwiperAutoplay, SwiperEffectCoverflow])
</script>

<style lang="scss" scoped>
	.roulette-bonus-swiper {
		position: relative;
		&::after {
			content: '';
			height: 60px;
			width: 100%;
			background: linear-gradient(180deg, rgba(38, 40, 40, 0) 0%, #262828 100%);
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 1;
		}
	}
	:deep(.roulette-bonus-content) {
		@apply px-[15px] mx-0 h-full  overflow-hidden flex flex-col;
	}
</style>
