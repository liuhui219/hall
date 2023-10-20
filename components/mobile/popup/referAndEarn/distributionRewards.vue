<template>
	<SkinHeader :is-home="false" :title="$t('DL0023')" />
	<div class="dl-mobile-dividing-line mb-[20px]" />
	<div class="h-full flex flex-col overflow-y-auto">
		<div
			v-if="$pt(referAndEarnStore.activetyRules.activity36)"
			class="dl-refer-describe"
			v-html="$pt(referAndEarnStore.activetyRules.activity36)"
		/>
		<ul class="dl-commission-list">
			<!-- 固定3个 -->
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

			<!-- 根据管理台配置 动态获取 -->
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
		</ul>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	const disRechargeList = configStore.disRecharge3Cfg.data.reward_items
	onMounted(() => {
		referAndEarnStore.getDisRechargeList()
	})
</script>
<style scoped lang="scss">
	.dl-commission-list {
		@apply px-[15px];
		li {
			@apply flex mb-[10px] min-h-[60px] rounded-md px-[14px]  py-[5px];
			background: $block-bg-2;
			div {
				@apply flex-1 flex items-center;
			}
			div:nth-child(1) {
				@apply text-[20px] font-[600];
			}
			div:nth-child(2) {
				@apply pl-[7px] text-[14px] font-[400] min-w-[50%];
				color: $text-lowlight;
			}
			div:nth-child(3) {
				@apply text-[14px] font-[400] justify-end max-w-[15%];
				color: $text-lowlight;
			}
		}
	}
</style>
