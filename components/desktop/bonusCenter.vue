<template>
	<div class="bonus-center-view wrap">
		<div class="bonus-center-container bonus-center-container-first">
			<!-- <h3 class="activity-cetner-title">{{ $t('BC0001') }}</h3> -->
			<div class="ativity-center-list" :class="{ 'ativity-center-list-nologin': !userStore.isLogin }">
				<template v-if="!userStore.isLogin">
					<BaseImg :src="getResConfigImage('banner_pc', ImageKeyEnum.bonusCenter)" class="w-[100%] shrink-0 rounded-[6px]" />
					<h5 class="h-full w-[55%] absolute top-0 right-0 flex items-start justify-center flex-col">
						<p class="text-[36px] font-bold text-white whitespace-pre-wrap uppercase">{{ $t('BC0005') }}</p>
						<button class="sys-btn btn-main uppercase mt-[13px] w-[311px]" @click="openRegister()">{{ $t('L1002') }}</button>
					</h5>
				</template>
				<template v-else>
					<div v-if="!resConfig.bonusCenterConfig.hide_history_bonus" class="bonus-container bonus-container-total">
						<div class="w-[99px] shrink-0 relative mr-[16px]">
							<BaseImg :src="getResConfigImage('bonus', ImageKeyEnum.bonusCenter)" />
						</div>
						<div class="flex-1">
							<h3 class="bonus-container-title">{{ $t('BC0008') }}</h3>
							<span class="point">
								<BasePoint :value="userStore.bonusCenterData.total_give" />
							</span>
						</div>
					</div>
					<div
						class="bonus-container flex-col bonus-container-gift"
						:class="{ 'bonus-container-gift-full': resConfig.bonusCenterConfig.hide_history_bonus }"
					>
						<div class="self-start pl-[22px]">
							<h3 class="bonus-container-title">{{ $t('R0003') }}</h3>
						</div>
						<div class="flex w-full items-end">
							<BaseInput v-model:value="rewardsStore.codeText" class="flex-1 bonus-center-input" :placeholder="$t('BC0006')" />
							<button
								:class="getDisabledBtnClass(!!rewardsStore.codeText, 1, 'btn-main')"
								class="sys-btn uppercase shrink-0"
								@click="rewardsStore.giftcodereward()"
							>
								{{ $t('BC0007') }}
							</button>
						</div>
					</div>
					<div v-if="resConfig.bonusCenterConfig.hide_history_bonus" />
					<TransitionGroup name="center-bonus">
						<DesktopBonusCenterCard
							v-if="userStore.getPropsCount(1)"
							key="BC0010-BC0010"
							:active="true"
							:src="getResConfigImage('deposit', ImageKeyEnum.bonusCenter)"
							:btn-text="$t('BC0012')"
							:title="$t('BC0010')"
							:content="$t('BC0011', { value: configStore.renderVHtmlNumber(userStore.getPropsCount(1), 'warning') })"
							@on-click="openPopup(PopupEnum.deposit)"
						/>
						<DesktopBonusCenterCard
							v-if="userStore.getPropsCount(0)"
							key="BC0010-BC0013"
							:active="true"
							:src="getResConfigImage('props', ImageKeyEnum.bonusCenter)"
							:btn-text="$t('BC0015')"
							:title="$t('BC0013')"
							:content="$t('BC0014', { value: configStore.renderVHtmlNumber(userStore.getPropsCount(0), 'warning') })"
							@on-click="navigateTo('rewards')"
						/>
						<DesktopBonusCenterCard
							v-if="!!userStore.rouletteStatus && userStore.getActivityCount(ActivityTypeEnum.roulette).receive"
							key="BC0010-BC0016"
							:active="true"
							:src="getResConfigImage('roulette', ImageKeyEnum.bonusCenter)"
							:btn-text="$t('BC0018')"
							:title="$t('BC0016')"
							:content="
								$t('BC0014', {
									value: configStore.renderVHtmlNumber(userStore.getActivityCount(ActivityTypeEnum.roulette).receive, 'warning'),
								})
							"
							@on-click="openPopup(PopupEnum.roulette)"
						/>
						<DesktopBonusCenterCard
							v-if="configStore.pageConfig.sysConfig.activity.task && false"
							key="BC0010-BC0019"
							:active="true"
							:src="getResConfigImage('task', ImageKeyEnum.bonusCenter)"
							:btn-text="$t('BC0021')"
							:title="$t('BC0019')"
							:content="$t('BC0022', { value: configStore.renderVHtmlNumber(userStore.getTaskCount(1), 'warning') })"
							@on-click="navigateTo('/task')"
						/>
						<DesktopBonusCenterCard
							v-if="userStore.getActivityCount(ActivityTypeEnum.proxyAward).receive"
							key="BC0010-H0022"
							:active="true"
							:src="getResConfigImage('affiliate', ImageKeyEnum.bonusCenter)"
							:btn-text="$t('BC0026')"
							:title="$t('H0022')"
							:content="
								$t('BC0027', {
									value: configStore.renderVHtmlNumber(userStore.getActivityCount(ActivityTypeEnum.proxyAward).receive, 'warning'),
								})
							"
							@on-click="navigateTo('/refer-and-earn')"
						/>
						<DesktopBonusCenterCard
							v-if="
								userStore.inviteChestStatus &&
								userStore.getActivityCount(ActivityTypeEnum.inviteChest).receive >
									userStore.getActivityCount(ActivityTypeEnum.inviteChest).received
							"
							key="BC0010-BC0029"
							:active="true"
							:src="getResConfigImage('inviteChest', ImageKeyEnum.bonusCenter)"
							:btn-text="$t('BC0034')"
							:title="$t('BC0029')"
							:content="
								$t('BC0033', {
									value: configStore.renderVHtmlNumber(
										userStore.getActivityCount(ActivityTypeEnum.inviteChest).receive -
											userStore.getActivityCount(ActivityTypeEnum.inviteChest).received,
										'warning'
									),
								})
							"
							@on-click="openPopup(PopupEnum.inviteChest)"
						/>
						<DesktopBonusCenterCard
							v-if="userStore.checkinStatus && userStore.getActivityCount(ActivityTypeEnum.checkIn).receive"
							key="BC0010-BC0035"
							:active="true"
							:src="getResConfigImage('checkin', ImageKeyEnum.bonusCenter)"
							:content="$t('BC0038')"
							:title="$t('BC0035')"
							:btn-text="$t('BC0035')"
							@on-click="openPopup(PopupEnum.checkin)"
						/>
						<DesktopBonusCenterCard
							v-if="userStore.vipLossRebateStatus && userStore.getActivityCount(ActivityTypeEnum.vipLossRebate).receive"
							key="BC0010-V0105"
							:active="true"
							:src="getResConfigImage('loss_rebate', ImageKeyEnum.bonusCenter)"
							:content="
								$t('BC0046') +
								configStore.renderVHtmlNumber(
									configStore.currency_symbol + $fp($cp(userStore.getActivityCount(ActivityTypeEnum.vipLossRebate).receive)),
									'warning'
								)
							"
							:title="$t('V0105')"
							:btn-text="$t('U0002')"
							@on-click="
								() => {
									googleEvent({ sendType: 1, event: 'bonus_cashback_click' })
									openPopup(PopupEnum.lossRebate)
								}
							"
						/>
					</TransitionGroup>
				</template>
			</div>
		</div>
		<div v-if="bonusCenterStore.showDailyBonus" class="bonus-center-container">
			<h3 class="activity-cetner-title">{{ $t('BC0002') }}</h3>
			<TransitionGroup name="center-bonus" tag="div" class="ativity-center-list">
				<DesktopBonusCenterCard
					v-if="!!userStore.rouletteStatus && !userStore.getActivityCount(ActivityTypeEnum.roulette).receive"
					key="BC0002-BC0018"
					:active="false"
					:src="getResConfigImage('roulette', ImageKeyEnum.bonusCenter)"
					:btn-text="userStore.isLogin ? useRouletteStore().leftTimeFormat : $t('BC0018')"
					:title="$t('BC0016')"
					:content="
						userStore.isLogin
							? $t('BC0014', {
									value: configStore.renderVHtmlNumber(0, 'warning'),
							  })
							: $t('BC0017')
					"
					@on-click="openPopup(PopupEnum.roulette)"
				/>
				<DesktopBonusCenterCard
					v-if="configStore.pageConfig.sysConfig.activity.task"
					key="BC0002-BC0019"
					:active="false"
					:src="getResConfigImage('task', ImageKeyEnum.bonusCenter)"
					:btn-text="$t('BC0021')"
					:title="$t('BC0019')"
					:content="
						userStore.isLogin
							? $t('BC0022', {
									value: configStore.renderVHtmlNumber(configStore.renderVHtmlNumber(userStore.getTaskCount(1)), 'warning'),
							  })
							: $t('BC0020')
					"
					@on-click="navigateTo('/task')"
				/>
				<DesktopBonusCenterCard
					v-if="!userStore.getActivityCount(ActivityTypeEnum.proxyAward).receive"
					key="BC0002-H0022"
					:active="false"
					:src="getResConfigImage('affiliate', ImageKeyEnum.bonusCenter)"
					:btn-text="$t('BC0026')"
					:title="$t('H0022')"
					:content="$t('BC0025')"
					@on-click="navigateTo('/refer-and-earn')"
				/>
				<DesktopBonusCenterCard
					v-if="
						userStore.inviteChestStatus &&
						userStore.getActivityCount(ActivityTypeEnum.inviteChest).receive ==
							userStore.getActivityCount(ActivityTypeEnum.inviteChest).received
					"
					key="BC0002-BC0029"
					:active="false"
					:src="getResConfigImage('inviteChest', ImageKeyEnum.bonusCenter)"
					:btn-text="$t('BC0031')"
					:title="$t('BC0029')"
					:content="
						userStore.isLogin
							? $t('BC0032', {
									value: configStore.renderVHtmlNumber(
										8 - userStore.getActivityCount(ActivityTypeEnum.inviteChest).received,
										'warning'
									),
							  })
							: $t('BC0030')
					"
					@on-click="openPopup(PopupEnum.inviteChest)"
				/>
				<DesktopBonusCenterCard
					v-if="userStore.checkinStatus && !userStore.getActivityCount(ActivityTypeEnum.checkIn).receive"
					key="BC0002-BC0035"
					:active="false"
					:src="getResConfigImage('checkin', ImageKeyEnum.bonusCenter)"
					:content="
						userStore.isLogin
							? $t('BC0037', {
									value: configStore.renderVHtmlNumber(
										configStore.renderVHtmlNumber(userStore.getActivityCount(ActivityTypeEnum.checkIn).received),
										'warning'
									),
							  })
							: $t('BC0036')
					"
					:title="$t('BC0035')"
					:btn-text="$t('BC0035')"
					@on-click="openPopup(PopupEnum.checkin)"
				/>
				<DesktopBonusCenterCard
					v-if="userStore.vipLossRebateStatus && !userStore.getActivityCount(ActivityTypeEnum.vipLossRebate).receive"
					key="BC0002-V0105"
					:active="false"
					:src="getResConfigImage('loss_rebate', ImageKeyEnum.bonusCenter)"
					:content="
						userStore.isLogin
							? $t('BC0047', {
									value: configStore.renderVHtmlNumber(vipStore.lossRebateCurrent + '%', 'warning'),
							  })
							: $t('V0097', {
									value: configStore.renderVHtmlNumber(vipStore.lossRebateMaxPro + '%', 'warning'),
							  })
					"
					:title="$t('V0105')"
					:btn-text="userStore.isLogin ? vipStore.lossLeftTime : $t('BC0007')"
					@on-click="
						() => {
							googleEvent({ sendType: 1, event: 'bonus_cashback_click' })
							openPopup(PopupEnum.lossRebate)
						}
					"
				/>
			</TransitionGroup>
		</div>
		<div v-if="promotionStore.openList.length" class="bonus-center-container">
			<h3 class="activity-cetner-title">{{ $t('BC0003') }}</h3>
			<TransitionGroup name="center-bonus" tag="div" class="ativity-center-list">
				<DesktopBonusCenterCard
					v-for="item in promotionStore.openList"
					:key="`bonus-center-promotion-${item._id}`"
					:active="false"
					:src="$pt(item.content)?.img"
					:btn-text="$t('BC0041')"
					:title="$pt(item.content)?.title"
					:content="$pt(item.content)?.desc"
					@on-click="promotionStore.openDetail(item._id)"
				/>
			</TransitionGroup>
		</div>
		<div v-if="bonusCenterStore.showVipBonus" class="bonus-center-container">
			<h3 class="activity-cetner-title">{{ $t('BC0004') }}</h3>
			<TransitionGroup key="bonus-center-bonus-BC0004" name="center-bonus" tag="div" class="ativity-center-list">
				<DesktopBonusCenterCard
					v-if="userStore.vipUpgradeStatus"
					key="BC0004-BC0039"
					:active="false"
					:arrow="false"
					:src="getResConfigImage('vip_upgrade', ImageKeyEnum.bonusCenter)"
					:btn-text="$t('BC0041')"
					:title="$t('BC0039')"
					:content="$t('BC0040')"
					@on-click="navigateTo('/vip')"
				/>
				<DesktopBonusCenterCard
					v-if="userStore.vipWeeklyStatus"
					key="BC0004-BC0042"
					:active="false"
					:arrow="false"
					:src="getResConfigImage('vip_weekly', ImageKeyEnum.bonusCenter)"
					:btn-text="$t('BC0041')"
					:title="$t('BC0042')"
					:content="$t('BC0043')"
					@on-click="navigateTo('/vip')"
				/>
				<DesktopBonusCenterCard
					v-if="userStore.vipRebateStatus"
					key="BC0004-V0105"
					:active="false"
					:arrow="false"
					:src="getResConfigImage('vip_rebate', ImageKeyEnum.bonusCenter)"
					:btn-text="$t('BC0041')"
					:title="$t('V0105')"
					:content="$t('BC0045', { value: userStore.vip_level })"
					@on-click="navigateTo('/vip')"
				/>
			</TransitionGroup>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const bonusCenterStore = useBonusCenterStore()
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
	const vipStore = useVipStore()
	const rewardsStore = useRewardsStore()
	const promotionStore = usePromotionStore()
