<template>
	<div class="finance-view text-center flex flex-col justify-between">
		<div class="px-4 flex-1 overflow-auto">
			<p class="mt-[12px] text-sm text-white w-full text-center">{{ $t('D0026', { name: 'USDT' }) }}</p>
			<section class="mt-[8px] text-left">
				<div class="modal-form flex-1 overflow-auto">
					<BaseSelect v-model="withdrawStore.currentChannel" :list="withdrawStore.usdtTypeList" :lang-bol="2" />
					<!-- todo update lang -->
					<BaseInput
						v-model:value="withdrawStore.currentPayInfo.bind_info.entrus_bank_account"
						v-model:error="withdrawStore.usdtAddressError"
						:error-message="$t('W0022')"
						:input-back="true"
						:placeholder="$t('W0003')"
						@blur="withdrawStore.validUsdtAddress"
					/>
				</div>
			</section>
			<section class="text-left">
				<div class="block-title font-bold flex items-center">
					<span>{{ $t('W0002') }}</span>
					<span class="warning ml-[4px]"><BasePoint :value="withdrawStore.withdrawPoint" /></span>
					<BaseIcon name="wenhao" class="text-lowlight ml-[4px] text-[18px]" @click="openPopup(PopupEnum.walletRules)" />
				</div>
				<div class="modal-form flex-1 overflow-auto">
					<BaseInput
						v-model:value="withdrawStore.usdtAmount"
						v-model:error="withdrawStore.inputAmountError"
						:error-message="
							withdrawStore.fee
								? withdrawStore.withdrawTips + ` (${configStore.renderVHtmlNumber(withdrawStore.fee)}% Handing fee)`
								: withdrawStore.withdrawTips
						"
						:placeholder="`${$t('D0009')}(${configStore.currency_abbr})`"
						:input-back="true"
						type="number"
						:force-remind="true"
						:decimal="0"
					>
						<template v-if="withdrawStore.getCurrentFee" #append>
							<div class="input-free">
								{{ $t('D0014') }} {{ useSysConfigStore().currency_symbol }}
								<BaseNumber :b-delete-zero-point="true" :precision="2" :value="withdrawStore.getCurrentFee" />
							</div>
						</template>
					</BaseInput>
				</div>
			</section>
		</div>
		<div class="px-4 pt-4 text-left">
			<!-- <BaseRollover /> -->
			<p
				class="mb-2 text-lowlight text-xs"
				v-html="
					$t('W0016', {
						currency: configStore.currency_abbr,
						usdt: configStore.renderVHtmlNumber(parseFloat((1 / ((withdrawStore.config.usdt_rate || 100) / 100)).toFixed(6))),
					})
				"
			/>
			<p class="mb-2 text-lowlight text-xs">{{ $t('W0017') }}</p>
			<p class="mb-3 text-lowlight text-xs" v-html="withdrawStore.getRateUsdtHtml" />
			<button class="sys-btn btn-m btn-full-width btn-main" @click="withdrawStore.clickWithdraw(PutGroupEnum.usdt)">
				{{ $t('U0002') }}
			</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
	const withdrawStore = useWithdrawStore()
</script>
