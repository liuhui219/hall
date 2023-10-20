<template>
	<SkinHeader :is-home="false" :title="$t('DL0021')" />
	<div class="dl-mobile-dividing-line" />
	<div class="h-full flex flex-col overflow-y-auto">
		<div
			v-if="$pt(referAndEarnStore.activetyRules.activity33)"
			class="dl-refer-describe !mb-[16px] mt-[20px]"
			v-html="$pt(referAndEarnStore.activetyRules.activity33)"
		/>
		<!-- 33 -->
		<ul v-if="useUserStore().proxyAwardStatus" class="dl-commission-list">
			<div v-for="(item, index) in configStore.proxyAwardCfg.data.list" :key="index">
				<li v-if="item.reward.flow_pro">
					<div>{{ resConfig.referAndEarnConfig.multiplyPercent ? item.reward.flow_pro : item.reward.flow_pro / 100 }}%</div>
					<div v-if="resConfig.referAndEarnConfig.multiplyPercent">{{ $t('DL0038') }}</div>
					<div>{{ $t('V0009') }}{{ item.level }}</div>
				</li>
			</div>
		</ul>

		<!-- 固定3个 35-->
		<h2 v-if="useUserStore().disCommission3Status" class="my-[16px] ml-[15px] text-[18px] font-[600] text-white">{{ $t('DL0076') }}</h2>
		<div v-if="useUserStore().disCommission3Status" class="dl-custom-commission">
			<li>
				<div>{{ configStore.disCommission3Cfg.data.reward_items[0].ParentFirstReward.flow_pro / 100 }}%</div>
				<div>{{ $t('DL0081') }}</div>
				<div>{{ $t('V0009') }} 1</div>
			</li>
			<li>
				<div>{{ configStore.disCommission3Cfg.data.reward_items[0].ParentSecondReward.flow_pro / 100 }}%</div>
				<div>{{ $t('DL0081') }}</div>
				<div>{{ $t('V0009') }} 2</div>
			</li>
			<li>
				<div>{{ configStore.disCommission3Cfg.data.reward_items[0].ParentThirdReward.flow_pro / 100 }}%</div>
				<div>{{ $t('DL0081') }}</div>
				<div>{{ $t('V0009') }} 3</div>
			</li>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
</script>
<style scoped lang="scss">
	.dl-custom-commission {
		@apply mx-[15px];
		li {
			@apply flex mb-[10px] min-h-[60px] rounded-md px-[14px];
			background: $block-bg-2;
			div {
				@apply flex-1 flex items-center;
			}
			div:nth-child(1) {
				@apply text-[20px] font-[600];
			}
			div:nth-child(2) {
				@apply min-w-[40%] text-[14px] font-[400];
				color: $text-lowlight;
			}
			div:nth-child(3) {
				@apply text-[14px] font-[400] justify-end;
				color: $text-lowlight;
			}
		}
	}
	.dl-commission-list {
		@apply px-[15px];
		li {
			@apply flex mb-[10px] h-[60px] rounded-md px-[14px];
			background: $block-bg-2;
			div {
				@apply flex-1 flex items-center;
			}
			div:nth-child(1) {
				@apply text-[20px] font-[600];
			}
			div:nth-child(2) {
				@apply min-w-[40%] text-[14px] font-[400];
				color: $text-lowlight;
			}
			div:nth-child(3) {
				@apply text-[14px] font-[400] justify-end;
				color: $text-lowlight;
			}
		}
	}
</style>
