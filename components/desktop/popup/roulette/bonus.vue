<template>
	<div class="modal-roulette-my-bonus">
		<VueFinalModal v-model="showModal" classes="modal-container" content-class="modal-content-pc roulette-rule-bonus" name="ModalRouletteMyBonus">
			<section class="modal-header">
				<div class="flex justify-between w-full">
					<button class="modal__close" @click="closed()">
						<BaseIcon name="arrow-left" class="text-lowlight text-[24px]" />
					</button>
				</div>
				<h3 class="modal__title section-title text-center">{{ $t('RO0019') }}</h3>
			</section>
			<div class="modal__content flex flex-col text-[14px] font-medium color-text flex-1 overflow-hidden roulette-bonus-swiper">
				<div class="mt-[32px] flex-1 flex flex-col overflow-hidden">
					<div class="card-block px-[16px] flex-1 flex flex-col overflow-hidden">
						<div class="px-[20px] py-[12px] gap-[8px] flex justify-between font-bold color-text-white">
							<p class="flex-1">{{ $t('RO0020') }}</p>
							<p class="flex-1 text-center">{{ $t('RO0021') }}</p>
							<p class="flex-1 text-right">{{ $t('RO0022') }}</p>
						</div>
						<swiper
							v-if="rouletteStore.details.bonus.length && showModal"
							:key="`roulette_bonus_${rouletteStore.details.bonus.length}`"
							:modules="modules"
							direction="vertical"
							class="w-full"
							:speed="600"
							:loop="rouletteStore.details.bonus.length > 30"
							:allow-touch-move="false"
							:height="40"
							:autoplay="
								rouletteStore.details.bonus.length > 30
									? {
											delay: 1000,
											disableOnInteraction: false,
									  }
									: false
							"
							:slides-per-view="`auto`"
							:space-between="0"
							:slides-per-group="1"
						>
							<swiper-slide v-for="(bonus, index) in rouletteStore.details.bonus" :key="index" class="roulette-bonus-slide">
								<div class="px-[20px] gap-[8px] h-[40px] flex justify-between items-center text-lowlight">
									<p class="flex-1 shrink-0 truncate whitespace-nowrap">{{ bonus.nick_name }}</p>
									<div class="flex-1 shrink-0 flex items-center justify-center gap-[4px]">
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
	const modules = reactive([SwiperAutoplay, SwiperEffectCoverflow])
	const showModal = ref(false)
	const rouletteStore = useRouletteStore()
	function closed() {
		showModal.value = false
	}
</script>
<style scoped lang="scss">
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
</style>
