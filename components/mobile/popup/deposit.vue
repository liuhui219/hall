<template>
	<SkinHeader :is-home="false" :title="$t('H0005')" :back="depositStore.mobileBack" />

	<div class="modal__content flex flex-col justify-between flex-1 overflow-hidden">
		<div v-if="depositStore.inLobbyPage" class="px-4 h-full flex flex-col overflow-hidden">
			<div class="flex-1 overflow-auto">
				<section class="mb-8 text-left flex flex-col">
					<h3 class="block-title font-bold mb-3 flex items-center color-text-white mt-[10px]">
						{{ $t('D0011') }}
						<p v-if="depositStore.propsList.length" class="ml-[10px] deposit-bonus">
							<span :class="{ [`mr-[${depositStore.bonusTime ? 4 : 2}px]`]: true }">{{ $t('V0004') }}</span>
							<span v-if="depositStore.bonusTime" class="deposit-bonus-time">{{
								Helper.renderTimeRemainNoDay(depositStore.bonusTime - depositStore.currentTime)
							}}</span>
						</p>
					</h3>
					<ul class="mx-auto flex-1 w-full">
						<li
							v-for="(item, index) in depositStore.pay_list"
							:key="index"
							class="relative sys-btn btn-outline w-full text-left flex items-center justify-between mb-[16px] !px-[12px] !h-[50px]"
							@click="depositStore.goDeposit(item)"
						>
							<BaseImg
								v-if="index == 0"
								class="absolute w-[22px] top-0 ml-[-13px] mt-[-1px]"
								:src="getResConfigImage('hot', ImageKeyEnum.deposit)"
								alt=""
							/>
							<div class="flex items-center">
								<BaseImg v-if="item.icon" class="w-[30px]" :src="item.icon" alt="" />
								<BaseImg
									v-else-if="depositStore.getIconByPayKey(item.pay_key)"
									class="w-[30px]"
									alt="pix"
									:src="getResConfigImage(depositStore.getIconByPayKey(item.pay_key), ImageKeyEnum.deposit)"
								/>
								<div v-else class="w-[30px]" />
								<span class="color-text-white ml-[12px] text-[14px]">{{ $pt(item.lang_app_pay)?.name }}</span>
							</div>
							<div class="flex items-center">
								<div v-if="item.pay_num_max || item.pay_num_min" class="text-white mr-[2px] text-[14px]">
									<BaseNumber :value="item.pay_num_min || 0" />
									-
									<BaseNumber v-if="item.pay_num_max" :value="item.pay_num_max" />
									<span v-else>∞</span>
									<span class="ml-[4px]">{{ item.pay_key == DepositKeyTypeEnum.usdt ? 'U' : configStore.currency_symbol }}</span>
								</div>
								<div class="-rotate-[90deg] ml-[10px]">
									<BaseArrowDown class="text-[12px]" />
								</div>
							</div>
						</li>
						<div
							v-if="resConfig['depositText']"
							class="py-[10px] w-full text-[12px] shrink-0 whitespace-pre-wrap"
							v-html="$pt(resConfig['depositText'])"
						/>
					</ul>
				</section>
			</div>
			<div
				v-if="userStore.paytimeTip"
				class="py-[32px] w-full px-[16px] fixed z-[1] bottom-0 left-0 text-[12px] shrink-0 dark-bg-03"
				v-html="$pt(userStore.paytimeTip)"
			/>
		</div>
		<div v-else-if="!depositStore.inResult" class="h-full flex flex-col">
			<component :is="currentComponent" class="h-full" />
		</div>
		<div v-else class="flex flex-col h-full" style="background-color: #fff">
			<iframe :src="depositStore.payResult.url" frameborder="0" allowtransparency="true" class="flex-1" @load="iFrameLoad" />
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const depositStore = useDepositStore()
	const configStore = useSysConfigStore()
	const userStore = useUserStore()
	const pixComponent = resolveComponent('mobile/popup/depositPix')
	const speiComponent = resolveComponent('mobile/popup/depositSpei')
	const virtualComponent = resolveComponent('mobile/popup/depositVirtual')
	const load = ref(false)
	const iFrameLoad = () => {
		load.value = true
		usePageLoading().value = false
	}
	const currentComponent = computed(() => {
		if (depositStore.isInPixPay) {
			return pixComponent
		} else if (depositStore.isInSpeiPay) {
			return speiComponent
		}
		return virtualComponent
	})
	watchEffect(() => {
		if (depositStore.payResult && !load.value) {
			usePageLoading().value = true
		} else {
			load.value = false
		}
	})
	onMounted(depositStore.mounted)
	onBeforeUnmount(depositStore.unmounted)
</script>
