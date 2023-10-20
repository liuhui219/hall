<!-- eslint-disable prettier/prettier -->
<template>
	<div class="finance-view finance-view-mobile text-center flex flex-col justify-between">
		<div class="px-[15px] flex-1 overflow-auto">
			<p class="mt-[12px] text-sm text-white w-full text-center">{{ $t('D0026', { name: 'SPEI' }) }}</p>
			<section class="text-left gap-[16px] flex flex-col">
				<h3 class="withdraw-title">{{ $t('W0030') }}</h3>
				<div class="grid grid-cols-2 gap-2">
					<BaseInput
						v-model:value="withdrawStore.currentPayInfo.bind_info.first_name"
						v-model:error="withdrawStore.speiFNameError"
						:error-message="configStore.nameTip"
						:placeholder="$t('D0007')"
						:input-back="true"
						:readonly="withdrawStore.accountReadonly"
						@blur="withdrawStore.validSpeiFName"
					/>
					<BaseInput
						v-model:value="withdrawStore.currentPayInfo.bind_info.last_name"
						v-model:error="withdrawStore.speiLNameError"
						:error-message="configStore.nameTip"
						:placeholder="$t('D0008')"
						:input-back="true"
						:readonly="withdrawStore.accountReadonly"
						@blur="withdrawStore.validSpeiLName"
					/>
				</div>
				<BaseSelect
					v-if="withdrawStore.currentPay.data && withdrawStore.currentPay.data.length > 1"
					v-model="withdrawStore.currentChannel"
					size="m"
					:list="withdrawStore.speiTypeList"
					:lang-bol="2"
					@change="withdrawStore.changeSpeiType"
				/>

				<BaseInput
					v-model:value="withdrawStore.currentPayInfo.bind_info.entrus_bank_account"
					v-model:error="withdrawStore.speiAccountError"
					:error-message="$t('W0032')"
					type="tel"
					:placeholder="$t('W0033')"
					:input-back="true"
					:readonly="withdrawStore.accountReadonly"
					@blur="withdrawStore.validSpeiAccount"
				/>
				<div class="withdraw-title flex items-center">
					<span>{{ $t('W0002') }}</span>
					<span class="warning ml-[4px]"><BasePoint :value="withdrawStore.withdrawPoint" /></span>
					<BaseIcon name="wenhao" class="text-lowlight ml-[4px] text-[18px]" @click="openPopup(PopupEnum.walletRules)" />
				</div>
				<BaseInput
					v-model:value="withdrawStore.amount"
					v-model:error="withdrawStore.inputAmountError"
					:placeholder="`${$t('D0009')}(${configStore.currency_abbr})`"
					:input-back="true"
					type="number"
					:decimal="0"
					:force-remind="true"
					:error-message="
						withdrawStore.fee
							? withdrawStore.withdrawTips + ` (<em class='text-number'>${withdrawStore.fee}</em>% Handing fee)`
							: withdrawStore.withdrawTips
					"
					@blur="withdrawStore.validAmount"
				>
					<template v-if="withdrawStore.getCurrentFee" #append>
						<div class="input-free">
							{{ $t('D0014') }} {{ useSysConfigStore().currency_symbol }}
							<BaseNumber :b-delete-zero-point="true" :precision="2" :value="withdrawStore.getCurrentFee" />
						</div>
					</template>
				</BaseInput>
			</section>
			<!-- <section class="text-left mt-[16px]">
				<p class="mb-3 text-lowlight text-xs">
					{{ $t('W0026') }}
				</p>
				<p class="mb-3 text-lowlight text-xs">
					{{ $t('W0005') }}
					<br />
					{{ $t('W0006') }}
					<br />
					{{ $t('W0007') }}
					<br />
					{{ $t('W0008') }}
					<br />
					{{ $t('W0009') }}
				</p>
			</section> -->
		</div>
		<div class="px-[15px] pb-[16px] text-left pt-[16px]">
			<!-- <BaseRollover /> -->
			<p class="mb-3 text-lowlight text-xs" v-html="withdrawStore.getRateHtml" />
			<button class="sys-btn btn-m btn-full-width btn-highlight" @click="withdrawStore.clickWithdraw(PutGroupEnum.spei)">
				{{ $t('U0002') }}
			</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const withdrawStore = useWithdrawStore()
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
</script>
<style lang="scss" scoped>
	:deep(.sys-select .select) {
		height: 40px;
	}
</style>
