<template>
	<div class="h-full overflow-hidden flex flex-col">
		<section class="modal-header shrink-0">
			<div class="flex justify-between w-full">
				<button class="invisible">
					<BaseIcon name="arrow-left" class="text-lowlight" />
				</button>
				<button class="modal__close" @click="closePopup()">
					<BaseIcon name="close" class="text-lowlight" />
				</button>
			</div>
			<h3 class="modal__title section-title text-center mb-8">{{ $t('DL0023') }}</h3>
		</section>
		<div
			v-if="$pt(referAndEarnStore.activetyRules.activity36)"
			class="dl-refer-describe"
			v-html="$pt(referAndEarnStore.activetyRules.activity36)"
		/>
		<ul class="dl-commission-list">
			<!-- 根据管理台配置 动态获取 36 -->
			<!-- <div v-for="(item, index) in disRechargeList" :key="index">
				<li>
					<div>{{ configStore.currency_symbol }}{{ $fp($cp(item.ParentFirstReward.point)) }}</div>
					<div>
						{{
							disRechargeList.length - 1 > index
								? $t('DL0040', {
										min: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)),
										max: configStore.currency_symbol + $fp($cp(disRechargeList[index + 1].min_recharge_point)),
								  })
								: $t('DL0039', { value: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)) })
						}}
					</div>
					<div>{{ $t('V0009') }} 1</div>
				</li>
				<li>
					<div>{{ configStore.currency_symbol }}{{ $fp($cp(item.ParentSecondReward.point)) }}</div>
					<div>
						{{
							disRechargeList.length - 1 > index
								? $t('DL0040', {
										min: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)),
										max: configStore.currency_symbol + $fp($cp(disRechargeList[index + 1].min_recharge_point)),
								  })
								: $t('DL0039', { value: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)) })
						}}
					</div>
					<div>{{ $t('V0009') }} 2</div>
				</li>
				<li>
					<div>{{ configStore.currency_symbol }}{{ $fp($cp(item.ParentThirdReward.point)) }}</div>
					<div>
						{{
							disRechargeList.length - 1 > index
								? $t('DL0040', {
										min: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)),
										max: configStore.currency_symbol + $fp($cp(disRechargeList[index + 1].min_recharge_point)),
								  })
								: $t('DL0039', { value: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)) })
						}}
					</div>
					<div>{{ $t('V0009') }} 3</div>
				</li>
			</div> -->

			<div v-for="(item, index) in referAndEarnStore.disRechargeList" :key="index">
				<li>
					<div>{{ configStore.currency_symbol }}{{ $fp($cp(item.point)) }}</div>
					<div>
						{{
							(index + 1) % disRechargeList.length != 0
								? $t('DL0040', {
										min: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)),
										max: $fp($cp(referAndEarnStore.disRechargeList[index + 1].min_recharge_point)),
								  })
								: $t('DL0039', { value: configStore.currency_symbol + $fp($cp(item.min_recharge_point + 10000)) })
						}}
					</div>
					<div>{{ $t('V0009') }}{{ item.level }}</div>
				</li>
			</div>

			<!-- 固定3个 35-->
			<!-- <li v-if="configStore.disCommission3Cfg">
				<div>{{ configStore.disCommission3Cfg.data.reward_items[0].ParentFirstReward.flow_pro / 100 }}%</div>
				<div>{{ $t('DL0064') }}</div>
				<div>{{ $t('V0009') }} 1</div>
			</li>
			<li v-if="configStore.disCommission3Cfg">
				<div>{{ configStore.disCommission3Cfg.data.reward_items[0].ParentSecondReward.flow_pro / 100 }}%</div>
				<div>{{ $t('DL0064') }}</div>
				<div>{{ $t('V0009') }} 2</div>
			</li>
			<li v-if="configStore.disCommission3Cfg">
				<div>{{ configStore.disCommission3Cfg.data.reward_items[0].ParentThirdReward.flow_pro / 100 }}%</div>
				<div>{{ $t('DL0064') }}</div>
				<div>{{ $t('V0009') }} 3</div>
			</li> -->
		</ul>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	let disRechargeList = configStore.disRecharge3Cfg.data.reward_items
	onMounted(() => {
		referAndEarnStore.getDisRechargeList()
	})
</script>
<style lang="scss" scoped>
	.dl-commission-list {
		@apply h-[715px] overflow-y-auto;
		li {
			@apply flex mb-[10px] min-h-[60px] rounded-md px-[24px];
			background: $block-bg-2;
			div {
				@apply flex-1 flex items-center;
			}
			div:nth-child(1) {
				@apply text-[20px] font-[600];
			}
			div:nth-child(2) {
				@apply text-[14px] font-[400];
				color: $text-lowlight;
			}
			div:nth-child(3) {
				@apply text-[14px] font-[400] justify-end;
				color: $text-lowlight;
			}
		}
	}
</style>
