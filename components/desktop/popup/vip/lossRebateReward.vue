<template>
	<div class="modal-roulette-reward">
		<VueFinalModal
			v-model="showModal"
			classes="modal-container"
			content-class="modal-content-pc roulette-reward vip-reward"
			name="vipReward"
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
				<div class="flex flex-col items-center text-center">
					<BaseImg :src="getResConfigImage('loss_rebate_reward', ImageKeyEnum.vip)" class="w-[316px] h-[289px]" />
					<div class="flex flex-wrap px-[10px] items-center justify-center max-h-[80px] overflow-hidden mt-[10px]">
						<p class="text-[30px] font-extrabold text-second flex items-center">
							<BasePoint :value="result.value" />
						</p>
					</div>
					<p class="text-[12px] font-medium text-lowlight">{{ $t('V0104') }}</p>
					<p class="text-[12px] font-medium text-lowlight mt-[16px]">{{ $t('RO0010') }}</p>
					<div class="flex items-center gap-[40px] mt-[10px]">
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
		result.value = e.ref.params.value?.value
	}
</script>
