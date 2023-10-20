<template>
	<div class="modal-roulette-rule">
		<VueFinalModal v-model="showModal" classes="modal-container" content-class="modal-content-pc roulette-rule-bonus" name="ModalRouletteRule">
			<DesktopPopupHeader :title="$t('RO0008')" :back="back" :invisible="false" />
			<div class="modal__content flex flex-col text-[14px] font-medium text-lowlight h-full overflow-auto">
				<div class="mt-[32px] roulette-rule-text" v-html="rouletteStore.currentRouletteCfgRule" />
				<!-- <div class="mt-[16px]">
					<span class="text-second">20 points to spin once</span><br />
					Roulette <span class="text-second">need 1x rollover</span>, just meet the minimum <br />
					withdrawal amount <br />
					Settlement time: <span class="text-second">6:00 am the next day</span>
				</div> -->
			</div>
		</VueFinalModal>
	</div>
</template>
<script setup lang="ts">
	const showModal = ref(false)
	const rouletteStore = useRouletteStore()
	const back = () => {
		showModal.value = false
	}
</script>
<style lang="scss" scoped>
	.roulette-rule-text {
		border-radius: 6px;
		background: $block-bg-2;
		padding: 30px 16px;
	}
</style>
