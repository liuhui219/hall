<template>
	<div class="finance-view finance-view-mobile text-center flex flex-col justify-between">
		<div class="px-4 flex-1 overflow-auto">
			<section class="text-left">
				<div class="modal-form flex-1 overflow-auto">
					<div v-if="!depositStore.accountReadonly">
						<BaseInput
							v-model:value="depositStore.currentPayInfo.bind_info.full_name"
							v-model:error="depositStore.cpfNameError"
							class="mb-[12px]"
							:input-back="true"
							:readonly="false"
							:placeholder="$t('D0015')"
							:error-message="configStore.realnameTip"
							:index="0"
							type="text"
							@blur="depositStore.validFullName"
						/>
						<BaseInput
							v-model:value="depositStore.currentPayInfo.bind_info.entrus_bank_account"
							v-model:error="depositStore.cpfAccountError"
							:input-back="true"
							:maxlength="18"
							:error-message="depositStore.cpfAccountErrorMessage"
							:input-format="depositStore.cpfAndCnpjInputFormat"
							type="tel"
							:placeholder="$t('D0005')"
							:readonly="false"
							@paste="depositStore.cpfAndCnpjPasteFormat"
							@blur="depositStore.validAccount"
						>
							<template v-if="depositStore.currentPayInfo.bind_info.entrus_bank_account.length <= 14" #format="{ value }">
								<div v-if="!!value" class="cpf-value flex items-center">
									<span v-for="item in 3" :key="item - 1" :class="{ 'has-input': !!value[item - 1] }">
										{{ value[item - 1] || '2' }}
									</span>
									.
									<span v-for="item in 3" :key="item + 3" :class="{ 'has-input': !!value[item + 3] }">
										{{ value[item + 3] || '2' }}
									</span>
									.
									<span v-for="item in 3" :key="item + 7" :class="{ 'has-input': !!value[item + 7] }">
										{{ value[item + 7] || '2' }}
									</span>
									-
									<span v-for="item in 2" :key="item + 11" :class="{ 'has-input': !!value[item + 11] }">
										{{ value[item + 11] || '2' }}
									</span>
								</div>
							</template>
							<template v-else #format="{ value }">
								<div v-if="!!value" class="cpf-value flex items-center">
									<span v-for="item in 2" :key="item - 1" :class="{ 'has-input': !!value[item - 1] }">
										{{ value[item - 1] || '2' }}
									</span>
									.
									<span v-for="item in 3" :key="item + 2" :class="{ 'has-input': !!value[item + 2] }">
										{{ value[item + 2] || '2' }}
									</span>
									.
									<span v-for="item in 3" :key="item + 6" :class="{ 'has-input': !!value[item + 6] }">
										{{ value[item + 6] || '2' }}
									</span>
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
						</BaseInput>
					</div>
					<div
						v-if="depositStore.currentPayInfo.pay_num_list && depositStore.currentPayInfo.pay_num_list.length"
						class="grid grid-cols-3 gap-[8px]"
					>
						<button
							v-for="amount in depositStore.currentPayInfo.pay_num_list"
							:key="amount"
							class="sys-btn btn-padding btn-m shrink-0 amount-btn"
							:class="{ active: amount === depositStore.amount }"
							@click="depositStore.changeAmount(amount)"
						>
							{{ amount }}
							<div v-show="depositStore.checkedId && depositStore.getFreeByAmount(amount)" class="amount-free">
								<span>
									+<BasePoint :value="depositStore.getFreeByAmount(amount)" :is-converted="true" :b-delete-zero-point="true" />
								</span>
							</div>
						</button>
					</div>
					<BaseInput
						v-model:value="depositStore.amount"
						v-model:error="depositStore.currencyAmountError"
						:placeholder="`${$t('D0009')}(${configStore.currency_abbr})`"
						:input-back="true"
						type="number"
						:force-remind="true"
						:error-message="depositStore.currencyTip"
						@blur="depositStore.validAmount"
					>
						<template v-if="depositStore.amount && depositStore.checkedId" #append>
							<div v-if="depositStore.getFreeByAmount(depositStore.amount)" class="input-free">
								<span>
									Extra+{{ useSysConfigStore().currency_symbol }}
									<BaseNumber
										:b-delete-zero-point="true"
										:precision="2"
										:value="depositStore.getFreeByAmount(depositStore.amount)"
									/>
								</span>
							</div>
							<div v-else class="input-free-empty">{{ $t('D0043') }}</div>
						</template>
					</BaseInput>
				</div>
			</section>
			<section class="text-left">
				<h3 class="text-[14px] font-bold color-text-white">{{ $t('D0010') }}</h3>
				<ul class="bonus-box py-4">
					<li v-for="(item, index) in depositStore.propsList" :key="index" class="bonus-option">
						<BaseCheckbox
							:id="item.activity_param"
							v-model="item.checked"
							size="m"
							class="w-full"
							:high="!depositStore.getFreeByAmount(depositStore.amount)"
							:checked-high="true"
							@change="depositStore.propsCheckChange"
						>
							<div class="flex items-center justify-between w-full overflow-hidden">
								<div class="color-text-white flex-1 truncate mr-[10px]">{{ $pt(item.text).item_name }}</div>
								<div
									v-if="item.eTime"
									class="color-text text-[12px] text-justify whitespace-nowrap"
									:style="{ width: depositStore.getRemain(item, index).length * 6.23 + 'px' }"
								>
									{{ depositStore.getRemain(item, index) }}
								</div>
							</div>
						</BaseCheckbox>
					</li>
				</ul>
			</section>
		</div>

		<div class="px-4 pb-8 text-left">
			<p class="mb-3 text-lowlight text-xs" v-html="depositStore.getRateHtml" />
			<button class="sys-btn btn-m btn-main btn-full-width" @click="depositStore.doCpfValid()">
				{{ $t('H0005') }}
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const depositStore = useDepositStore()
</script>
