<template>
	<div class="modal-roulette-reward">
		<VueFinalModal
			v-model="showModal"
			classes="modal-container"
			content-class="modal-content roulette-reward-content"
			name="ModalRouletteReward"
			@before-open="beforeOpen($event)"
			@closed="onClose()"
		>
			<section class="modal-header reward-content-close">
				<div class="flex justify-end w-full">
					<button class="modal__close w-[50px] h-[50px]" @click="close()">
						<i class="sysicon-close text-lowlight text-[18px]" />
					</button>
				</div>
			</section>
			<div class="w-[91.47%] h-[483px] max-h-[100%] p-[16px] card-block overflow-x-hidden overflow-y-auto reward-content-top">
				<div class="modal__content flex flex-col">
					<div class="flex flex-col items-center text-center">
						<div class="w-[260px] h-[260px] mt-[24px] bg-no-repeat bg-cover">
							<BaseImg v-if="result.key" :src="getResConfigImage(`${result.fixed}_reward`, ImageKeyEnum.roulette)" class="w-full" />
						</div>

						<div class="flex flex-wrap items-center justify-center overflow-hidden">
							<p class="text-[30px] font-extrabold text-second flex items-center">
								{{ result.name }}
							</p>
							<p class="text-[14px] font-medium text-white">{{ $t('RO0009') }}</p>
							<!-- <p v-for="(temp, index) in reward.propsList" :key="index" class="text-[16px] font-extrabold flex items-center">
								<BaseImg class="w-[28px] mr-[4px]" :src="getResConfigImage(`rprop${temp.type}`, 'rewards')" /> X {{ temp.value }}
							</p> -->
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
	const rouletteStore = useRouletteStore()
	const referAndEarnStore = useReferAndEarnStore()
	const configStore = useSysConfigStore()
	const showModal = ref(false)
	const result: any = reactive({ fixed: '', name: '' })

	const close = () => {
		showModal.value = false
	}
	const onClose = () => {
		rouletteStore.endOneRoulette()
	}
	const beforeOpen = (e: any) => {
		result.fixed = e.ref.params.value.fixed
		result.name = e.ref.params.value.name
	}
</script>
<style scoped lang="scss">
	:deep(.roulette-reward-content) {
		@apply w-screen h-screen max-h-screen py-0 px-[15px] mx-0 fixed top-0 left-0 flex items-center justify-start;
		.reward-content-top {
			margin-top: $app-header-height;
		}
		.reward-content-close {
			position: absolute;
			top: $app-header-height;
			right: calc(4.2% + 15px);
		}
	}
</style>
