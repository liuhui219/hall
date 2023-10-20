<template>
	<div class="modal-roulette-rule">
		<VueFinalModal v-model="showModal" classes="modal-rule" content-class="roulette-rule-content" name="ModalRouletteRule">
			<SkinHeader :is-home="false" :title="$t('RO0008')" :back="back" />
			<div class="modal__content flex flex-col text-[14px] font-medium text-lowlight">
				<div class="mt-[19px] roulette-rule-text" v-html="rouletteStore.currentRouletteCfgRule" />
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
	:deep(.roulette-rule-content) {
		@apply px-[15px] mx-0 h-full overflow-y-auto overflow-x-hidden pb-[24px];
	}
	.roulette-rule-text {
		border-radius: 6px;
		background: $block-bg-2;
		padding: 15px 9px;
	}
</style>
