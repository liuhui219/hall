<template>
	<div class="finance-view finance-view-mobile text-center flex flex-col justify-between">
		<div class="px-4 flex-1 overflow-auto">
			<section class="text-left">
				<div class="modal-form flex-1 overflow-auto">
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
									:style="{ width: depositStore.getRemain(item, index).length * 6.2 + 'px' }"
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
			<button class="sys-btn btn-m btn-full-width btn-main" @click="depositStore.doSpeiValid()">
				{{ $t('H0005') }}
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const depositStore = useDepositStore()
</script>
