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
			<h3 class="modal__title section-title text-center mb-8">{{ $t('DL0019') }}</h3>
		</section>
		<div
			v-if="$pt(referAndEarnStore.activetyRules.activity37)"
			class="dl-refer-describe !mb-[20px]"
			v-html="$pt(referAndEarnStore.activetyRules.activity37)"
		/>
		<div class="flex items-center min-h-[43px] pl-[20px] text-white text-[14px] rounded-t-md dl-block-bg">
			{{ $t('DL0080') }}&nbsp;:&nbsp;<span class="dl-main-color">{{ referAndEarnStore.totalFriendRefer }}</span>
		</div>
		<div class="dl-th">
			<div>{{ $t('DL0080') }}</div>
			<div>{{ $t('U0005') }}</div>
		</div>
		<div class="dl-referral-box">
			<div class="dl-referral-list">
				<!-- 上 37 邀请新用户奖励活动-->
				<div v-for="(item, index) in configStore.inviteUsersCfg.data.awards" :key="index" class="dl-rows">
					<div class="dl-tr">
						<div
							v-if="index == configStore.inviteUsersCfg.data.awards.length - 1"
							:class="{ 'dl-main-color': referAndEarnStore.friendReferLocation(item, index) }"
						>
							{{ configStore.inviteUsersCfg.data.awards[index - 1].max_count + 1 + '+' }}
						</div>
						<div v-else :class="{ 'dl-main-color': referAndEarnStore.friendReferLocation(item, index) }">
							{{ (index == 0 ? '1' : configStore.inviteUsersCfg.data.awards[index - 1].max_count + 1) + '-' + item.max_count }}
						</div>
						<div :class="{ 'dl-main-color': referAndEarnStore.friendReferLocation(item, index) }">
							{{ configStore.currency_symbol }}{{ $fp($cp(item.reward.point)) }}/{{ $t('DL0084') }}
						</div>
					</div>
				</div>

				<!-- 下 38 邀请新用户vip升级奖励活动 -->
				<!-- <div v-for="(item, index) in configStore.inviteUsersVipCfg.data.levels" :key="index" class="dl-rows">
					<div v-if="item.reward.point" class="dl-tr">
						<div>{{ $t('V0009') }} {{ item.vip }}</div>
						<div>{{ configStore.currency_symbol }}{{ $fp($cp(item.reward.point)) }}</div>
					</div>
				</div> -->
			</div>
		</div>

		<!-- <div class="referral-footer">
			<div>{{ $t('DL0007') }}</div>
			<div>{{ configStore.currency_symbol }}1000</div>
		</div> -->
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	onMounted(() => {
		referAndEarnStore.getTotalFriendRefer()
	})
</script>
<style lang="scss" scoped>
	.dl-main-color {
		color: $main;
	}
	.dl-block-bg {
		background: $block-bg;
	}
	.dl-referral-box {
		@apply px-[16px] pb-[10px] max-h-[666px] overflow-y-auto rounded-b-md;
		background: $block-bg-2;
		.dl-referral-list {
			box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.2);
		}
	}
	.dl-th {
		@apply px-[15px] py-[20px];
		background: $block-bg-2;
	}
	.dl-th,
	.dl-tr {
		@apply flex items-center justify-between h-[40px] text-[14px];
		div {
			@apply flex-1;
		}
		div:nth-child(1) {
			@apply pl-[20px];
		}
		// div:nth-child(2) {
		// @apply max-w-[115px];
		// }
	}
	.dl-tr {
		color: $text-lowlight;
	}
	.dl-rows:nth-child(odd) {
		background: $bg;
	}
	.referral-footer {
		@apply flex items-center justify-between h-[40px] text-[14px] px-[15px] py-[20px] rounded-b-md;
		background: $block-bg-2;
		box-shadow: 0px -4px 6px 0px #0000004d;
		div {
			@apply flex-1;
			color: $main;
		}
		div:nth-child(1) {
			@apply pl-[20px];
		}
		div:nth-child(2) {
			@apply max-w-[115px];
		}
	}
</style>
