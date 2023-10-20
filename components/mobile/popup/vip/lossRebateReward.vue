<template>
	<div class="modal-roulette-reward">
		<VueFinalModal
			v-model="showModal"
			classes="modal-container"
			content-class="modal-content roulette-reward-content"
			name="vipReward"
			@before-open="beforeOpen($event)"
		>
			<div class="w-[91.47%] h-[400px] max-h-[100%] p-[16px] card-block overflow-x-hidden overflow-y-auto reward-content-top">
				<div class="modal__content flex flex-col">
					<div class="flex flex-col items-center text-center relative">
						<section class="modal-header reward-content-close">
							<div class="flex justify-end w-full">
								<button class="modal__close w-[50px] h-[50px]" @click="close()">
									<i class="sysicon-close text-lowlight text-[18px]" />
								</button>
							</div>
						</section>
						<div class="mt-[24px] bg-no-repeat bg-cover w-[197px] h-[180px] mx-auto">
							<BaseImg :src="getResConfigImage('loss_rebate_reward', ImageKeyEnum.vip)" class="w-full" />
						</div>

						<div class="flex flex-wrap items-center justify-center overflow-hidden">
							<p class="text-[30px] font-extrabold text-second flex items-center">
								<BasePoint :value="result.value" />
							</p>
							<p class="text-[14px] font-medium text-white">{{ $t('V0104') }}</p>
						</div>

						<p class="text-[12px] font-medium text-lowlight mt-[20px]">{{ $t('RO0010') }}</p>
						<div class="flex items-center gap-[24px] mt-[10px]">
							<div class="flex items-center gap-[16px]">
								<BaseIcon
									v-for="(item, index) in configStore.shareList"
									:key="index"
									class="text-[24px] pointer"
									:style="{ color: item.icon == 'whats_app' ? '#238D20' : '#2E7AEB' }"
									:name="item.icon"
									@click="referAndEarnStore.clickShare(item.url)"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</VueFinalModal>
	</div>
</template>
<script setup lang="ts">
	const referAndEarnStore = useReferAndEarnStore()
	const configStore = useSysConfigStore()
	const showModal = ref(false)
	const result: any = reactive({ value: 0 })

	const close = () => {
		showModal.value = false
	}
	const beforeOpen = (e: any) => {
		result.value = e.ref.params.value.value
	}
</script>
<style scoped lang="scss">
	:deep(.roulette-reward-content) {
		@apply w-screen h-screen max-h-screen py-0 px-[15px] mx-0 fixed top-0 left-0 flex items-center justify-start;
		.reward-content-top {
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto !important;
		}
		.reward-content-close {
			position: absolute;
			top: -15px !important;
			right: -15px !important;
		}
	}
</style>
