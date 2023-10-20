<template>
	<div class="finance-view finance-view-mobile text-center flex flex-col justify-between">
		<div class="px-4 flex-1 overflow-auto">
			<section class="text-left">
				<h3 class="text-[14px] font-bold color-text-white">{{ $t('D0019') }}</h3>
				<div class="modal-form flex-1 overflow-auto">
					<div class="grid grid-cols-3 gap-2">
						<button
							v-for="amount in depositStore.currentPayInfo.pay_num_list"
							:key="amount"
							class="sys-btn btn-padding btn-m amount-btn"
							:class="{ active: amount === depositStore.usdtAmount }"
							@click="depositStore.changeUsdtAmount(amount)"
						>
							{{ amount }} USDT
							<div v-show="depositStore.checkedId && depositStore.getUsdtFreeByAmount(amount)" class="amount-free">
								<span>
									+U
									<BasePoint
										:show-symbol="false"
										:is-converted="true"
										:value="depositStore.getUsdtFreeByAmount(amount)"
										:b-delete-zero-point="false"
									/>
								</span>
							</div>
						</button>
					</div>
					<BaseInput
						v-model:value="depositStore.usdtAmount"
						v-model:error="depositStore.usdtAmountError"
						:placeholder="`${$t('D0009')}(USDT)`"
						:input-back="true"
						type="number"
						:force-remind="true"
						:error-message="depositStore.usdtTip"
						@blur="depositStore.validUsdtAmountError"
					>
						<template v-if="depositStore.usdtAmount && depositStore.checkedId" #append>
							<div v-if="depositStore.getUsdtFreeByAmount(depositStore.usdtAmount)" class="input-free">
								<span>
									Extra+U
									<BaseNumber
										:b-delete-zero-point="true"
										:precision="2"
										:value="depositStore.getUsdtFreeByAmount(depositStore.usdtAmount)"
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
							:high="!depositStore.getUsdtFreeByAmount(depositStore.usdtAmount)"
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
			<p
				class="mb-2 text-lowlight text-xs"
				v-html="
					$t('D0020', {
						point: `<em class='text-number'>${$fp(depositStore.config.usdt_rate)}</em>`,
						currency: configStore.currency_abbr,
					})
				"
			/>
			<p class="mb-2 text-lowlight text-xs">{{ $t('W0007') }}</p>
			<p class="mb-3 text-lowlight text-xs" v-html="depositStore.getRateUsdtHtml" />
			<button class="sys-btn btn-m btn-main btn-full-width" @click="depositStore.doUsdtValid()">
				{{ $t('H0005') }}
			</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const configStore = useSysConfigStore()
	const depositStore = useDepositStore()
</script>
