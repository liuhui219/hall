<template>
	<DesktopPopupHeader :invisible="!useRoute().hash?.includes('userInfo')" :title="$t('V0105')" />
	<div class="modal__content justify-between flex-1 overflow-hidden flex flex-col">
		<div class="flex-1 flex flex-col overflow-hidden relative">
			<div class="flex-1 flex flex-col gap-[20px] overflow-auto">
				<div v-if="userStore.isLogin">
					<div class="vip-l-detail">
						<div class="vip-l-detail-c">
							<div>
								<div>
									<h4 class="vip-l-detail-name">{{ $t('V0096', { value: vipStore.lossRebateCurrent + '%' }) }}</h4>
									<h2 class="vip-l-detail-v">{{ $t('V0100') }} {{ vipStore.lossRebateMaxPro }}%</h2>
								</div>
								<div class="vip-l-progress-c">
									<div class="vip-l-progress-bg">
										<div class="vip-l-progress" :style="{ width: userStore.vipProgress }">
											<p class="vip-l-progress-t">{{ parseInt(`${userStore.vipCurrentCoin}`) }}xp</p>
										</div>
									</div>
									<div class="vip-l-detail-v-s">
										<p>VIP {{ Helper.addZero(Math.min(userStore.vip_level, configStore.maxVip - 1)) }}</p>
										<p>VIP {{ Helper.addZero(Math.min(userStore.vip_level + 1, configStore.maxVip)) }}</p>
									</div>
								</div>
							</div>
							<div class="vip-l-detail-b">
								<p v-if="userStore.vip_level < configStore.maxVip">
									{{ $t('V0075', { value: parseInt(`${userStore.next_coin}`), vip: userStore.vip_level + 1 }) }}
								</p>
								<p v-else>{{ $t('V0093') }}</p>
							</div>
						</div>
						<div class="vip-l-lvbg">
							<BaseImg :src="getResConfigImage(`vip${userStore.vip_level}_l`, ImageKeyEnum.vip)" />
						</div>
					</div>
					<div class="vip-rebate-detail flex flex-col gap-[10px] py-[20px]">
						<div>
							<div class="text-lowlight text-[12px] pb-[6px] vip-rebate-detail-event px-[20px]">
								{{ $t('V0098') }} {{ vipStore.lossRebateEventFormat }}
							</div>
							<div class="px-[20px] flex items-center">
								<BaseImg
									class="w-[100px] h-[100px] mr-[15px] ml-[50px] shrink-0"
									:src="getResConfigImage('loss_rebate', ImageKeyEnum.bonusCenter)"
								/>
								<div class="color-text-white">
									<p class="text-[16px] font-[600] leading-[14.4px] mb-[8px]">{{ $t('V0101') }}</p>
									<p
										class="text-[14px] font-[400] flex-1"
										v-html="
											$t('V0102', {
												value: configStore.renderVHtmlNumber(
													configStore.currency_symbol +
														(!vipStore.lossRebateCfg.point || !vipStore.lossRebateCfg.has_received
															? '???'
															: $fp($cp(vipStore.lossRebateCfg.point))),
													'warning'
												),
											})
										"
									/>
								</div>
							</div>
						</div>
						<button
							class="sys-btn mx-[20px]"
							:class="[!vipStore.lossRebateCfg.point || vipStore.lossRebateCfg.point == 1 ? 'btn-main' : 'btn-highlight']"
							@click="vipStore.openRewards()"
						>
							{{ !vipStore.lossRebateCfg.point || vipStore.lossRebateCfg.point == 1 ? $t('BC0007') : $t('U0002') }}
						</button>
						<div
							class="text-lowlight text-[12px] px-[20px]"
							:class="{ 'text-animation': vipStore.clickApply }"
							@animationend="vipStore.animationEnd"
						>
							{{ $t('V0103') }}{{ vipStore.lossRebateReceiveFormat }}
						</div>
					</div>
				</div>
				<div
					v-else
					class="loss-rebate-banner"
					:style="{ backgroundImage: `url(${getResConfigImage('loss_rebate_banner_pc', ImageKeyEnum.vip)})` }"
				>
					<div class="loss-rebate-banner-context">
						<div class="font-[400] text-[14px] relative">{{ $t('V0098') }} {{ vipStore.lossRebateEventFormat }}</div>
						<div class="font-[600] text-[18px]">{{ $t('V0097', { value: vipStore.lossRebateMaxPro + '%' }) }}</div>
						<button class="sys-btn btn-main !text-[16px] !h-[36px] w-[140px] !p-0 mt-[10px]" @click="vipStore.clickJoin()">
							{{ $t('BC0007') }}
						</button>
					</div>
				</div>
				<div>
					<div class="text-[20px] font-bold color-text-white">{{ $t('V0099') }}</div>
					<div class="loss-rebate-rule-container">
						<div class="loss-rebate-rule-item loss-rebate-rule-header">
							<p class="loss-rebate-rule-level">{{ $t('V0009') }}</p>
							<p class="loss-rebate-rule-bet">{{ $t('MP0006') }}</p>
							<p class="loss-rebate-rule-cash">{{ $t('V0017') }}</p>
						</div>
						<div
							v-for="item in configStore.vipLossRebateCfg.data.vip_cfg"
							:key="item"
							class="loss-rebate-rule-item"
							:class="{ active: userStore.vip_level == item.vip_level }"
						>
							<p class="loss-rebate-rule-level">
								<BaseImg :src="getResConfigImage(`vip${item.vip_level}`, ImageKeyEnum.vip)" class="w-[20px] mr-[10px]" />
								<span> VIP {{ Helper.addZero(item.vip_level) }} </span>
							</p>
							<p class="loss-rebate-rule-bet"><BasePoint :value="item.upper_limit_point" :b-delete-zero-point="true" />+</p>
							<p class="loss-rebate-rule-cash"><BaseNumber :value="item.reward?.flow_pro / 100 || 0" />%</p>
						</div>
					</div>
				</div>
				<div>
					<div class="text-[20px] font-bold color-text-white capitalize">{{ $t('AF0006') }}</div>
					<div class="text-[13px] mt-[10px] mb-[20px]" v-html="$pt(configStore.vipLossRebateCfg.rules)" />
				</div>
			</div>
		</div>
	</div>
	<DesktopPopupVipLossRebateReward />
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const vipStore = useVipStore()
	const userStore = useUserStore()
	onMounted(() => {
		vipStore.lossRebateMounted()
	})