</script>
<style scoped lang="scss">
	.bonus-center-view {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		flex-direction: column;
		gap: 50px;
		overflow-y: auto;
		overflow-x: hidden;
		padding-bottom: 100px;
		.bonus-center-container {
			&-first {
				padding-top: 60px;
			}

			width: 100%;
		}
		.activity-cetner-title {
			padding: 0 1px 24px;
			font-size: 20px;
			color: #fff;
			// line-height: 1.2;
			font-weight: 700;
		}
		.ativity-center-list {
			display: grid;
			grid-template-columns: repeat(3, calc((100% - 48px) / 3));
			gap: 24px;
			position: relative;
			&-nologin {
				display: block;
				width: 100%;
				height: 0;
				border-radius: 6px;
				padding-bottom: calc(405 / 1920 * 100%);
				grid-template-columns: unset;
			}

			& > div {
				height: 167px;

				flex-shrink: 0;
				&.bonus-container-gift,
				&.bonus-container-total {
					height: 140px;
				}
				&.bonus-container-gift {
					grid-column-start: 2;
					grid-column-end: 4;
					&.bonus-container-gift-full {
						grid-column-start: 1;
						grid-column-end: 3;
					}
				}
			}
			.bonus-container {
				border-radius: 8px;
				overflow: hidden;
				border: 1px solid #323c3c;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 15px 15px 15px 20px;
				&-gift {
					background: $block-bg-2;
				}
				color: $color-white;
				.bonus-container-title {
					margin-bottom: 10px;
					// line-height: 24px;
					font-size: 18px;
					font-weight: 700;
				}

				.point {
					font-size: 22px;
					color: #ffcc00;
					font-weight: bold;
				}

				button {
					font-size: 14px;
					flex-shrink: 0;
					width: 94px;
					padding: 0;
					margin-left: 21px;
					border-radius: 8px;
				}
			}
		}
	}
	:deep(.sys-input) {
		&.bonus-center-input {
			.input-wrap {
				input {
					padding-left: 22px;
				}
			}
		}
	}
	.center-bonus-enter-active,
	.center-bonus-leave-active {
		transition: all 0.2s ease-out;
	}
	.center-bonus-enter-from,
	.center-bonus-leave-to {
		opacity: 0;
		transform: translateY(100%);
	}
</style>
