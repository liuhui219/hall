<template>
	<section class="modal-header shrink-0">
		<div class="flex justify-between w-full">
			<button class="invisible">
				<BaseIcon name="arrow-left" class="text-lowlight" />
			</button>
			<button class="modal__close" @click="closePopup()">
				<BaseIcon name="close" class="text-lowlight" />
			</button>
		</div>
		<h3 class="modal__title section-title text-center mb-8">{{ $t('DL0021') }}</h3>
	</section>
	<div class="h-full overflow-auto flex flex-col">
		<div
			v-if="$pt(referAndEarnStore.activetyRules.activity33)"
			class="dl-refer-describe"
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
		<h2 v-if="useUserStore().disCommission3Status" class="my-[16px] text-[18px] font-[600] text-white">{{ $t('DL0076') }}</h2>
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
<style lang="scss" scoped>
	.dl-custom-commission {
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
	.dl-commission-list {
		li {
			@apply flex mb-[10px] h-[60px] rounded-md px-[24px];
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