</script>
<style lang="scss" scoped>
	.loss-rebate-banner {
		width: 100%;
		margin-top: 32px;
		position: relative;
		height: 170px;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 6px;
		background-color: $block-bg-2;
		background-size: cover;
		background-repeat: no-repeat;
		.loss-rebate-banner-context {
			position: absolute;
			right: 0;
			height: 100%;
			width: 60%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: $color-white;
		}
	}
	.vip-l-detail {
		width: 100%;
		font-size: 22px;
		height: 175px;
		background-size: 100% 100%;
		padding: 0 20px;
		margin-top: 32px;
		font-size: 12px;
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		color: $text-base;
		z-index: 0;
		&::before {
			content: '';
			display: block;
			position: absolute;
			left: -25%;
			top: -5%;
			border-radius: 50%;
			width: 56%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-color: v-bind('vipStore.vipColor');
			opacity: 0.4;
			filter: blur(80px);
			z-index: 0;
		}
		&::after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: v-bind('vipStore.vipBg');
			z-index: -1;
		}
		.vip-l-detail-c {
			position: absolute;
			height: 100%;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			width: 70%;
			padding: 36px 0 12px;
			.vip-l-detail-b {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
			}
			.vip-l-detail-name {
				font-size: 18px;
				line-height: 20px;
				font-weight: bold;
				color: $color-white;
				margin-bottom: 5px;
			}
			.detailVip {
				font-size: 12px;
			}
			.vip-l-progress-c {
				.vip-l-progress-bg {
					background: $bg;
					height: 4px;
					border-radius: 6px;
					margin-top: 32px;
					.vip-l-progress {
						background: $main;
						height: 4px;
						border-radius: 6px;
						position: relative;
						.vip-l-progress-t {
							position: absolute;
							left: 0;
							text-align: right;
							width: 100%;
							min-width: min-content;
							font-size: 12px;
							top: -20px;
						}
					}
				}
			}
			.vip-l-detail-v {
				margin-bottom: 20px;
				display: flex;
				justify-content: space-between;
				font-size: 12px;
			}
			.vip-l-detail-v-s {
				margin-bottom: 12px;
				display: flex;
				justify-content: space-between;
				margin-top: 6px;

				font-size: 12px;
			}
		}
		.vip-l-lvbg {
			position: absolute;
			right: 5%;
			width: 18%;
			z-index: 1;
			&::after {
				content: '';
				background: v-bind('vipStore.vipColor');
				position: absolute;
				width: 108%;
				height: 100%;
				border-radius: 50%;
				left: -4%;
				top: 10%;
				z-index: -1;
				opacity: 0.6;
				filter: blur(25px);
			}
		}
	}
	.vip-rebate-detail {
		margin-top: 10px;
		border-radius: 6px;
		background: $block-bg-2;
		.vip-rebate-detail-event {
			border-bottom: 0.5px solid $block-bg;
		}
	}
	.loss-rebate-rule-container {
		width: 100%;
		margin-top: 10px;
		border-radius: 6px;
		background: $block-bg-2;
		display: inline-flex;
		padding: 0px 16px 16px 16px;
		flex-direction: column;
		align-items: flex-start;
		flex-shrink: 0;
		.loss-rebate-rule-item {
			width: 100%;
			display: flex;
			padding: 12px 20px;
			font-size: 12px;
			&.active {
				color: $main;
			}
			& > p.loss-rebate-rule-bet {
				flex: 1;
				text-align: center;
			}
			& > p.loss-rebate-rule-level {
				flex-shrink: 0;
				width: 30%;
				display: flex;
				align-items: center;

				& > span {
					display: inline-block;
					width: 42px;
					white-space: nowrap;
				}
			}
			& > p.loss-rebate-rule-cash {
				flex-shrink: 0;
				width: 30%;
				text-align: right;
			}
		}
		& > .loss-rebate-rule-item:nth-child(even) {
			background: $bg;
		}
		.loss-rebate-rule-header {
			padding: 12px 20px;
			color: $color-white;
		}
	}
	.text-animation {
		animation: colorUpdate 1s linear 3;
	}
	@keyframes colorUpdate {
		0% {
			color: $text-lowlight;
		}
		45% {
			color: $main;
		}
		55% {
			color: $main;
		}
		100% {
			color: $text-lowlight;
		}
	}
</style>
