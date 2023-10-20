<template>
	<div class="modal-roulette-reward">
		<VueFinalModal
			v-model="showModal"
			classes="modal-container"
			content-class="modal-content-pc roulette-reward"
			name="ModalRouletteReward"
			@closed="rouletteStore.endOneRoulette"
			@before-open="beforeOpen($event)"
		>
			<section class="modal-header">
				<div class="flex justify-end w-full">
					<button class="modal__close" @click="close()">
						<i class="sysicon-close text-lowlight text-[18px]" />
					</button>
				</div>
			</section>
			<div class="modal__content flex flex-col">
				<div class="flex flex-col gap-[20px] items-center text-center">
					<BaseImg
						v-if="result.fixed"
						:src="getResConfigImage(`${result.fixed}_reward`, ImageKeyEnum.roulette)"
						alt=""
						class="w-[380px] h-[380px]"
					/>
					<div class="flex flex-wrap px-[10px] items-center justify-center max-h-[80px] overflow-hidden">
						<p class="text-[30px] font-extrabold text-second flex items-center">
							{{ result.name }}
						</p>
					</div>
					<p class="text-[12px] font-medium text-lowlight">{{ $t('RO0009') }}</p>
					<p class="text-[12px] font-medium text-lowlight">{{ $t('RO0010') }}</p>
					<div class="flex items-center gap-[24px]">
						<div class="flex items-center gap-[40px]">
							<BaseIcon
								v-for="(item, index) in configStore.shareList"
								:key="index"
								class="text-[40px] pointer"
								:style="{ color: item.icon == 'whats_app' ? '#238D20' : '#2E7AEB' }"
								:name="item.icon"
								@click="referAndEarnStore.clickShare(item.url)"
							/>
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
	const beforeOpen = (e: any) => {
		result.fixed = e.ref.params.value?.fixed
		result.name = e.ref.params.value?.name
	}
</script>
