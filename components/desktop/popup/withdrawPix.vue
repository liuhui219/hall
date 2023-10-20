<template>
	<div class="finance-view h-full w-full text-center flex flex-col justify-between">
		<div class="px-4 flex-1 overflow-auto">
			<p class="mt-[16px] text-sm text-white w-full text-center">{{ $t('D0026', { name: 'Pix' }) }}</p>
			<p class="mt-[12px] text-xs text-lowlight w-full text-left">
				{{ $t('W0004') }}
			</p>
			<p class="withdraw-border mt-[6px] pb-[12px] text-xs text-lowlight w-full text-left">
				1. {{ $t('W0005') }}
				<br />
				2. {{ $t('W0006') }}
				<br />
				3. {{ $t('W0007') }}
				<br />
				4. {{ $t('W0008') }}
				<br />
				5. {{ $t('W0009') }}
			</p>
			<section class="mt-[24px] text-left flex flex-col gap-[16px]">
				<template v-if="withdrawStore.currentPay.data && withdrawStore.currentPay.data.length > 1">
					<div class="flex justify-between flex-wrap gap-[8px]">
						<button
							v-for="(item, index) in withdrawStore.currentPay.data"
							:key="item"
							class="sys-btn btn-m btn-color text-[12px] min-w-[45%] flex-1"
							:class="{ 'btn-main': withdrawStore.currentPayInfo.put_type == item.put_type }"
							@click="withdrawStore.changeCurrentChannel(index)"
						>
							{{ $pt(item.put_type_name_lang) }}
						</button>
					</div>
				</template>
				<BaseInput
					v-if="
						resConfig.withdrawPixConfig.emailPhoneNeedName ||
						withdrawStore.currentPayInfo.put_type == PutTypeEnum.pixCpf ||
						withdrawStore.currentPayInfo.put_type == PutTypeEnum.pixCnpj
					"
					v-model:value="withdrawStore.currentPayInfo.bind_info.full_name"
					v-model:error="withdrawStore.pixNameError"
					class="mb-[-8px]"
					:input-back="true"
					:error-message="configStore.realnameTip"
					:placeholder="$t('D0015')"
					:readonly="withdrawStore.accountReadonly"
					@blur="withdrawStore.validPixName"
				>
					<template v-if="withdrawStore.accountReadonly" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>
				</BaseInput>
				<BaseInput
					v-if="withdrawStore.currentPayInfo.put_type == PutTypeEnum.pixCpf"
					v-model:value="withdrawStore.currentPayInfo.bind_info.entrus_bank_account"
					v-model:error="withdrawStore.pixAccountError"
					:error-message="withdrawStore.pixAccountErroeMessage"
					:maxlength="14"
					:input-back="true"
					:input-format="withdrawStore.cpfInputFormat"
					type="tel"
					:placeholder="$t('D0006')"
					:readonly="withdrawStore.accountReadonly"
					@blur="withdrawStore.validPixAccount"
					@paste="withdrawStore.cpfPasteFormat"
				>
					<template v-if="withdrawStore.accountReadonly" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>
					<template #format="{ value }">
						<div v-if="!!value" class="cpf-value flex items-center">
							<span v-for="item in 3" :key="item - 1" :class="{ 'has-input': !!value[item - 1] }"> {{ value[item - 1] || '2' }} </span>
							.
							<span v-for="item in 3" :key="item + 3" :class="{ 'has-input': !!value[item + 3] }"> {{ value[item + 3] || '2' }} </span>
							.
							<span v-for="item in 3" :key="item + 7" :class="{ 'has-input': !!value[item + 7] }"> {{ value[item + 7] || '2' }} </span>
							-
							<span v-for="item in 2" :key="item + 11" :class="{ 'has-input': !!value[item + 11] }">
								{{ value[item + 11] || '2' }}
							</span>
						</div>
					</template>
				</BaseInput>
				<BaseInput
					v-if="withdrawStore.currentPayInfo.put_type == PutTypeEnum.pixPhone"
					v-model:value="withdrawStore.currentPayInfo.bind_info.entrus_bank_account"
					v-model:error="withdrawStore.pixAccountError"
					:error-message="withdrawStore.pixAccountErroeMessage"
					:index="0"
					:placeholder="$t('L1008')"
					:input-back="true"
					type="tel"
					:readonly="withdrawStore.accountReadonly"
					@blur="withdrawStore.validPixAccount"
				>
					<template #prepend>
						<CompSelectAcode v-model="withdrawStore.currentPayInfo.bind_info.acode" />
					</template>
					<template v-if="withdrawStore.accountReadonly" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>
				</BaseInput>

				<BaseInput
					v-if="withdrawStore.currentPayInfo.put_type == PutTypeEnum.pixEmail"
					v-model:value="withdrawStore.currentPayInfo.bind_info.entrus_bank_account"
					v-model:error="withdrawStore.pixAccountError"
					:error-message="withdrawStore.pixAccountErroeMessage"
					:input-back="true"
					:placeholder="$t('L1006')"
					:readonly="withdrawStore.accountReadonly"
					@blur="withdrawStore.validPixAccount"
				>
					<template v-if="withdrawStore.accountReadonly" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>
				</BaseInput>
				<BaseInput
					v-if="withdrawStore.currentPayInfo.put_type == PutTypeEnum.pixCnpj"
					v-model:value="withdrawStore.currentPayInfo.bind_info.entrus_bank_account"
					v-model:error="withdrawStore.pixAccountError"
					:error-message="withdrawStore.pixAccountErroeMessage"
					:input-back="true"
					:maxlength="18"
					type="tel"
					:input-format="withdrawStore.cnpjInputFormat"
					:placeholder="$t('D0042')"
					:readonly="withdrawStore.accountReadonly"
					@blur="withdrawStore.validPixAccount"
					@paste="withdrawStore.cnpjPasteFormat"
				>
					<template #format="{ value }">
						<div v-if="!!value" class="cpf-value flex items-center">
							<span v-for="item in 2" :key="item - 1" :class="{ 'has-input': !!value[item - 1] }"> {{ value[item - 1] || '2' }} </span>
							.
							<span v-for="item in 3" :key="item + 2" :class="{ 'has-input': !!value[item + 2] }"> {{ value[item + 2] || '2' }} </span>
							.
							<span v-for="item in 3" :key="item + 6" :class="{ 'has-input': !!value[item + 6] }"> {{ value[item + 6] || '2' }} </span>
							/
							<span v-for="item in 4" :key="item + 11" :class="{ 'has-input': !!value[item + 10] }">
								{{ value[item + 10] || '2' }}
							</span>
							-
							<span v-for="item in 2" :key="item + 15" :class="{ 'has-input': !!value[item + 15] }">
								{{ value[item + 15] || '2' }}
							</span>
						</div>
					</template>
					<template v-if="withdrawStore.accountReadonly" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>
				</BaseInput>
				<div class="withdraw-title-pc flex items-center">
					<span>{{ $t('W0002') }}</span>
					<span class="warning ml-[4px]"><BasePoint :value="withdrawStore.withdrawPoint" /></span>
					<BaseIcon name="wenhao" class="text-lowlight ml-[4px] text-[18px]" @click="openPopup(PopupEnum.walletRules)" />
				</div>
				<BaseInput
					v-model:value="withdrawStore.amount"
					v-model:error="withdrawStore.inputAmountError"
					:placeholder="`${$t('D0009')}(${configStore.currency_abbr})`"
					:force-remind="true"
					:input-back="true"
					:decimal="0"
					:error-message="
						withdrawStore.fee
							? withdrawStore.withdrawTips + ` (${configStore.renderVHtmlNumber($fp(withdrawStore.fee))}% Handing fee)`
							: withdrawStore.withdrawTips
					"
					type="number"
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
		</div>
		<div class="px-4 pt-4 text-left">
			<!-- <BaseRollover /> -->
			<p class="mb-3 text-lowlight text-xs" v-html="withdrawStore.getRateHtml" />
			<button class="sys-btn btn-full-width btn-main" @click="withdrawStore.clickWithdraw(PutGroupEnum.pix)">
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
